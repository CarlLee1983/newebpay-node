import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { CreditClose } from '../../src/actions/credit-close.js'
import { CloseType, IndexType } from '../../src/types/parameters.js'
import { NewebPayError } from '../../src/errors/newebpay-error.js'
import type { HttpClientInterface } from '../../src/infrastructure/http/http-client.interface.js'

describe('CreditClose', () => {
  const merchantId = 'MS12345678'
  const hashKey = '12345678901234567890123456789012'
  const hashIV = '1234567890123456'

  let creditClose: CreditClose
  let mockHttpClient: HttpClientInterface

  beforeEach(() => {
    mockHttpClient = {
      post: vi.fn(),
    }
    creditClose = new CreditClose(merchantId, hashKey, hashIV, mockHttpClient)
  })

  describe('建構函式', () => {
    it('使用靜態方法建立實例', () => {
      const instance = CreditClose.create(merchantId, hashKey, hashIV)
      expect(instance).toBeInstanceOf(CreditClose)
    })
  })

  describe('常數', () => {
    it('CLOSE_TYPE_PAY 應該等於 CloseType.PAY', () => {
      expect(CreditClose.CLOSE_TYPE_PAY).toBe(CloseType.PAY)
    })

    it('CLOSE_TYPE_REFUND 應該等於 CloseType.REFUND', () => {
      expect(CreditClose.CLOSE_TYPE_REFUND).toBe(CloseType.REFUND)
    })
  })

  describe('setTestMode', () => {
    it('應該正確設定測試模式', () => {
      creditClose.setTestMode(true)
      expect(creditClose.getApiUrl()).toContain('ccore.newebpay.com')

      creditClose.setTestMode(false)
      expect(creditClose.getApiUrl()).toContain('core.newebpay.com')
    })
  })

  describe('getApiUrl', () => {
    it('測試模式應返回測試環境網址', () => {
      creditClose.setTestMode(true)
      expect(creditClose.getApiUrl()).toBe('https://ccore.newebpay.com/API/CreditCard/Close')
    })

    it('正式模式應返回正式環境網址', () => {
      creditClose.setTestMode(false)
      expect(creditClose.getApiUrl()).toBe('https://core.newebpay.com/API/CreditCard/Close')
    })
  })

  describe('IndexType', () => {
    it('應該正確使用 IndexType 列舉', () => {
      expect(IndexType.TRADE_NO).toBe('1')
      expect(IndexType.MERCHANT_ORDER_NO).toBe('2')
    })
  })

  describe('API 操作', () => {
    afterEach(() => {
      vi.resetAllMocks()
    })

    const mockSuccessResult = {
      Status: 'SUCCESS',
      Message: 'Operation Successful',
      Result: {
        MerchantID: merchantId,
        MerchantOrderNo: 'ORDER001',
        TradeNo: 'TRADE001',
        Amt: 1000,
        CloseType: 1,
      },
    }

    it('pay (請款) 應正確執行', async () => {
      ;(mockHttpClient.post as any).mockResolvedValue(mockSuccessResult)

      const result = await creditClose.pay('ORDER001', 1000)

      expect(result.MerchantOrderNo).toBe('ORDER001')
      expect(result.CloseType).toBe(1)

      expect(mockHttpClient.post).toHaveBeenCalledWith(
        expect.stringContaining('/API/CreditCard/Close'),
        expect.objectContaining({
          MerchantID_: merchantId,
          PostData_: expect.any(String),
        }),
      )
    })

    it('refund (退款) 應正確執行', async () => {
      ;(mockHttpClient.post as any).mockResolvedValue(mockSuccessResult)

      const result = await creditClose.refund('ORDER001', 1000)
      expect(result).toBeDefined()
    })

    it('cancelClose (取消) 應正確執行', async () => {
      ;(mockHttpClient.post as any).mockResolvedValue(mockSuccessResult)

      const result = await creditClose.cancelClose('ORDER001', 1000, CloseType.PAY)
      expect(result).toBeDefined()
    })

    it('應支援使用 TradeNo 進行操作', async () => {
      ;(mockHttpClient.post as any).mockResolvedValue(mockSuccessResult)

      await creditClose.pay('ORDER001', 1000, IndexType.TRADE_NO, 'TRADE001')

      // Assertions on the underlying call could verify TradeNo validation if needed
    })

    it('API 錯誤應拋出異常', async () => {
      ;(mockHttpClient.post as any).mockResolvedValue({
        Status: 'FAIL',
        Message: 'Error',
      })

      await expect(creditClose.pay('ORDER001', 1000)).rejects.toThrow()
    })

    it('HTTP 錯誤應拋出異常', async () => {
      ;(mockHttpClient.post as any).mockRejectedValue(
        new NewebPayError('HTTP Error: 500 Server Error', 'HTTP_ERROR'),
      )

      await expect(creditClose.pay('ORDER001', 1000)).rejects.toThrow()
    })
  })
})
