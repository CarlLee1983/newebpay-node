import { describe, it, expect } from 'bun:test'
import { CheckValueEncoder } from '../../../src/infrastructure/check-value-encoder.js'
import { NewebPayError } from '../../../src/errors/newebpay-error.js'

describe('CheckValueEncoder', () => {
  const hashKey = '12345678901234567890123456789012'
  const hashIV = '1234567890123456'

  describe('create', () => {
    it('應該建立 CheckValueEncoder 實例', () => {
      const encoder = CheckValueEncoder.create(hashKey, hashIV)
      expect(encoder).toBeInstanceOf(CheckValueEncoder)
    })
  })

  describe('generate', () => {
    it('應該產生正確的 CheckValue', () => {
      const encoder = new CheckValueEncoder(hashKey, hashIV)
      const tradeInfo = 'test-trade-info'

      const checkValue = encoder.generate(tradeInfo)

      expect(checkValue).toBeTruthy()
      expect(typeof checkValue).toBe('string')
      expect(checkValue.length).toBe(64) // SHA256 十六進位長度
      expect(checkValue).toBe(checkValue.toUpperCase()) // 應該是大寫
    })

    it('應該對相同的輸入產生相同的 CheckValue', () => {
      const encoder = new CheckValueEncoder(hashKey, hashIV)
      const tradeInfo = 'test-trade-info'

      const checkValue1 = encoder.generate(tradeInfo)
      const checkValue2 = encoder.generate(tradeInfo)

      expect(checkValue1).toBe(checkValue2)
    })

    it('應該對不同的輸入產生不同的 CheckValue', () => {
      const encoder = new CheckValueEncoder(hashKey, hashIV)

      const checkValue1 = encoder.generate('trade-info-1')
      const checkValue2 = encoder.generate('trade-info-2')

      expect(checkValue1).not.toBe(checkValue2)
    })

    it('應該使用正確的格式計算 CheckValue', () => {
      const encoder = new CheckValueEncoder(hashKey, hashIV)
      const tradeInfo = 'test-trade-info'

      // 手動計算預期值
      const raw = `HashKey=${hashKey}&${tradeInfo}&HashIV=${hashIV}`
      const expected = require('crypto')
        .createHash('sha256')
        .update(raw)
        .digest('hex')
        .toUpperCase()

      const actual = encoder.generate(tradeInfo)
      expect(actual).toBe(expected)
    })
  })

  describe('verify', () => {
    it('應該驗證正確的 CheckValue', () => {
      const encoder = new CheckValueEncoder(hashKey, hashIV)
      const tradeInfo = 'test-trade-info'
      const tradeSha = encoder.generate(tradeInfo)

      const isValid = encoder.verify(tradeInfo, tradeSha)
      expect(isValid).toBe(true)
    })

    it('應該拒絕錯誤的 CheckValue', () => {
      const encoder = new CheckValueEncoder(hashKey, hashIV)
      const tradeInfo = 'test-trade-info'
      const invalidTradeSha = 'invalid-check-value'

      const isValid = encoder.verify(tradeInfo, invalidTradeSha)
      expect(isValid).toBe(false)
    })

    it('應該忽略大小寫差異', () => {
      const encoder = new CheckValueEncoder(hashKey, hashIV)
      const tradeInfo = 'test-trade-info'
      const tradeSha = encoder.generate(tradeInfo)

      // 使用小寫驗證
      const isValid = encoder.verify(tradeInfo, tradeSha.toLowerCase())
      expect(isValid).toBe(true)
    })

    it('應該對不同的 tradeInfo 返回 false', () => {
      const encoder = new CheckValueEncoder(hashKey, hashIV)
      const tradeInfo1 = 'trade-info-1'
      const tradeInfo2 = 'trade-info-2'
      const tradeSha = encoder.generate(tradeInfo1)

      const isValid = encoder.verify(tradeInfo2, tradeSha)
      expect(isValid).toBe(false)
    })
  })

  describe('verifyOrFail', () => {
    it('應該在驗證成功時不拋出錯誤', () => {
      const encoder = new CheckValueEncoder(hashKey, hashIV)
      const tradeInfo = 'test-trade-info'
      const tradeSha = encoder.generate(tradeInfo)

      expect(() => {
        encoder.verifyOrFail(tradeInfo, tradeSha)
      }).not.toThrow()
    })

    it('應該在驗證失敗時拋出 NewebPayError', () => {
      const encoder = new CheckValueEncoder(hashKey, hashIV)
      const tradeInfo = 'test-trade-info'
      const invalidTradeSha = 'invalid-check-value'

      expect(() => {
        encoder.verifyOrFail(tradeInfo, invalidTradeSha)
      }).toThrow(NewebPayError)
    })

    it('應該拋出正確的錯誤訊息', () => {
      const encoder = new CheckValueEncoder(hashKey, hashIV)
      const tradeInfo = 'test-trade-info'
      const invalidTradeSha = 'invalid-check-value'

      try {
        encoder.verifyOrFail(tradeInfo, invalidTradeSha)
        expect(true).toBe(false) // 不應該執行到這裡
      } catch (error) {
        expect(error).toBeInstanceOf(NewebPayError)
        if (error instanceof NewebPayError) {
          expect(error.code).toBe('CHECK_VALUE_FAILED')
        }
      }
    })
  })
})

