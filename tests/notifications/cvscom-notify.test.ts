import { describe, it, expect, beforeEach } from 'vitest'
import { CvscomNotify } from '../../src/notifications/cvscom-notify.js'
import { Aes256Encoder } from '../../src/infrastructure/aes256-encoder.js'
import { CheckValueEncoder } from '../../src/infrastructure/check-value-encoder.js'

describe('CvscomNotify', () => {
  const hashKey = '12345678901234567890123456789012'
  const hashIV = '1234567890123456'

  let notify: CvscomNotify
  let aesEncoder: Aes256Encoder
  let checkValueEncoder: CheckValueEncoder

  beforeEach(() => {
    notify = new CvscomNotify(hashKey, hashIV)
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

  describe('資料存取', () => {
    beforeEach(() => {
      const resultData = {
        MerchantOrderNo: 'ORDER001',
        TradeNo: 'TRADE001',
        Amt: 1000,
        PaymentType: 'CVSCOM',
        StoreCode: '0001',
        StoreName: 'ABC Store',
        StoreAddr: 'Taipei City',
        StoreType: 'FAMIC2C',
        CVSCOMName: 'John Doe',
        CVSCOMPhone: '0912345678',
        LgsNo: 'LGS123',
        LgsType: 'C2C',
      }

      const mockData = createMockNotifyData({
        Status: 'SUCCESS',
        Message: '取貨成功',
        Result: JSON.stringify(resultData),
      })

      notify.verify(mockData)
    })

    it('應該正確取得各項資料', () => {
      expect(notify.getStatus()).toBe('SUCCESS')
      expect(notify.getMessage()).toBe('取貨成功')
      expect(notify.getMerchantOrderNo()).toBe('ORDER001')
      expect(notify.getTradeNo()).toBe('TRADE001')
      expect(notify.getAmt()).toBe(1000)
      expect(notify.getPaymentType()).toBe('CVSCOM')
      expect(notify.getStoreCode()).toBe('0001')
      expect(notify.getStoreName()).toBe('ABC Store')
      expect(notify.getStoreAddr()).toBe('Taipei City')
      expect(notify.getStoreType()).toBe('FAMIC2C')
      expect(notify.getCVSCOMName()).toBe('John Doe')
      expect(notify.getCVSCOMPhone()).toBe('0912345678')
      expect(notify.getLgsNo()).toBe('LGS123')
      expect(notify.getLgsType()).toBe('C2C')
    })
  })
})
