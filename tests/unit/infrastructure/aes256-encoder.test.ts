import { describe, it, expect } from 'bun:test'
import { Aes256Encoder } from '../../../src/infrastructure/aes256-encoder.js'
import { NewebPayError } from '../../../src/errors/newebpay-error.js'

describe('Aes256Encoder', () => {
  const hashKey = '12345678901234567890123456789012' // 32 bytes
  const hashIV = '1234567890123456' // 16 bytes

  describe('create', () => {
    it('應該建立 Aes256Encoder 實例', () => {
      const encoder = Aes256Encoder.create(hashKey, hashIV)
      expect(encoder).toBeInstanceOf(Aes256Encoder)
    })
  })

  describe('encrypt', () => {
    it('應該成功加密資料', () => {
      const encoder = new Aes256Encoder(hashKey, hashIV)
      const data = {
        MerchantID: 'MS12345678',
        MerchantOrderNo: 'ORDER123',
        Amt: 1000,
      }

      const encrypted = encoder.encrypt(data)
      expect(encrypted).toBeTruthy()
      expect(typeof encrypted).toBe('string')
      expect(encrypted.length).toBeGreaterThan(0)
      // 十六進位字串長度應該是偶數
      expect(encrypted.length % 2).toBe(0)
    })

    it('應該過濾空值、null 和 undefined', () => {
      const encoder = new Aes256Encoder(hashKey, hashIV)
      const data = {
        MerchantID: 'MS12345678',
        empty: '',
        nullValue: null,
        undefinedValue: undefined,
        valid: 'value',
      }

      const encrypted = encoder.encrypt(data)
      expect(encrypted).toBeTruthy()
    })

    it('應該處理空物件', () => {
      const encoder = new Aes256Encoder(hashKey, hashIV)
      const encrypted = encoder.encrypt({})
      expect(encrypted).toBeTruthy()
    })
  })

  describe('decrypt', () => {
    it('應該成功解密資料', () => {
      const encoder = new Aes256Encoder(hashKey, hashIV)
      const originalData = {
        MerchantID: 'MS12345678',
        MerchantOrderNo: 'ORDER123',
        Amt: '1000',
      }

      const encrypted = encoder.encrypt(originalData)
      const decrypted = encoder.decrypt(encrypted)

      expect(decrypted.MerchantID).toBe(originalData.MerchantID)
      expect(decrypted.MerchantOrderNo).toBe(originalData.MerchantOrderNo)
      expect(decrypted.Amt).toBe(originalData.Amt)
    })

    it('應該在無效的十六進位字串時拋出錯誤', () => {
      const encoder = new Aes256Encoder(hashKey, hashIV)

      expect(() => {
        encoder.decrypt('invalid-hex')
      }).toThrow(NewebPayError)
    })

    it('應該在奇數長度的十六進位字串時拋出錯誤', () => {
      const encoder = new Aes256Encoder(hashKey, hashIV)

      expect(() => {
        encoder.decrypt('abc')
      }).toThrow(NewebPayError)
    })

    it('應該在解密失敗時拋出錯誤', () => {
      const encoder = new Aes256Encoder(hashKey, hashIV)
      const invalidEncrypted = 'a'.repeat(64) // 有效的十六進位但無法解密

      expect(() => {
        encoder.decrypt(invalidEncrypted)
      }).toThrow(NewebPayError)
    })

    it('應該處理包含特殊字元的資料', () => {
      const encoder = new Aes256Encoder(hashKey, hashIV)
      const data = {
        MerchantID: 'MS12345678',
        ItemDesc: '商品&說明<測試>',
        Email: 'test@example.com',
      }

      const encrypted = encoder.encrypt(data)
      const decrypted = encoder.decrypt(encrypted)

      expect(decrypted.ItemDesc).toBe(data.ItemDesc)
    })
  })

  describe('加密解密往返測試', () => {
    it('應該能夠正確加密和解密複雜資料', () => {
      const encoder = new Aes256Encoder(hashKey, hashIV)
      const complexData = {
        MerchantID: 'MS12345678',
        MerchantOrderNo: 'ORDER-2024-001',
        Amt: 50000,
        ItemDesc: '測試商品',
        Email: 'customer@example.com',
        ReturnURL: 'https://example.com/return',
        NotifyURL: 'https://example.com/notify',
        TimeStamp: '1234567890',
        Version: '2.0',
      }

      const encrypted = encoder.encrypt(complexData)
      const decrypted = encoder.decrypt(encrypted)

      expect(decrypted.MerchantID).toBe(complexData.MerchantID)
      expect(decrypted.MerchantOrderNo).toBe(complexData.MerchantOrderNo)
      expect(decrypted.Amt).toBe(String(complexData.Amt))
      expect(decrypted.ItemDesc).toBe(complexData.ItemDesc)
    })
  })
})

