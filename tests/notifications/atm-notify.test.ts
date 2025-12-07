import { describe, it, expect, beforeEach } from 'vitest'
import { AtmNotify } from '../../src/notifications/atm-notify.js'
import { Aes256Encoder } from '../../src/infrastructure/aes256-encoder.js'
import { CheckValueEncoder } from '../../src/infrastructure/check-value-encoder.js'

describe('AtmNotify', () => {
  const hashKey = '12345678901234567890123456789012'
  const hashIV = '1234567890123456'

  let notify: AtmNotify
  let aesEncoder: Aes256Encoder
  let checkValueEncoder: CheckValueEncoder

  beforeEach(() => {
    notify = new AtmNotify(hashKey, hashIV)
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
      const instance = AtmNotify.create(hashKey, hashIV)
      expect(instance).toBeInstanceOf(AtmNotify)
    })
  })

  describe('資料存取', () => {
    beforeEach(() => {
      const resultData = {
        MerchantOrderNo: 'ORDER001',
        TradeNo: 'TRADE001',
        Amt: 1000,
        BankCode: '808',
        CodeNo: '12345678901234',
        ExpireDate: '2023-12-31',
        ExpireTime: '23:59:59',
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
      expect(notify.getMessage()).toBe('取號成功')
      expect(notify.getMerchantOrderNo()).toBe('ORDER001')
      expect(notify.getTradeNo()).toBe('TRADE001')
      expect(notify.getAmt()).toBe(1000)
      expect(notify.getBankCode()).toBe('808')
      expect(notify.getCodeNo()).toBe('12345678901234')
      expect(notify.getExpireDate()).toBe('2023-12-31')
      expect(notify.getExpireTime()).toBe('23:59:59')
    })
  })
})
