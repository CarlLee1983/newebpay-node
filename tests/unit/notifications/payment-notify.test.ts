import { describe, it, expect } from 'bun:test'
import { PaymentNotify } from '../../../src/notifications/payment-notify.js'
import { Aes256Encoder } from '../../../src/infrastructure/aes256-encoder.js'
import { CheckValueEncoder } from '../../../src/infrastructure/check-value-encoder.js'
import { NewebPayError } from '../../../src/errors/newebpay-error.js'

describe('PaymentNotify', () => {
  const hashKey = '12345678901234567890123456789012'
  const hashIV = '1234567890123456'

  describe('create', () => {
    it('應該建立 PaymentNotify 實例', () => {
      const notify = PaymentNotify.create(hashKey, hashIV)
      expect(notify).toBeInstanceOf(PaymentNotify)
    })
  })

  describe('verify', () => {
    it('應該驗證有效的通知資料', () => {
      const notify = new PaymentNotify(hashKey, hashIV)
      const encoder = new Aes256Encoder(hashKey, hashIV)
      const checkValueEncoder = new CheckValueEncoder(hashKey, hashIV)

      const data = {
        MerchantID: 'MS12345678',
        Status: 'SUCCESS',
        Message: '交易成功',
      }

      const tradeInfo = encoder.encrypt(data)
      const tradeSha = checkValueEncoder.generate(tradeInfo)

      const rawData = {
        MerchantID: 'MS12345678',
        TradeInfo: tradeInfo,
        TradeSha: tradeSha,
        Version: '2.0',
      }

      const isValid = notify.verify(rawData)
      expect(isValid).toBe(true)
      expect(notify.isVerified()).toBe(true)
    })

    it('應該在缺少必要欄位時返回 false', () => {
      const notify = new PaymentNotify(hashKey, hashIV)

      expect(notify.verify({})).toBe(false)
      expect(notify.verify({ TradeInfo: 'test' })).toBe(false)
      expect(notify.verify({ TradeSha: 'test' })).toBe(false)
    })

    it('應該在 CheckValue 驗證失敗時返回 false', () => {
      const notify = new PaymentNotify(hashKey, hashIV)
      const encoder = new Aes256Encoder(hashKey, hashIV)

      const data = { MerchantID: 'MS12345678' }
      const tradeInfo = encoder.encrypt(data)

      const rawData = {
        TradeInfo: tradeInfo,
        TradeSha: 'invalid-check-value',
      }

      expect(notify.verify(rawData)).toBe(false)
    })

    it('應該在解密失敗時返回 false', () => {
      const notify = new PaymentNotify(hashKey, hashIV)
      const checkValueEncoder = new CheckValueEncoder(hashKey, hashIV)

      const invalidTradeInfo = 'invalid-encrypted-data'
      const tradeSha = checkValueEncoder.generate(invalidTradeInfo)

      const rawData = {
        TradeInfo: invalidTradeInfo,
        TradeSha: tradeSha,
      }

      expect(notify.verify(rawData)).toBe(false)
    })
  })

  describe('verifyOrFail', () => {
    it('應該在驗證成功時不拋出錯誤', () => {
      const notify = new PaymentNotify(hashKey, hashIV)
      const encoder = new Aes256Encoder(hashKey, hashIV)
      const checkValueEncoder = new CheckValueEncoder(hashKey, hashIV)

      const data = { MerchantID: 'MS12345678', Status: 'SUCCESS' }
      const tradeInfo = encoder.encrypt(data)
      const tradeSha = checkValueEncoder.generate(tradeInfo)

      expect(() => {
        notify.verifyOrFail({ TradeInfo: tradeInfo, TradeSha: tradeSha })
      }).not.toThrow()
    })

    it('應該在驗證失敗時拋出錯誤', () => {
      const notify = new PaymentNotify(hashKey, hashIV)

      expect(() => {
        notify.verifyOrFail({ TradeInfo: 'test', TradeSha: 'invalid' })
      }).toThrow(NewebPayError)
    })
  })

  describe('資料取得方法', () => {
    it('應該取得解密後的資料', () => {
      const notify = new PaymentNotify(hashKey, hashIV)
      const encoder = new Aes256Encoder(hashKey, hashIV)
      const checkValueEncoder = new CheckValueEncoder(hashKey, hashIV)

      const data = {
        MerchantID: 'MS12345678',
        Status: 'SUCCESS',
        Message: '交易成功',
        Result: JSON.stringify({
          MerchantOrderNo: 'ORDER123',
          TradeNo: 'T123456',
          Amt: 1000,
        }),
      }

      const tradeInfo = encoder.encrypt(data)
      const tradeSha = checkValueEncoder.generate(tradeInfo)

      notify.verifyOrFail({ TradeInfo: tradeInfo, TradeSha: tradeSha })

      expect(notify.getMerchantID()).toBe('MS12345678')
      expect(notify.getStatus()).toBe('SUCCESS')
      expect(notify.getMessage()).toBe('交易成功')
      expect(notify.isSuccess()).toBe(true)
    })

    it('應該正確解析 Result JSON', () => {
      const notify = new PaymentNotify(hashKey, hashIV)
      const encoder = new Aes256Encoder(hashKey, hashIV)
      const checkValueEncoder = new CheckValueEncoder(hashKey, hashIV)

      const resultData = {
        MerchantOrderNo: 'ORDER123',
        TradeNo: 'T123456',
        Amt: 1000,
        PaymentType: 'CREDIT',
        PayTime: '2024-01-01 12:00:00',
      }

      const data = {
        MerchantID: 'MS12345678',
        Status: 'SUCCESS',
        Result: JSON.stringify(resultData),
      }

      const tradeInfo = encoder.encrypt(data)
      const tradeSha = checkValueEncoder.generate(tradeInfo)

      notify.verifyOrFail({ TradeInfo: tradeInfo, TradeSha: tradeSha })

      expect(notify.getMerchantOrderNo()).toBe('ORDER123')
      expect(notify.getTradeNo()).toBe('T123456')
      expect(notify.getAmt()).toBe(1000)
      expect(notify.getPaymentType()).toBe('CREDIT')
      expect(notify.getPayTime()).toBe('2024-01-01 12:00:00')
    })

    it('應該取得所有 Result 欄位', () => {
      const notify = new PaymentNotify(hashKey, hashIV)
      const encoder = new Aes256Encoder(hashKey, hashIV)
      const checkValueEncoder = new CheckValueEncoder(hashKey, hashIV)

      const resultData = {
        MerchantOrderNo: 'ORDER123',
        TradeNo: 'T123456',
        Amt: 1000,
        PaymentType: 'CREDIT',
        PayTime: '2024-01-01 12:00:00',
        IP: '192.168.1.1',
        PayBankCode: 'BANK001',
        Auth: 'AUTH123',
        Card4No: '1234',
        Card6No: '123456',
        ECI: '05',
        Inst: 3,
        InstFirst: 334,
        InstEach: 333,
      }

      const data = {
        MerchantID: 'MS12345678',
        Status: 'SUCCESS',
        Result: JSON.stringify(resultData),
      }

      const tradeInfo = encoder.encrypt(data)
      const tradeSha = checkValueEncoder.generate(tradeInfo)

      notify.verifyOrFail({ TradeInfo: tradeInfo, TradeSha: tradeSha })

      expect(notify.getIP()).toBe('192.168.1.1')
      expect(notify.getPayBankCode()).toBe('BANK001')
      expect(notify.getAuthCode()).toBe('AUTH123')
      expect(notify.getCard4No()).toBe('1234')
      expect(notify.getCard6No()).toBe('123456')
      expect(notify.getECI()).toBe('05')
      expect(notify.getInst()).toBe(3)
      expect(notify.getInstFirst()).toBe(334)
      expect(notify.getInstEach()).toBe(333)
    })

    it('應該在缺少欄位時返回預設值', () => {
      const notify = new PaymentNotify(hashKey, hashIV)
      const encoder = new Aes256Encoder(hashKey, hashIV)
      const checkValueEncoder = new CheckValueEncoder(hashKey, hashIV)

      const data = {
        MerchantID: 'MS12345678',
        Status: 'SUCCESS',
        Result: JSON.stringify({}),
      }

      const tradeInfo = encoder.encrypt(data)
      const tradeSha = checkValueEncoder.generate(tradeInfo)

      notify.verifyOrFail({ TradeInfo: tradeInfo, TradeSha: tradeSha })

      expect(notify.getMerchantOrderNo()).toBe('')
      expect(notify.getTradeNo()).toBe('')
      expect(notify.getAmt()).toBe(0)
      expect(notify.getPaymentType()).toBe('')
      expect(notify.getPayTime()).toBe('')
      expect(notify.getIP()).toBe('')
      expect(notify.getPayBankCode()).toBe('')
      expect(notify.getAuthCode()).toBe('')
      expect(notify.getCard4No()).toBe('')
      expect(notify.getCard6No()).toBe('')
      expect(notify.getECI()).toBe('')
      expect(notify.getInst()).toBe(0)
      expect(notify.getInstFirst()).toBe(0)
      expect(notify.getInstEach()).toBe(0)
    })

    it('應該取得原始通知資料', () => {
      const notify = new PaymentNotify(hashKey, hashIV)
      const encoder = new Aes256Encoder(hashKey, hashIV)
      const checkValueEncoder = new CheckValueEncoder(hashKey, hashIV)

      const data = { MerchantID: 'MS12345678', Status: 'SUCCESS' }
      const tradeInfo = encoder.encrypt(data)
      const tradeSha = checkValueEncoder.generate(tradeInfo)

      const rawData = {
        MerchantID: 'MS12345678',
        TradeInfo: tradeInfo,
        TradeSha: tradeSha,
        Version: '2.0',
      }

      notify.verifyOrFail(rawData)

      const retrievedRawData = notify.getRawData()
      expect(retrievedRawData.MerchantID).toBe('MS12345678')
      expect(retrievedRawData.TradeInfo).toBe(tradeInfo)
      expect(retrievedRawData.TradeSha).toBe(tradeSha)
    })

    it('應該取得完整的 Result 物件', () => {
      const notify = new PaymentNotify(hashKey, hashIV)
      const encoder = new Aes256Encoder(hashKey, hashIV)
      const checkValueEncoder = new CheckValueEncoder(hashKey, hashIV)

      const resultData = {
        MerchantOrderNo: 'ORDER123',
        TradeNo: 'T123456',
        Amt: 1000,
      }

      const data = {
        MerchantID: 'MS12345678',
        Status: 'SUCCESS',
        Result: JSON.stringify(resultData),
      }

      const tradeInfo = encoder.encrypt(data)
      const tradeSha = checkValueEncoder.generate(tradeInfo)

      notify.verifyOrFail({ TradeInfo: tradeInfo, TradeSha: tradeSha })

      const result = notify.getResult()
      expect(result.MerchantOrderNo).toBe('ORDER123')
      expect(result.TradeNo).toBe('T123456')
      expect(result.Amt).toBe(1000)
    })
  })
})

