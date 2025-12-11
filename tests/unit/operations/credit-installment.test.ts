import { describe, it, expect } from 'bun:test'
import { CreditInstallment } from '../../../src/operations/credit-installment.js'
import { NewebPayError } from '../../../src/errors/newebpay-error.js'

describe('CreditInstallment', () => {
  const hashKey = '12345678901234567890123456789012'
  const hashIV = '1234567890123456'
  const merchantId = 'MS12345678'

  describe('基本功能', () => {
    it('應該建立 CreditInstallment 實例', () => {
      const payment = new CreditInstallment(merchantId, hashKey, hashIV)
      expect(payment).toBeInstanceOf(CreditInstallment)
    })

    it('應該初始化 InstFlag 參數', () => {
      const payment = new CreditInstallment(merchantId, hashKey, hashIV)
      const rawContent = payment.getRawContent()
      expect(rawContent.InstFlag).toBe(1)
    })
  })

  describe('setInstallment', () => {
    it('應該設定有效的分期期數', () => {
      const payment = new CreditInstallment(merchantId, hashKey, hashIV)
      payment.setInstallment([3, 6, 12])
      expect(payment.get('InstFlag')).toBe('3,6,12')
    })

    it('應該支援單一分期期數', () => {
      const payment = new CreditInstallment(merchantId, hashKey, hashIV)
      payment.setInstallment([6])
      expect(payment.get('InstFlag')).toBe('6')
    })

    it('應該在無效的分期期數時拋出錯誤', () => {
      const payment = new CreditInstallment(merchantId, hashKey, hashIV)

      expect(() => {
        payment.setInstallment([2])
      }).toThrow(NewebPayError)

      expect(() => {
        payment.setInstallment([5])
      }).toThrow(NewebPayError)

      expect(() => {
        payment.setInstallment([36])
      }).toThrow(NewebPayError)
    })

    it('應該支援所有允許的分期期數', () => {
      const payment = new CreditInstallment(merchantId, hashKey, hashIV)
      const allowedInstallments = [3, 6, 12, 18, 24, 30]

      payment.setInstallment(allowedInstallments)
      expect(payment.get('InstFlag')).toBe('3,6,12,18,24,30')
    })
  })

  describe('驗證', () => {
    it('應該在設定必要參數後通過驗證', () => {
      const payment = new CreditInstallment(merchantId, hashKey, hashIV)
      payment.setInstallment([3, 6])
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')

      const payload = payment.getPayload()
      expect(payload).toBeTruthy()
      expect(payload.InstFlag).toBe('3,6')
    })
  })
})

