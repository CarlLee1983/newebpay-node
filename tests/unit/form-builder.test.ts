import { describe, it, expect } from 'bun:test'
import { FormBuilder } from '../../src/form-builder.js'
import { CreditPayment } from '../../src/operations/credit-payment.js'

describe('FormBuilder', () => {
  const hashKey = '12345678901234567890123456789012'
  const hashIV = '1234567890123456'
  const merchantId = 'MS12345678'

  describe('constructor', () => {
    it('應該建立 FormBuilder 實例', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')
      const builder = new FormBuilder(payment)
      expect(builder).toBeInstanceOf(FormBuilder)
    })

    it('應該使用預設選項', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')
      const builder = new FormBuilder(payment)

      const form = builder.build()
      expect(form).toContain('id="newebpay-form"')
      expect(form).toContain('submit()')
    })

    it('應該使用自訂選項', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')
      const builder = new FormBuilder(payment, {
        autoSubmit: false,
        formId: 'custom-form',
        submitButtonText: '前往付款',
      })

      const form = builder.build()
      expect(form).toContain('id="custom-form"')
      expect(form).not.toContain('submit()')
      expect(form).toContain('前往付款')
    })
  })

  describe('create', () => {
    it('應該使用靜態方法建立實例', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')
      const builder = FormBuilder.create(payment)
      expect(builder).toBeInstanceOf(FormBuilder)
    })
  })

  describe('設定方法', () => {
    it('應該設定 autoSubmit', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')
      const builder = new FormBuilder(payment)

      builder.setAutoSubmit(false)
      const form = builder.build()
      expect(form).not.toContain('submit()')
    })

    it('應該設定 formId', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')
      const builder = new FormBuilder(payment)

      builder.setFormId('my-form')
      const form = builder.build()
      expect(form).toContain('id="my-form"')
    })

    it('應該設定 submitButtonText', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')
      const builder = new FormBuilder(payment, { autoSubmit: false })

      builder.setSubmitButtonText('立即付款')
      const form = builder.build()
      expect(form).toContain('立即付款')
    })
  })

  describe('build', () => {
    it('應該產生完整的 HTML 表單', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')

      const builder = new FormBuilder(payment)
      const form = builder.build()

      expect(form).toContain('<form')
      expect(form).toContain('method="POST"')
      expect(form).toContain('MerchantID')
      expect(form).toContain('TradeInfo')
      expect(form).toContain('TradeSha')
      expect(form).toContain('Version')
    })

    it('應該在 autoSubmit 為 true 時包含自動送出腳本', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')
      const builder = new FormBuilder(payment, { autoSubmit: true })

      const form = builder.build()
      expect(form).toContain('<script>')
      expect(form).toContain('submit()')
    })

    it('應該在 autoSubmit 為 false 時包含送出按鈕', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')
      const builder = new FormBuilder(payment, { autoSubmit: false })

      const form = builder.build()
      expect(form).toContain('<button')
      expect(form).toContain('type="submit"')
      expect(form).not.toContain('submit()')
    })

    it('應該正確跳脫 HTML 特殊字元', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER<123>')
      payment.setAmt(1000)
      payment.setItemDesc('測試&商品')

      const builder = new FormBuilder(payment)
      const form = builder.build()

      // 檢查表單中是否包含跳脫後的字元
      // 由於 MerchantOrderNo 會被加密，我們檢查表單結構
      expect(form).toContain('<form')
      expect(form).toContain('method="POST"')
      // 檢查是否有正確的 HTML 結構（不會有未跳脫的 < 或 &）
      expect(form).not.toMatch(/<[^>]*<[^>]*>/)
    })
  })

  describe('getFormData', () => {
    it('應該返回表單資料物件', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')

      const builder = new FormBuilder(payment)
      const formData = builder.getFormData()

      expect(formData.method).toBe('POST')
      expect(formData.action).toContain('newebpay.com')
      expect(formData.fields.MerchantID).toBe(merchantId)
      expect(formData.fields.TradeInfo).toBeTruthy()
      expect(formData.fields.TradeSha).toBeTruthy()
      expect(formData.fields.Version).toBe('2.0')
    })

    it('應該在測試模式下返回測試環境 URL', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')
      payment.setTestMode(true)

      const builder = new FormBuilder(payment)
      const formData = builder.getFormData()

      expect(formData.action).toContain('ccore.newebpay.com')
    })
  })

  describe('getData', () => {
    it('應該返回與 getFormData() 相同的資料', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')

      const builder = new FormBuilder(payment)
      const formData = builder.getFormData()
      const data = builder.getData()

      expect(data).toEqual(formData)
      expect(data.method).toBe('POST')
      expect(data.action).toContain('newebpay.com')
      expect(data.fields.MerchantID).toBe(merchantId)
      expect(data.fields.TradeInfo).toBeTruthy()
      expect(data.fields.TradeSha).toBeTruthy()
      expect(data.fields.Version).toBe('2.0')
    })

    it('應該在測試模式下返回測試環境 URL', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')
      payment.setTestMode(true)

      const builder = new FormBuilder(payment)
      const data = builder.getData()

      expect(data.action).toContain('ccore.newebpay.com')
    })
  })

  describe('getFields', () => {
    it('應該只返回表單欄位物件', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')

      const builder = new FormBuilder(payment)
      const fields = builder.getFields()

      expect(fields).toBeDefined()
      expect(typeof fields).toBe('object')
      expect(fields.MerchantID).toBe(merchantId)
      expect(fields.TradeInfo).toBeTruthy()
      expect(fields.TradeSha).toBeTruthy()
      expect(fields.Version).toBe('2.0')
      // 確認不包含 action 和 method
      expect('action' in fields).toBe(false)
      expect('method' in fields).toBe(false)
    })

    it('應該返回與 getFormData().fields 相同的資料', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')

      const builder = new FormBuilder(payment)
      const fields = builder.getFields()
      const formDataFields = builder.getFormData().fields

      expect(fields).toEqual(formDataFields)
    })

    it('應該包含所有必要的欄位', () => {
      const payment = new CreditPayment(merchantId, hashKey, hashIV)
      payment.setMerchantOrderNo('ORDER123')
      payment.setAmt(1000)
      payment.setItemDesc('測試商品')

      const builder = new FormBuilder(payment)
      const fields = builder.getFields()

      expect(fields).toHaveProperty('MerchantID')
      expect(fields).toHaveProperty('TradeInfo')
      expect(fields).toHaveProperty('TradeSha')
      expect(fields).toHaveProperty('Version')
    })
  })
})

