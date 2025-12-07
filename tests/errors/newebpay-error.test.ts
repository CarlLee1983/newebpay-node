import { describe, it, expect } from 'vitest'
import { NewebPayError } from '../../src/errors/newebpay-error.js'

describe('NewebPayError', () => {
  it('應正確設定錯誤訊息與代碼', () => {
    const error = new NewebPayError('Test message', 'TEST_CODE')
    expect(error.message).toBe('Test message')
    expect(error.code).toBe('TEST_CODE')
    expect(error.name).toBe('NewebPayError')
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(NewebPayError)
  })

  describe('工廠方法', () => {
    it('required', () => {
      const error = NewebPayError.required('Field')
      expect(error.message).toContain('Field 為必填欄位')
      expect(error.code).toBe('REQUIRED_FIELD')
    })

    it('tooLong', () => {
      const error = NewebPayError.tooLong('Field', 10)
      expect(error.message).toContain('Field 超過最大長度 10')
      expect(error.code).toBe('FIELD_TOO_LONG')
    })

    it('invalid', () => {
      const error = NewebPayError.invalid('Field', 'Reason')
      expect(error.message).toContain('Field 無效：Reason')
      expect(error.code).toBe('INVALID_FIELD')
    })

    it('decryptFailed', () => {
      const error = NewebPayError.decryptFailed()
      expect(error.message).toBe('解密失敗')
      expect(error.code).toBe('DECRYPT_FAILED')
    })

    it('checkValueFailed', () => {
      const error = NewebPayError.checkValueFailed()
      expect(error.message).toBe('CheckValue 驗證失敗')
      expect(error.code).toBe('CHECK_VALUE_FAILED')
    })

    it('apiError', () => {
      const error1 = NewebPayError.apiError('API Message')
      expect(error1.message).toBe('API Message')
      expect(error1.code).toBe('API_ERROR')

      const error2 = NewebPayError.apiError('API Message', 'CUSTOM_CODE')
      expect(error2.code).toBe('CUSTOM_CODE')
    })
  })
})
