import { describe, it, expect } from 'bun:test'
import { Content } from '../../src/content.js'
import { CreditPayment } from '../../src/operations/credit-payment.js'
import { NewebPayError } from '../../src/errors/newebpay-error.js'

describe('Content', () => {
  const hashKey = '12345678901234567890123456789012'
  const hashIV = '1234567890123456'
  const merchantId = 'MS12345678'

  describe('constructor', () => {
    it('應該成功建立 Content 實例', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      expect(payment).toBeInstanceOf(Content)
    })

    it('應該在缺少 HashKey 時拋出錯誤', () => {
      expect(() => {
        new CreditPayment(merchantId, '', hashIV)
      }).toThrow(NewebPayError)
    })

    it('應該在缺少 HashIV 時拋出錯誤', () => {
      expect(() => {
        new CreditPayment(merchantId, hashKey, '')
      }).toThrow(NewebPayError)
    })
  })

  describe('基本設定方法', () => {
    it('應該設定和取得 MerchantID', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      expect(payment.getMerchantID()).toBe(merchantId)

      payment.setMerchantID('MS99999999')
      expect(payment.getMerchantID()).toBe('MS99999999')
    })

    it('應該設定 HashKey 和 HashIV', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setHashKey('new-key')
      payment.setHashIV('new-iv')
      // 無法直接驗證，但應該不會拋出錯誤
      expect(payment).toBeTruthy()
    })

    it('應該設定測試模式', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      expect(payment.isTestMode()).toBe(false)

      payment.setTestMode(true)
      expect(payment.isTestMode()).toBe(true)
    })
  })

  describe('參數設定方法', () => {
    it('應該設定 MerchantOrderNo', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      expect(payment.get<string>('MerchantOrderNo')).toBe('ORDER123')
    })

    it('應該在 MerchantOrderNo 過長時拋出錯誤', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      const longOrderNo = 'A'.repeat(31) // 超過 30 字元

      expect(() => {
        payment.setMerchantOrderNo(longOrderNo)
      }).toThrow(NewebPayError)
    })

    it('應該設定 TimeStamp', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setTimeStamp('1234567890')
      expect(payment.get<string>('TimeStamp')).toBe('1234567890')
    })

    it('應該設定 Amt', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setAmt(1000)
      expect(payment.get<number>('Amt')).toBe(1000)
    })

    it('應該在金額小於等於 0 時拋出錯誤', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)

      expect(() => {
        payment.setAmt(0)
      }).toThrow(NewebPayError)

      expect(() => {
        payment.setAmt(-100)
      }).toThrow(NewebPayError)
    })

    it('應該設定 ItemDesc', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setItemDesc('測試商品')
      expect(payment.get<string>('ItemDesc')).toBe('測試商品')
    })

    it('應該在 ItemDesc 過長時拋出錯誤', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      const longDesc = 'A'.repeat(51) // 超過 50 字元

      expect(() => {
        payment.setItemDesc(longDesc)
      }).toThrow(NewebPayError)
    })

    it('應該設定 TradeLimit', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setTradeLimit(300)
      expect(payment.get<number>('TradeLimit')).toBe(300)
    })

    it('應該在 TradeLimit 超出範圍時拋出錯誤', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)

      expect(() => {
        payment.setTradeLimit(59)
      }).toThrow(NewebPayError)

      expect(() => {
        payment.setTradeLimit(901)
      }).toThrow(NewebPayError)
    })

    it('應該設定各種 URL', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setReturnURL('https://example.com/return')
      payment.setNotifyURL('https://example.com/notify')
      payment.setCustomerURL('https://example.com/customer')
      payment.setClientBackURL('https://example.com/back')

      expect(payment.get<string>('ReturnURL')).toBe('https://example.com/return')
      expect(payment.get<string>('NotifyURL')).toBe('https://example.com/notify')
      expect(payment.get<string>('CustomerURL')).toBe('https://example.com/customer')
      expect(payment.get<string>('ClientBackURL')).toBe('https://example.com/back')
    })

    it('應該設定 Email', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setEmail('test@example.com')
      expect(payment.get<string>('Email')).toBe('test@example.com')
    })

    it('應該在 Email 過長時拋出錯誤', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      const longEmail = 'a'.repeat(51) + '@example.com'

      expect(() => {
        payment.setEmail(longEmail)
      }).toThrow(NewebPayError)
    })

    it('應該設定其他參數', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setExpireDate('20241231')
      payment.setEmailModify(1)
      payment.setOrderComment('備註')
      payment.setLangType('en')

      expect(payment.get<string>('ExpireDate')).toBe('20241231')
      expect(payment.get<number>('EmailModify')).toBe(1)
      expect(payment.get<string>('OrderComment')).toBe('備註')
      expect(payment.get<string>('LangType')).toBe('en')
    })
  })

  describe('URL 相關方法', () => {
    it('應該返回正確的請求路徑', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      expect(payment.getRequestPath()).toBe('/MPG/mpg_gateway')
    })

    it('應該返回正確的基礎 URL', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      expect(payment.getBaseUrl()).toBe('https://core.newebpay.com')

      payment.setTestMode(true)
      expect(payment.getBaseUrl()).toBe('https://ccore.newebpay.com')
    })

    it('應該返回正確的完整 API URL', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      expect(payment.getApiUrl()).toBe('https://core.newebpay.com/MPG/mpg_gateway')

      payment.setTestMode(true)
      expect(payment.getApiUrl()).toBe('https://ccore.newebpay.com/MPG/mpg_gateway')
    })
  })

  describe('驗證方法', () => {
    it('應該在缺少必要參數時拋出錯誤', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)

      expect(() => {
        payment.getPayload()
      }).toThrow(NewebPayError)
    })

    it('應該在設定必要參數後通過驗證', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')

      const payload = payment.getPayload()
      expect(payload).toBeTruthy()
      expect(payload.MerchantID).toBe(merchantId)
      expect(payload.MerchantOrderNo).toBe('ORDER123')
      expect(payload.Amt).toBe(1000)
    })
  })

  describe('內容產生方法', () => {
    it('應該產生正確的 Payload', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')

      const payload = payment.getPayload()
      expect(payload.MerchantID).toBe(merchantId)
      expect(payload.MerchantOrderNo).toBe('ORDER123')
      expect(payload.Amt).toBe(1000)
      expect(payload.ItemDesc).toBe('測試商品')
      expect(payload.Version).toBe('2.0')
    })

    it('應該過濾空值', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')
      payment.set('EmptyString', '')
      payment.set('NullValue', null)
      payment.set('UndefinedValue', undefined)

      const payload = payment.getPayload()
      expect(payload.EmptyString).toBeUndefined()
      expect(payload.NullValue).toBeUndefined()
      expect(payload.UndefinedValue).toBeUndefined()
    })

    it('應該產生加密的內容', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')

      const content = payment.getContent()
      expect(content.MerchantID).toBe(merchantId)
      expect(content.TradeInfo).toBeTruthy()
      expect(content.TradeSha).toBeTruthy()
      expect(content.Version).toBe('2.0')
      expect(typeof content.TradeInfo).toBe('string')
      expect(typeof content.TradeSha).toBe('string')
    })

    it('應該返回原始內容', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)

      const rawContent = payment.getRawContent()
      expect(rawContent.MerchantOrderNo).toBe('ORDER123')
      expect(rawContent.Amt).toBe(1000)
    })
  })

  describe('自訂內容方法', () => {
    it('應該設定和取得自訂內容', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.set('CustomKey', 'CustomValue')

      expect(payment.get<string>('CustomKey')).toBe('CustomValue')
      expect(payment.get('NonExistent', 'default')).toBe('default')
    })
  })
})

