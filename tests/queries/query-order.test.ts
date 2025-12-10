import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { QueryOrder } from '../../src/queries/query-order.js'
import { NewebPayError } from '../../src/errors/newebpay-error.js'
import type { HttpClientInterface } from '../../src/infrastructure/http/http-client.interface.js'

describe('QueryOrder', () => {
  const merchantId = 'MS12345678'
  const hashKey = '12345678901234567890123456789012'
  const hashIV = '1234567890123456'

  let queryOrder: QueryOrder
  let mockHttpClient: HttpClientInterface

  beforeEach(() => {
    mockHttpClient = {
      post: vi.fn(),
    }
    queryOrder = new QueryOrder(merchantId, hashKey, hashIV, mockHttpClient)
  })

  describe('建構函式', () => {
    it('使用靜態方法建立實例', () => {
      const instance = QueryOrder.create(merchantId, hashKey, hashIV)
      expect(instance).toBeInstanceOf(QueryOrder)
    })
  })

  describe('setTestMode', () => {
    it('應該正確設定測試模式', () => {
      queryOrder.setTestMode(true)
      expect(queryOrder.getApiUrl()).toContain('ccore.newebpay.com')

      queryOrder.setTestMode(false)
      expect(queryOrder.getApiUrl()).toContain('core.newebpay.com')
    })
  })

  describe('getApiUrl', () => {
    it('測試模式應返回測試環境網址', () => {
      queryOrder.setTestMode(true)
      expect(queryOrder.getApiUrl()).toBe('https://ccore.newebpay.com/API/QueryTradeInfo')
    })

    it('正式模式應返回正式環境網址', () => {
      queryOrder.setTestMode(false)
      expect(queryOrder.getApiUrl()).toBe('https://core.newebpay.com/API/QueryTradeInfo')
    })
  })

  describe('鏈式呼叫', () => {
    it('setTestMode 應支援鏈式呼叫', () => {
      const result = queryOrder.setTestMode(true)
      expect(result).toBe(queryOrder)
    })
  })
  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('query', () => {
    it('成功查詢應回傳結果', async () => {
      const mockResult = {
        Status: 'SUCCESS',
        Message: '查詢成功',
        Result: {
          MerchantID: merchantId,
          MerchantOrderNo: 'ORDER001',
          TradeNo: 'TRADE001',
          Amt: 1000,
          TradeStatus: '1',
          PaymentType: 'CREDIT',
        },
      }

      ;(mockHttpClient.post as any).mockResolvedValue(mockResult)

      const result = await queryOrder.query('ORDER001', 1000)

      expect(result.MerchantOrderNo).toBe('ORDER001')
      expect(result.Amt).toBe(1000)
      expect(result.TradeStatus).toBe('1')

      expect(mockHttpClient.post).toHaveBeenCalledWith(
        expect.stringContaining('/API/QueryTradeInfo'),
        expect.objectContaining({
          MerchantID: merchantId,
          MerchantOrderNo: 'ORDER001',
          Amt: '1000',
          CheckValue: expect.any(String),
        }),
      )
    })

    it('API 回傳失敗應拋出錯誤', async () => {
      ;(mockHttpClient.post as any).mockResolvedValue({
        Status: 'FAIL',
        Message: 'Query failed',
      })

      await expect(queryOrder.query('ORDER001', 1000)).rejects.toThrow(NewebPayError)
    })

    it('HTTP 錯誤應拋出錯誤', async () => {
      ;(mockHttpClient.post as any).mockRejectedValue(
        new NewebPayError('HTTP Error: 500 Server Error', 'HTTP_ERROR'),
      )

      await expect(queryOrder.query('ORDER001', 1000)).rejects.toThrow(
        'HTTP Error: 500 Server Error',
      )
    })

    it('回應缺少欄位應處理預設值', async () => {
      // Case 1: Empty response (Status undefined -> "", throws)
      ;(mockHttpClient.post as any).mockResolvedValueOnce({})
      await expect(queryOrder.query('ORDER001', 1000)).rejects.toThrow()

      // Case 2: Success but no result (Result undefined -> {})
      ;(mockHttpClient.post as any).mockResolvedValueOnce({ Status: 'SUCCESS' })
      const result = await queryOrder.query('ORDER001', 1000)
      expect(result).toEqual({})
    })
  })
})
