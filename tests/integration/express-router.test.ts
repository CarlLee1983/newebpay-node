import { describe, it, expect } from 'vitest'
import request from 'supertest' // @ts-ignore
import express from 'express'
import { createNewebPayRouter } from '../../src/frameworks/express/index.js'
import { TEST_CONFIG, createMockCallbackPayload, MOCK_PAYMENT_DATA } from '../fixtures/index.js'

describe('Express Router Integration', () => {
  const app = express()
  // Ensure we parse body correctly before the router if needed,
  // but the router itself adds its own parsers in some places.
  // Actually createNewebPayRouter adds express.json() for /create
  // and express.urlencoded() for /notify.
  // So we just mount it.

  const router = createNewebPayRouter({
    merchantId: TEST_CONFIG.merchantId,
    hashKey: TEST_CONFIG.hashKey,
    hashIV: TEST_CONFIG.hashIV,
  })

  app.use('/newebpay', router)

  describe('POST /payment/create', () => {
    it('should create payment and return parameters', async () => {
      const response = await request(app).post('/newebpay/payment/create').send({
        orderId: 'ORD-INT-001',
        amount: 1000,
        itemDesc: 'Integration Test Item',
        email: 'test@example.com',
        paymentType: 'credit',
      })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('success', true)

      const data = response.body.data.fields
      expect(data).toHaveProperty('MerchantID', TEST_CONFIG.merchantId)
      expect(data).toHaveProperty('TradeInfo')
      expect(data).toHaveProperty('TradeSha')
      expect(data).toHaveProperty('Version')
    })

    it('should return 400 for missing fields', async () => {
      const response = await request(app).post('/newebpay/payment/create').send({
        orderId: 'ORD-MISSING',
      }) // Missing amount, itemDesc

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
    })
  })

  describe('POST /payment/notify (Webhook)', () => {
    it('should return OK for valid signature and payload', async () => {
      const payload = createMockCallbackPayload(MOCK_PAYMENT_DATA)

      const response = await request(app)
        .post('/newebpay/payment/notify')
        // NewebPay sends data as form-urlencoded
        .type('form')
        .send(payload)

      expect(response.status).toBe(200)
      expect(response.text).toBe('OK')
    })

    it('should return 400 for invalid signature', async () => {
      const payload = createMockCallbackPayload(MOCK_PAYMENT_DATA)
      // Tamper with the signature
      payload.TradeSha = 'INVALID_HASH'

      const response = await request(app)
        .post('/newebpay/payment/notify')
        .type('form')
        .send(payload)

      expect(response.status).toBe(400)
      expect(response.body).toEqual({
        error: 'TradeSha verification failed',
        code: 'CHECK_VALUE_FAILED',
      })
    })

    it('should return 400 for invalid/tampered TradeInfo', async () => {
      const payload = createMockCallbackPayload(MOCK_PAYMENT_DATA)
      // Tamper with content without updating hash
      // Note: In AES CBC, modifying ciphertext corrupts decryption usually,
      // which might throw error in decrypt or result in garbage.
      // If garbage, signature won't match.
      // If decrypt fails (padding error), it might throw 500 or caught?
      // Let's check middleware. It enables strict verification?
      // Actually the middleware calculates SHA from TradeInfo (ciphertext).
      // So if we mock TradeInfo and TradeSha to match, but TradeInfo decrypts to garbage?
      // The middleware `isVerified` checks `TradeSha` against `TradeInfo`.
      // Then `req.newebpayNotify` lazily decrypts? Or decrypts eagerly?
      // Let's assume validation passes if Sha matches Info.

      // Use a random string as TradeInfo but valid Sha for it?
      // No, let's just send some random string that won't match standard hash logic if we don't recalculate it.
      // Simplest fail case:

      const response = await request(app).post('/newebpay/payment/notify').type('form').send({
        TradeInfo: 'GARBAGE',
        TradeSha: 'GARBAGE',
      })

      expect(response.status).toBe(400)
    })
  })
})
