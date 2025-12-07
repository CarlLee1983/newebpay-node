import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { CreditCancel } from '../../src/actions/credit-cancel.js'
import { IndexType } from '../../src/types/parameters.js'
import { NewebPayError } from '../../src/errors/newebpay-error.js'

describe('CreditCancel', () => {
  const merchantId = 'MS12345678'
  const hashKey = '12345678901234567890123456789012'
  const hashIV = '1234567890123456'

  let action: CreditCancel

  beforeEach(() => {
    action = new CreditCancel(merchantId, hashKey, hashIV)
    // Mock global fetch
    global.fetch = vi.fn()
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

      ;(global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockResult,
      })

      const result = await action.cancel('ORDER001', 1000)

      expect(result.MerchantOrderNo).toBe('ORDER001')
      expect(result.Amt).toBe(1000)
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('https://core.newebpay.com/API/CreditCard/Cancel'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
        }),
      )
    })

    it('使用 TradeNo 取消', async () => {
      const mockResult = {
        Status: 'SUCCESS',
        Result: {},
      }

      ;(global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockResult,
      })

      await action.cancel('ORDER001', 1000, IndexType.TRADE_NO, 'TRADE001')

      // Verify payload in calls
      const call = (global.fetch as any).mock.calls[0]
      const body = new URLSearchParams(call[1].body)
      const postDataEncrypted = body.get('PostData_')
      expect(postDataEncrypted).toBeDefined()
    })

    it('API 回傳失敗應拋出錯誤', async () => {
      ;(global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => ({ Status: 'FAIL', Message: 'Some error' }),
      })

      await expect(action.cancel('ORDER001', 1000)).rejects.toThrow(NewebPayError)
    })

    it('HTTP 錯誤應拋出錯誤', async () => {
      ;(global.fetch as any).mockResolvedValue({
        ok: false,
        status: 500,
      })

      await expect(action.cancel('ORDER001', 1000)).rejects.toThrow(NewebPayError)
    })
  })
})
