import type { HttpClientInterface, HttpClientOptions } from './http-client.interface.js'

export class FetchHttpClient implements HttpClientInterface {
  constructor(private readonly options: HttpClientOptions = {}) {}

  async post(url: string, data: Record<string, unknown>): Promise<any> {
    const { timeout = 5000, retries = 0 } = this.options

    let lastError: any

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController()
        const id = setTimeout(() => controller.abort(), timeout)

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(data as Record<string, string>),
          signal: controller.signal,
        })

        clearTimeout(id)

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
        }

        return await response.json()
      } catch (error) {
        lastError = error
        if (attempt < retries) {
          // Exponential backoff
          const delay = Math.pow(2, attempt) * 1000
          await new Promise((resolve) => setTimeout(resolve, delay))
        }
      }
    }

    throw lastError
  }
}
