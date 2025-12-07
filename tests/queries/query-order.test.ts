import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { QueryOrder } from '../../src/queries/query-order.js'
import { NewebPayError } from '../../src/errors/newebpay-error.js'

describe('QueryOrder', () => {
  const merchantId = 'MS12345678'
  const hashKey = '12345678901234567890123456789012'
  const hashIV = '1234567890123456'

  let queryOrder: QueryOrder

  beforeEach(() => {
    queryOrder = new QueryOrder(merchantId, hashKey, hashIV)
    global.fetch = vi.fn()
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

      ;(global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockResult,
      })

      const result = await queryOrder.query('ORDER001', 1000)

      expect(result.MerchantOrderNo).toBe('ORDER001')
      expect(result.Amt).toBe(1000)
      expect(result.TradeStatus).toBe('1')

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/API/QueryTradeInfo'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
          // FetchHttpClient sends URLSearchParams, not string
          body: expect.any(URLSearchParams),
          // FetchHttpClient adds signal
          signal: expect.any(AbortSignal),
        }),
      )
    })

    it('API 回傳失敗應拋出錯誤', async () => {
      ;(global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => ({ Status: 'FAIL', Message: 'Query failed' }),
      })

      await expect(queryOrder.query('ORDER001', 1000)).rejects.toThrow(NewebPayError)
    })

    it('HTTP 錯誤應拋出錯誤', async () => {
      ;(global.fetch as any).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Server Error',
      })

      // Update to expect generic Error with message from FetchHttpClient
      await expect(queryOrder.query('ORDER001', 1000)).rejects.toThrow(
        'HTTP Error: 500 Server Error',
      )
    })

    it('回應缺少欄位應處理預設值', async () => {
      // Case 1: Empty response (Status undefined -> "", throws)
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      })
      await expect(queryOrder.query('ORDER001', 1000)).rejects.toThrow()

      // Case 2: Success but no result (Result undefined -> {})
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ Status: 'SUCCESS' }),
      })
      const result = await queryOrder.query('ORDER001', 1000)
      expect(result).toEqual({})
    })
  })
})
