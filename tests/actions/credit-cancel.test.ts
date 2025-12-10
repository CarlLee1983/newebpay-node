import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { CreditCancel } from '../../src/actions/credit-cancel.js'
import { IndexType } from '../../src/types/parameters.js'
import { NewebPayError } from '../../src/errors/newebpay-error.js'
import type { HttpClientInterface } from '../../src/infrastructure/http/http-client.interface.js'

describe('CreditCancel', () => {
  const merchantId = 'MS12345678'
  const hashKey = '12345678901234567890123456789012'
  const hashIV = '1234567890123456'

  let action: CreditCancel
  let mockHttpClient: HttpClientInterface

  beforeEach(() => {
    mockHttpClient = {
      post: vi.fn(),
    }
    action = new CreditCancel(merchantId, hashKey, hashIV, mockHttpClient)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('建構函式', () => {
    it('使用靜態方法建立實例', () => {
      const instance = CreditCancel.create(merchantId, hashKey, hashIV)
      expect(instance).toBeInstanceOf(CreditCancel)
    })
  })

  describe('setTestMode', () => {
    it('應該正確設定測試模式', () => {
      action.setTestMode(true)
      expect(action.getApiUrl()).toContain('ccore.newebpay.com')

      action.setTestMode(false)
      expect(action.getApiUrl()).toContain('core.newebpay.com')
    })
  })

  describe('cancel', () => {
    it('成功取消應回傳結果', async () => {
      const mockResult = {
        Status: 'SUCCESS',
        Message: 'Success',
        Result: {
          MerchantID: merchantId,
          MerchantOrderNo: 'ORDER001',
          TradeNo: 'TRADE001',
          Amt: 1000,
        },
      }

      ;(mockHttpClient.post as any).mockResolvedValue(mockResult)

      const result = await action.cancel('ORDER001', 1000)

      expect(result.MerchantOrderNo).toBe('ORDER001')
      expect(result.Amt).toBe(1000)
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        expect.stringContaining('/API/CreditCard/Cancel'),
        expect.objectContaining({
          MerchantID_: merchantId,
          PostData_: expect.any(String),
        }),
      )
    })

    it('使用 TradeNo 取消', async () => {
      const mockResult = {
        Status: 'SUCCESS',
        Result: {},
      }

      ;(mockHttpClient.post as any).mockResolvedValue(mockResult)

      await action.cancel('ORDER001', 1000, IndexType.TRADE_NO, 'TRADE001')

      expect(mockHttpClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          PostData_: expect.any(String),
        }),
      )
    })

    it('API 回傳失敗應拋出錯誤', async () => {
      ;(mockHttpClient.post as any).mockResolvedValue({
        Status: 'FAIL',
        Message: 'Some error',
      })

      await expect(action.cancel('ORDER001', 1000)).rejects.toThrow(NewebPayError)
    })

    it('HTTP 錯誤應拋出錯誤', async () => {
      ;(mockHttpClient.post as any).mockRejectedValue(
        new NewebPayError('HTTP Error: 500 Server Error', 'HTTP_ERROR'),
      )

      await expect(action.cancel('ORDER001', 1000)).rejects.toThrow(NewebPayError)
    })
  })
})
