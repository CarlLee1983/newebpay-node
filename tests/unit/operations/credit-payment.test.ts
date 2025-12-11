import { describe, it, expect } from 'bun:test'
import { CreditPayment } from '../../../src/operations/credit-payment.js'
import { NewebPayError } from '../../../src/errors/newebpay-error.js'

describe('CreditPayment', () => {
  const hashKey = '12345678901234567890123456789012'
  const hashIV = '1234567890123456'
  const merchantId = 'MS12345678'

  describe('基本功能', () => {
    it('應該建立 CreditPayment 實例', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      expect(payment).toBeInstanceOf(CreditPayment)
    })

    it('應該初始化 CREDIT 參數', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      const rawContent = payment.getRawContent()
      expect(rawContent.CREDIT).toBe(1)
    })
  })

  describe('設定方法', () => {
    it('應該設定紅利折抵', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setRedeem(1)
      expect(payment.get('CreditRed')).toBe(1)
    })

    it('應該設定銀聯卡', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setUnionPay(1)
      expect(payment.get('UNIONPAY')).toBe(1)
    })

    it('應該設定 Google Pay', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setGooglePay(1)
      expect(payment.get('ANDROIDPAY')).toBe(1)
    })

    it('應該設定 Samsung Pay', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setSamsungPay(1)
      expect(payment.get('SAMSUNGPAY')).toBe(1)
    })

    it('應該設定信用卡快速結帳', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setTokenTerm(1)
      expect(payment.get('TokenTerm')).toBe(1)
    })

    it('應該設定信用卡快速結帳使用者識別碼', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setTokenTermDemand('USER123')
      expect(payment.get('TokenTermDemand')).toBe('USER123')
    })
  })

  describe('驗證', () => {
    it('應該在設定必要參數後通過驗證', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')

      const payload = payment.getPayload()
      expect(payload).toBeTruthy()
      expect(payload.CREDIT).toBe(1)
    })

    it('應該產生加密內容', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')

      const content = payment.getContent()
      expect(content.TradeInfo).toBeTruthy()
      expect(content.TradeSha).toBeTruthy()
    })
  })
})

