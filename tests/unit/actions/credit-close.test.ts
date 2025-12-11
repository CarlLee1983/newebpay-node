import { describe, it, expect, beforeEach, mock } from 'bun:test'
import { CreditClose } from '../../../src/actions/credit-close.js'
import { NewebPayError } from '../../../src/errors/newebpay-error.js'
import { IndexType } from '../../../src/types/parameters.js'
import type { HttpClientInterface } from '../../../src/infrastructure/http/http-client.interface.js'

describe('CreditClose', () => {
  const hashKey = '12345678901234567890123456789012'
  const hashIV = '1234567890123456'
  const merchantId = 'MS12345678'

  let mockHttpClient: HttpClientInterface

  beforeEach(() => {
    mockHttpClient = {
      post: mock(() =>
        Promise.resolve({
          Status: 'SUCCESS',
          Message: '操作成功',
          Result: {
            MerchantID: merchantId,
            MerchantOrderNo: 'ORDER123',
            TradeNo: 'T123456',
            Amt: 1000,
            CloseType: 1,
          },
        }),
      ),
    } as HttpClientInterface
  })

  describe('create', () => {
    it('應該建立 CreditClose 實例', () => {
      const creditClose = CreditClose.create(merchantId, hashKey, hashIV)
      expect(creditClose).toBeInstanceOf(CreditClose)
    })
  })

  describe('基本設定', () => {
    it('應該設定測試模式', () => {
      const creditClose = new CreditClose(merchantId, hashKey, hashIV)
      expect(creditClose.getBaseUrl()).toBe('https://core.newebpay.com')

      creditClose.setTestMode(true)
      expect(creditClose.getBaseUrl()).toBe('https://ccore.newebpay.com')
    })

    it('應該返回正確的 API URL', () => {
      const creditClose = new CreditClose(merchantId, hashKey, hashIV)
      expect(creditClose.getApiUrl()).toBe('https://core.newebpay.com/API/CreditCard/Close')
    })
  })

  describe('pay', () => {
    it('應該執行請款操作', async () => {
      const creditClose = new CreditClose(merchantId, hashKey, hashIV, mockHttpClient)

      const result = await creditClose.pay('ORDER123', 1000)

      expect(result.MerchantOrderNo).toBe('ORDER123')
      expect(result.Amt).toBe(1000)
      expect(result.CloseType).toBe(1)
      expect(mockHttpClient.post).toHaveBeenCalledTimes(1)
    })

    it('應該支援使用 TradeNo 查詢', async () => {
      const creditClose = new CreditClose(merchantId, hashKey, hashIV, mockHttpClient)

      await creditClose.pay('ORDER123', 1000, IndexType.TRADE_NO, 'T123456')

      const callArgs = (mockHttpClient.post as ReturnType<typeof mock>).mock.calls[0]
      expect(callArgs[1].PostData_).toBeTruthy()
    })
  })

  describe('refund', () => {
    it('應該執行退款操作', async () => {
      const creditClose = new CreditClose(merchantId, hashKey, hashIV, mockHttpClient)

      const result = await creditClose.refund('ORDER123', 1000)

      expect(result.MerchantOrderNo).toBe('ORDER123')
      expect(result.Amt).toBe(1000)
    })
  })

  describe('cancelClose', () => {
    it('應該取消請退款操作', async () => {
      const creditClose = new CreditClose(merchantId, hashKey, hashIV, mockHttpClient)

      const result = await creditClose.cancelClose('ORDER123', 1000, 1)

      expect(result.MerchantOrderNo).toBe('ORDER123')
    })
  })

  describe('錯誤處理', () => {
    it('應該在 API 錯誤時拋出錯誤', async () => {
      const errorHttpClient = {
        post: mock(() =>
          Promise.resolve({
            Status: 'ERROR',
            Message: '操作失敗',
          }),
        ),
      } as HttpClientInterface

      const creditClose = new CreditClose(merchantId, hashKey, hashIV, errorHttpClient)

      await expect(creditClose.pay('ORDER123', 1000)).rejects.toThrow(NewebPayError)
    })
  })
})

