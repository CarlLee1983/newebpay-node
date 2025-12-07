import { describe, it, expect, beforeEach } from 'vitest'
import { FulaPayment } from '../../src/operations/fula-payment.js'

describe('FulaPayment', () => {
  const merchantId = 'MS12345678'
  const hashKey = '12345678901234567890123456789012'
  const hashIV = '1234567890123456'

  let payment: FulaPayment

  beforeEach(() => {
    payment = new FulaPayment(merchantId, hashKey, hashIV)
  })

  describe('建構函式', () => {
    it('應該正確初始化並啟用 FULA', () => {
      const rawContent = payment.getRawContent()
      expect(rawContent['FULA']).toBe(1)
    })
  })

  describe('validation', () => {
    it('呼叫 validateBaseParams', () => {
      payment
        .setMerchantOrderNo('ORDER001')
        .setAmt(100)
        .setItemDesc('Desc')
        .setEmail('test@test.com')
      expect(() => payment.getPayload()).not.toThrow()
    })
  })
})
