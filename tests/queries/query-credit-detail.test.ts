import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { QueryCreditDetail } from '../../src/queries/query-credit-detail.js'
import { NewebPayError } from '../../src/errors/newebpay-error.js'
import type { HttpClientInterface } from '../../src/infrastructure/http/http-client.interface.js'

describe('QueryCreditDetail', () => {
  const merchantId = 'MS12345678'
  const hashKey = '12345678901234567890123456789012'
  const hashIV = '1234567890123456'

  let query: QueryCreditDetail
  let mockHttpClient: HttpClientInterface

  beforeEach(() => {
    mockHttpClient = {
      post: vi.fn(),
    }
    query = new QueryCreditDetail(merchantId, hashKey, hashIV, mockHttpClient)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('建構函式', () => {
    it('使用靜態方法建立實例', () => {
      const instance = QueryCreditDetail.create(merchantId, hashKey, hashIV)
      expect(instance).toBeInstanceOf(QueryCreditDetail)
    })
  })

  describe('setTestMode', () => {
    it('應該正確設定測試模式', () => {
      query.setTestMode(true)
      expect(query.getApiUrl()).toContain('ccore.newebpay.com')
      expect(query.getApiUrl()).toContain('/API/CreditCard/QueryTradeInfo')

      query.setTestMode(false)
      expect(query.getApiUrl()).toContain('core.newebpay.com')
    })
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
          CloseAmt: 1000,
          CloseStatus: '0',
          BackBalance: 0,
          BackStatus: '0',
          RespondCode: '00',
        },
      }

      ;(mockHttpClient.post as any).mockResolvedValue(mockResult)

      const result = await query.query('ORDER001', 1000)

      expect(result.MerchantOrderNo).toBe('ORDER001')
      expect(result.Amt).toBe(1000)
      expect(result.CloseStatus).toBe('0')

      expect(mockHttpClient.post).toHaveBeenCalledWith(
        expect.stringContaining('/API/CreditCard/QueryTradeInfo'),
        expect.objectContaining({
          MerchantID_: merchantId,
          PostData_: expect.any(String),
        }),
      )
    })

    it('API 回傳失敗應拋出錯誤', async () => {
      ;(mockHttpClient.post as any).mockResolvedValue({
        Status: 'FAIL',
        Message: 'Query failed',
      })

      await expect(query.query('ORDER001', 1000)).rejects.toThrow(NewebPayError)
    })

    it('HTTP 錯誤應拋出錯誤', async () => {
      ;(mockHttpClient.post as any).mockRejectedValue(
        new NewebPayError('HTTP Error: 500 Server Error', 'HTTP_ERROR'),
      )

      await expect(query.query('ORDER001', 1000)).rejects.toThrow(NewebPayError)
    })

    it('回應缺少欄位應處理預設值', async () => {
      // Case 1: Empty response (Status undefined -> "", throws)
      ;(mockHttpClient.post as any).mockResolvedValueOnce({})
      await expect(query.query('ORDER001', 1000)).rejects.toThrow()

      // Case 2: Success but no result (Result undefined -> {})
      ;(mockHttpClient.post as any).mockResolvedValueOnce({ Status: 'SUCCESS' })
      const result = await query.query('ORDER001', 1000)
      expect(result).toEqual({})
    })
  })
})
