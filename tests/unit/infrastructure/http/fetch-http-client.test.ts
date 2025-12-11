import { describe, it, expect, beforeEach, afterEach } from 'bun:test'
import { FetchHttpClient } from '../../../../src/infrastructure/http/fetch-http-client.js'
import { NewebPayError } from '../../../../src/errors/newebpay-error.js'

// Mock fetch
const originalFetch = global.fetch

describe('FetchHttpClient', () => {
  beforeEach(() => {
    // 重置 fetch mock
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  describe('constructor', () => {
    it('應該使用預設選項建立實例', () => {
      const client = new FetchHttpClient()
      expect(client).toBeInstanceOf(FetchHttpClient)
    })

    it('應該使用自訂選項建立實例', () => {
      const client = new FetchHttpClient({
        timeout: 60000,
        retries: 3,
      })
      expect(client).toBeInstanceOf(FetchHttpClient)
    })
  })

  describe('post', () => {
    it('應該成功發送 POST 請求', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        json: async () => ({ success: true, data: 'test' }),
      }

      global.fetch = async () => mockResponse as Response

      const client = new FetchHttpClient()
      const result = await client.post('https://example.com/api', { key: 'value' })

      expect(result).toEqual({ success: true, data: 'test' })
    })

    it('應該使用正確的請求參數', async () => {
      let capturedUrl = ''
      let capturedOptions: RequestInit | undefined

      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        json: async () => ({}),
      }

      global.fetch = async (url: string | URL | Request, options?: RequestInit) => {
        capturedUrl = String(url)
        capturedOptions = options
        return mockResponse as Response
      }

      const client = new FetchHttpClient()
      await client.post('https://example.com/api', { key: 'value', num: 123 })

      expect(capturedUrl).toBe('https://example.com/api')
      expect(capturedOptions?.method).toBe('POST')
      expect(capturedOptions?.headers).toHaveProperty('Content-Type', 'application/x-www-form-urlencoded')
    })

    it('應該在 HTTP 錯誤時拋出 NewebPayError', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({}),
      }

      global.fetch = async () => mockResponse as Response

      const client = new FetchHttpClient()

      await expect(
        client.post('https://example.com/api', { key: 'value' }),
      ).rejects.toThrow(NewebPayError)
    })

    it('應該在 JSON 解析失敗時拋出錯誤', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        json: async () => {
          throw new Error('Invalid JSON')
        },
      }

      global.fetch = async () => mockResponse as Response

      const client = new FetchHttpClient()

      await expect(
        client.post('https://example.com/api', { key: 'value' }),
      ).rejects.toThrow(NewebPayError)
    })

    it('應該在超時時拋出錯誤', async () => {
      global.fetch = async () => {
        await new Promise((resolve) => setTimeout(resolve, 100))
        const error = new Error('AbortError')
        error.name = 'AbortError'
        throw error
      }

      const client = new FetchHttpClient({ timeout: 10 })

      await expect(
        client.post('https://example.com/api', { key: 'value' }),
      ).rejects.toThrow(NewebPayError)
    })

    it('應該在網路錯誤時拋出錯誤', async () => {
      global.fetch = async () => {
        throw new Error('Network error')
      }

      const client = new FetchHttpClient()

      await expect(
        client.post('https://example.com/api', { key: 'value' }),
      ).rejects.toThrow(NewebPayError)
    })

    it('應該支援重試機制', async () => {
      let callCount = 0
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        json: async () => ({ success: true }),
      }

      global.fetch = async () => {
        callCount++
        if (callCount < 2) {
          throw new Error('Network error')
        }
        return mockResponse as Response
      }

      const client = new FetchHttpClient({ retries: 2 })

      const result = await client.post('https://example.com/api', { key: 'value' })

      expect(result).toEqual({ success: true })
      expect(callCount).toBe(2)
    })

    it('應該在重試次數用盡後拋出錯誤', async () => {
      global.fetch = async () => {
        throw new Error('Network error')
      }

      const client = new FetchHttpClient({ retries: 2 })

      await expect(
        client.post('https://example.com/api', { key: 'value' }),
      ).rejects.toThrow(NewebPayError)
    })
  })
})

