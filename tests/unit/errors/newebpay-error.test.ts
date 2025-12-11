import { describe, it, expect } from 'bun:test'
import { NewebPayError } from '../../../src/errors/newebpay-error.js'

describe('NewebPayError', () => {
  describe('基本功能', () => {
    it('應該建立錯誤實例', () => {
      const error = new NewebPayError('測試錯誤')
      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(NewebPayError)
      expect(error.message).toBe('測試錯誤')
      expect(error.name).toBe('NewebPayError')
    })

    it('應該支援錯誤代碼', () => {
      const error = new NewebPayError('測試錯誤', 'TEST_CODE')
      expect(error.code).toBe('TEST_CODE')
    })

    it('應該支援選項參數', () => {
      const error = new NewebPayError('測試錯誤', 'TEST_CODE', {
        httpStatus: 404,
        url: 'https://example.com',
        field: 'testField',
      })

      expect(error.httpStatus).toBe(404)
      expect(error.url).toBe('https://example.com')
      expect(error.field).toBe('testField')
    })
  })

  describe('靜態工廠方法', () => {
    describe('required', () => {
      it('應該建立必填欄位錯誤', () => {
        const error = NewebPayError.required('MerchantID')
        expect(error.message).toContain('MerchantID')
        expect(error.message).toContain('必填欄位')
        expect(error.code).toBe('REQUIRED_FIELD')
        expect(error.field).toBe('MerchantID')
      })
    })

    describe('tooLong', () => {
      it('應該建立欄位過長錯誤', () => {
        const error = NewebPayError.tooLong('ItemDesc', 50)
        expect(error.message).toContain('ItemDesc')
        expect(error.message).toContain('最大長度')
        expect(error.message).toContain('50')
        expect(error.code).toBe('FIELD_TOO_LONG')
        expect(error.field).toBe('ItemDesc')
      })
    })

    describe('invalid', () => {
      it('應該建立無效欄位錯誤', () => {
        const error = NewebPayError.invalid('Amt', '金額必須大於 0')
        expect(error.message).toContain('Amt')
        expect(error.message).toContain('無效')
        expect(error.message).toContain('金額必須大於 0')
        expect(error.code).toBe('INVALID_FIELD')
        expect(error.field).toBe('Amt')
      })
    })

    describe('decryptFailed', () => {
      it('應該建立解密失敗錯誤', () => {
        const error = NewebPayError.decryptFailed()
        expect(error.message).toBe('解密失敗')
        expect(error.code).toBe('DECRYPT_FAILED')
      })
    })

    describe('checkValueFailed', () => {
      it('應該建立 CheckValue 驗證失敗錯誤', () => {
        const error = NewebPayError.checkValueFailed()
        expect(error.message).toBe('CheckValue 驗證失敗')
        expect(error.code).toBe('CHECK_VALUE_FAILED')
      })
    })

    describe('apiError', () => {
      it('應該建立 API 錯誤', () => {
        const error = NewebPayError.apiError('API 請求失敗')
        expect(error.message).toBe('API 請求失敗')
        expect(error.code).toBe('API_ERROR')
      })

      it('應該支援自訂錯誤代碼', () => {
        const error = NewebPayError.apiError('API 請求失敗', 'CUSTOM_ERROR')
        expect(error.code).toBe('CUSTOM_ERROR')
      })
    })

    describe('httpError', () => {
      it('應該建立 HTTP 錯誤', () => {
        const error = NewebPayError.httpError(404, 'Not Found', 'https://example.com')
        expect(error.message).toContain('404')
        expect(error.message).toContain('Not Found')
        expect(error.code).toBe('HTTP_ERROR')
        expect(error.httpStatus).toBe(404)
        expect(error.url).toBe('https://example.com')
      })

      it('應該支援不提供 URL', () => {
        const error = NewebPayError.httpError(500, 'Internal Server Error')
        expect(error.httpStatus).toBe(500)
        expect(error.url).toBeUndefined()
      })
    })

    describe('timeout', () => {
      it('應該建立超時錯誤', () => {
        const error = NewebPayError.timeout(30000, 'https://example.com')
        expect(error.message).toContain('30000')
        expect(error.message).toContain('timeout')
        expect(error.code).toBe('REQUEST_TIMEOUT')
        expect(error.url).toBe('https://example.com')
      })

      it('應該支援不提供 URL', () => {
        const error = NewebPayError.timeout(30000)
        expect(error.code).toBe('REQUEST_TIMEOUT')
        expect(error.url).toBeUndefined()
      })
    })

    describe('networkError', () => {
      it('應該建立網路錯誤', () => {
        const error = NewebPayError.networkError('連線失敗', 'https://example.com')
        expect(error.message).toContain('連線失敗')
        expect(error.code).toBe('NETWORK_ERROR')
        expect(error.url).toBe('https://example.com')
      })

      it('應該支援不提供 URL', () => {
        const error = NewebPayError.networkError('連線失敗')
        expect(error.code).toBe('NETWORK_ERROR')
        expect(error.url).toBeUndefined()
      })
    })
  })

  describe('toJSON', () => {
    it('應該正確轉換為 JSON 物件', () => {
      const error = new NewebPayError('測試錯誤', 'TEST_CODE', {
        httpStatus: 404,
        url: 'https://example.com',
        field: 'testField',
      })

      const json = error.toJSON()
      expect(json).toEqual({
        name: 'NewebPayError',
        message: '測試錯誤',
        code: 'TEST_CODE',
        httpStatus: 404,
        url: 'https://example.com',
        field: 'testField',
      })
    })

    it('應該處理未定義的屬性', () => {
      const error = new NewebPayError('測試錯誤')
      const json = error.toJSON()

      expect(json.name).toBe('NewebPayError')
      expect(json.message).toBe('測試錯誤')
      expect(json.code).toBeUndefined()
      expect(json.httpStatus).toBeUndefined()
      expect(json.url).toBeUndefined()
      expect(json.field).toBeUndefined()
    })
  })
})

