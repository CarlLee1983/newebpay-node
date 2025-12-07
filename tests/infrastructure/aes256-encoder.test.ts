import { describe, it, expect } from 'vitest'
import { Aes256Encoder } from '../../src/infrastructure/aes256-encoder.js'
import { NewebPayError } from '../../src/errors/newebpay-error.js'

describe('Aes256Encoder', () => {
  const hashKey = '12345678901234567890123456789012'
  const hashIV = '1234567890123456'

  describe('encrypt', () => {
    it('應該能正確加密資料', () => {
      const encoder = new Aes256Encoder(hashKey, hashIV)
      const data = {
        MerchantID: 'MS12345678',
        MerchantOrderNo: 'ORDER001',
        Amt: 1000,
        ItemDesc: '測試商品',
      }

      const encrypted = encoder.encrypt(data)

      expect(encrypted).toBeDefined()
      expect(typeof encrypted).toBe('string')
      expect(/^[0-9a-f]+$/i.test(encrypted)).toBe(true)
    })

    it('應該能過濾空值', () => {
      const encoder = new Aes256Encoder(hashKey, hashIV)
      const data = {
        MerchantID: 'MS12345678',
        Empty: '',
        Null: null,
        Undefined: undefined,
        Valid: 'value',
      }

      const encrypted = encoder.encrypt(data)

      expect(encrypted).toBeDefined()
    })

    it('使用靜態方法建立實例', () => {
      const encoder = Aes256Encoder.create(hashKey, hashIV)

      expect(encoder).toBeInstanceOf(Aes256Encoder)
    })
  })

  describe('decrypt', () => {
    it('應該能正確解密資料', () => {
      const encoder = new Aes256Encoder(hashKey, hashIV)
      const originalData = {
        MerchantID: 'MS12345678',
        MerchantOrderNo: 'ORDER001',
        Amt: '1000',
        ItemDesc: '測試商品',
      }

      const encrypted = encoder.encrypt(originalData)
      const decrypted = encoder.decrypt(encrypted)

      expect(decrypted['MerchantID']).toBe('MS12345678')
      expect(decrypted['MerchantOrderNo']).toBe('ORDER001')
      expect(decrypted['Amt']).toBe('1000')
    })

    it('無效的十六進位字串應拋出錯誤', () => {
      const encoder = new Aes256Encoder(hashKey, hashIV)

      expect(() => encoder.decrypt('invalid-hex')).toThrow(NewebPayError)
    })

    it('奇數長度的十六進位字串應拋出錯誤', () => {
      const encoder = new Aes256Encoder(hashKey, hashIV)

      expect(() => encoder.decrypt('abc')).toThrow(NewebPayError)
    })

    it('無效的加密資料應拋出錯誤', () => {
      const encoder = new Aes256Encoder(hashKey, hashIV)

      expect(() => encoder.decrypt('1234567890abcdef')).toThrow(NewebPayError)
    })
  })

  describe('encrypt/decrypt roundtrip', () => {
    it('加密後解密應該得到原始資料', () => {
      const encoder = new Aes256Encoder(hashKey, hashIV)
      const originalData = {
        MerchantID: 'MS12345678',
        MerchantOrderNo: 'ORDER123',
        Amt: '2500',
        ItemDesc: '商品描述',
        Email: 'test@example.com',
      }

      const encrypted = encoder.encrypt(originalData)
      const decrypted = encoder.decrypt(encrypted)

      expect(decrypted).toEqual(originalData)
    })
  })
})
