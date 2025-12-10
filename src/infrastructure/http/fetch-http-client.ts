import { NewebPayError } from '../../errors/newebpay-error.js'
import type { HttpClientInterface, HttpClientOptions } from './http-client.interface.js'

/**
 * 基於 Fetch API 的 HTTP 客戶端實作。
 */
export class FetchHttpClient implements HttpClientInterface {
  /**
   * 預設超時時間（30 秒）。
   */
  private static readonly DEFAULT_TIMEOUT = 30000

  /**
   * 預設重試次數。
   */
  private static readonly DEFAULT_RETRIES = 0

  /**
   * 客戶端選項。
   */
  private readonly timeout: number
  private readonly retries: number

  constructor(options: HttpClientOptions = {}) {
    this.timeout = options.timeout ?? FetchHttpClient.DEFAULT_TIMEOUT
    this.retries = options.retries ?? FetchHttpClient.DEFAULT_RETRIES
  }

  /**
   * 發送 POST 請求。
   */
  async post<T = unknown>(url: string, data: Record<string, unknown>): Promise<T> {
    let lastError: NewebPayError | undefined

    for (let attempt = 0; attempt <= this.retries; attempt++) {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), this.timeout)

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(data as Record<string, string>).toString(),
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw NewebPayError.httpError(response.status, response.statusText, url)
        }

        return (await response.json()) as T
      } catch (error) {
        clearTimeout(timeoutId)

        // 已經是 NewebPayError 直接使用
        if (error instanceof NewebPayError) {
          lastError = error
        }
        // AbortError 表示超時
        else if (error instanceof Error && error.name === 'AbortError') {
          lastError = NewebPayError.timeout(this.timeout, url)
        }
        // 其他網路錯誤
        else {
          lastError = NewebPayError.networkError(
            error instanceof Error ? error.message : 'Unknown error',
            url,
          )
        }

        // 如果還有重試機會，使用指數退避
        if (attempt < this.retries) {
          const delay = Math.pow(2, attempt) * 1000
          await new Promise((resolve) => setTimeout(resolve, delay))
        }
      }
    }

    throw lastError ?? NewebPayError.networkError('Request failed', url)
  }
}
