import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { EWalletRefund } from '../../src/actions/ewallet-refund.js'
import { NewebPayError } from '../../src/errors/newebpay-error.js'

describe('EWalletRefund', () => {
  const merchantId = 'MS12345678'
  const hashKey = '12345678901234567890123456789012'
  const hashIV = '1234567890123456'

  let action: EWalletRefund

  beforeEach(() => {
    action = new EWalletRefund(merchantId, hashKey, hashIV)
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('建構函式', () => {
    it('使用靜態方法建立實例', () => {
      const instance = EWalletRefund.create(merchantId, hashKey, hashIV)
      expect(instance).toBeInstanceOf(EWalletRefund)
    })
  })

  describe('refund', () => {
    it('成功退款應回傳結果', async () => {
      const mockResult = {
        Status: 'SUCCESS',
        Message: 'Success',
        Result: {
          MerchantID: merchantId,
          MerchantOrderNo: 'ORDER001',
          Amt: 1000,
          RefundAmt: 1000,
        },
      }

      ;(global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockResult,
      })

      const result = await action.refund('ORDER001', 1000, 'LINEPAY')

      expect(result.MerchantOrderNo).toBe('ORDER001')
      expect(result.RefundAmt).toBe(1000)
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/API/EWallet/Refund'),
        expect.anything(),
      )
    })

    it('API 回傳失敗應拋出錯誤', async () => {
      ;(global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => ({ Status: 'FAIL', Message: 'Refund error' }),
      })

      await expect(action.refund('ORDER001', 1000, 'LINEPAY')).rejects.toThrow(NewebPayError)
    })
  })
})
