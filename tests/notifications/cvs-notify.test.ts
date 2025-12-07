import { describe, it, expect, beforeEach } from 'vitest'
import { CvsNotify } from '../../src/notifications/cvs-notify.js'
import { Aes256Encoder } from '../../src/infrastructure/aes256-encoder.js'
import { CheckValueEncoder } from '../../src/infrastructure/check-value-encoder.js'

describe('CvsNotify', () => {
  const hashKey = '12345678901234567890123456789012'
  const hashIV = '1234567890123456'

  let notify: CvsNotify
  let aesEncoder: Aes256Encoder
  let checkValueEncoder: CheckValueEncoder

  beforeEach(() => {
    notify = new CvsNotify(hashKey, hashIV)
    aesEncoder = new Aes256Encoder(hashKey, hashIV)
    checkValueEncoder = new CheckValueEncoder(hashKey, hashIV)
  })

  function createMockNotifyData(data: Record<string, unknown>) {
    const tradeInfo = aesEncoder.encrypt(data)
    const tradeSha = checkValueEncoder.generate(tradeInfo)

    return {
      Status: 'SUCCESS',
      MerchantID: 'MS12345678',
      TradeInfo: tradeInfo,
      TradeSha: tradeSha,
      Version: '2.0',
    }
  }

  describe('建構函式', () => {
    it('使用靜態方法建立實例', () => {
      const instance = CvsNotify.create(hashKey, hashIV)
      expect(instance).toBeInstanceOf(CvsNotify)
    })
  })

  describe('verify', () => {
    it('缺少 TradeInfo 應回傳 false', () => {
      const result = notify.verify({ TradeSha: 'some_value' })
      expect(result).toBe(false)
    })

    it('缺少 TradeSha 應回傳 false', () => {
      const result = notify.verify({ TradeInfo: 'some_value' })
      expect(result).toBe(false)
    })

    it('TradeSha 驗證失敗應回傳 false', () => {
      const mockData = createMockNotifyData({
        Status: 'SUCCESS',
        Message: '取號成功',
      })
      mockData.TradeSha = 'wrong_value'

      const result = notify.verify(mockData)
      expect(result).toBe(false)
    })

    it('解密失敗應回傳 false', () => {
      // 模擬解密失敗 (傳入的 TradeInfo 無法被解密)
      const mockData = {
        TradeInfo: 'invalid_encrypted_string',
        TradeSha: checkValueEncoder.generate('invalid_encrypted_string'),
      }
      const result = notify.verify(mockData)
      expect(result).toBe(false)
    })
  })

  describe('verifyOrFail', () => {
    it('驗證失敗應拋出錯誤', () => {
      expect(() => {
        notify.verifyOrFail({ TradeInfo: 'invalid' })
      }).toThrow()
    })

    it('驗證成功應回傳自身', () => {
      const mockData = createMockNotifyData({
        Status: 'SUCCESS',
        Message: '取號成功',
      })
      expect(notify.verifyOrFail(mockData)).toBe(notify)
    })
  })

  describe('資料存取', () => {
    beforeEach(() => {
      const resultData = {
        MerchantOrderNo: 'ORDER001',
        TradeNo: 'TRADE001',
        Amt: 1000,
        PaymentType: 'CVS',
        CodeNo: '12345678901234',
        ExpireDate: '2023-12-31',
        ExpireTime: '23:59:59',
        StoreType: 'FAMIC2C', // Assuming generic
        Barcode_1: '111',
        Barcode_2: '222',
        Barcode_3: '333',
      }

      const mockData = createMockNotifyData({
        Status: 'SUCCESS',
        Message: '取號成功',
        Result: JSON.stringify(resultData),
      })

      notify.verify(mockData)
    })

    it('應該正確取得各項資料', () => {
      expect(notify.getStatus()).toBe('SUCCESS')
      expect(notify.isSuccess()).toBe(true)
      expect(notify.getMessage()).toBe('取號成功')
      expect(notify.getMerchantOrderNo()).toBe('ORDER001')
      expect(notify.getTradeNo()).toBe('TRADE001')
      expect(notify.getAmt()).toBe(1000)
      expect(notify.getPaymentType()).toBe('CVS')
      expect(notify.getCodeNo()).toBe('12345678901234')
      expect(notify.getExpireDate()).toBe('2023-12-31')
      expect(notify.getExpireTime()).toBe('23:59:59')
      expect(notify.getBarcode1()).toBe('111')
      expect(notify.getBarcode2()).toBe('222')
      expect(notify.getBarcode3()).toBe('333')
      expect(notify.getStoreType()).toBe('FAMIC2C')
      expect(notify.isVerified()).toBe(true)
      expect(notify.getData()).toBeDefined()
      expect(notify.getRawData()).toBeDefined()
    })
  })

  describe('Result 解析失敗處理', () => {
    it('當 Result 不是 JSON 字串時應保留原始值', () => {
      const mockData = createMockNotifyData({
        Status: 'SUCCESS',
        Result: 'Not a JSON string',
      })

      notify.verify(mockData)
      expect(notify.getData().Result).toBe('Not a JSON string')
      expect(notify.getMerchantOrderNo()).toBe('')
    })
  })

  describe('未驗證狀態', () => {
    it('getter 方法應回傳預設值', () => {
      expect(notify.isVerified()).toBe(false)
      expect(notify.getStatus()).toBe('')
      expect(notify.getMerchantOrderNo()).toBe('')
      expect(notify.getAmt()).toBe(0)
      // ... check other getters if needed, usually representative ones are enough
    })
  })
})
