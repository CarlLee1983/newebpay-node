import { describe, it, expect, beforeEach, afterEach, mock } from 'bun:test'
import { QueryOrder } from '../../../src/queries/query-order.js'
import { NewebPayError } from '../../../src/errors/newebpay-error.js'
import type { HttpClientInterface } from '../../../src/infrastructure/http/http-client.interface.js'

describe('QueryOrder', () => {
  const hashKey = '12345678901234567890123456789012'
  const hashIV = '1234567890123456'
  const merchantId = 'MS12345678'

  let mockHttpClient: HttpClientInterface

  beforeEach(() => {
    mockHttpClient = {
      post: mock(() =>
        Promise.resolve({
          Status: 'SUCCESS',
          Message: '查詢成功',
          Result: {
            MerchantID: merchantId,
            MerchantOrderNo: 'ORDER123',
            TradeNo: 'T123456',
            Amt: 1000,
            TradeStatus: 'SUCCESS',
          },
        }),
      ),
    } as HttpClientInterface
  })

  describe('create', () => {
    it('應該建立 QueryOrder 實例', () => {
      const query = QueryOrder.create(merchantId, hashKey, hashIV)
      expect(query).toBeInstanceOf(QueryOrder)
    })
  })

  describe('基本設定', () => {
    it('應該設定測試模式', () => {
      const query = new QueryOrder(merchantId, hashKey, hashIV)
      expect(query.getBaseUrl()).toBe('https://core.newebpay.com')

      query.setTestMode(true)
      expect(query.getBaseUrl()).toBe('https://ccore.newebpay.com')
    })

    it('應該返回正確的 API URL', () => {
      const query = new QueryOrder(merchantId, hashKey, hashIV)
      expect(query.getApiUrl()).toBe('https://core.newebpay.com/API/QueryTradeInfo')
    })
  })

  describe('query', () => {
    it('應該成功查詢訂單', async () => {
      const query = new QueryOrder(merchantId, hashKey, hashIV, mockHttpClient)

      const result = await query.query('ORDER123', 1000)

      expect(result.MerchantID).toBe(merchantId)
      expect(result.MerchantOrderNo).toBe('ORDER123')
      expect(result.TradeNo).toBe('T123456')
      expect(result.Amt).toBe(1000)
      expect(mockHttpClient.post).toHaveBeenCalledTimes(1)
    })

    it('應該在 API 錯誤時拋出錯誤', async () => {
      const errorHttpClient = {
        post: mock(() =>
          Promise.resolve({
            Status: 'ERROR',
            Message: '查詢失敗',
          }),
        ),
      } as HttpClientInterface

      const query = new QueryOrder(merchantId, hashKey, hashIV, errorHttpClient)

      await expect(query.query('ORDER123', 1000)).rejects.toThrow(NewebPayError)
    })

    it('應該使用正確的請求參數', async () => {
      const query = new QueryOrder(merchantId, hashKey, hashIV, mockHttpClient)

      await query.query('ORDER123', 1000)

      const callArgs = (mockHttpClient.post as ReturnType<typeof mock>).mock.calls[0]
      expect(callArgs[0]).toContain('QueryTradeInfo')
      expect(callArgs[1].MerchantID).toBe(merchantId)
      expect(callArgs[1].MerchantOrderNo).toBe('ORDER123')
      expect(callArgs[1].Amt).toBe('1000')
    })
  })
})

