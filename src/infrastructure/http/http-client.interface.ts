/**
 * HTTP 客戶端介面。
 */
export interface HttpClientInterface {
  /**
   * 發送 POST 請求。
   *
   * @param url 請求 URL
   * @param data 請求資料
   * @returns 回應資料
   */
  post<T = unknown>(url: string, data: Record<string, unknown>): Promise<T>;
}

/**
 * HTTP 客戶端選項。
 */
export interface HttpClientOptions {
  /**
   * 請求超時時間（毫秒）。
   * @default 30000
   */
  timeout?: number;

  /**
   * 重試次數。
   * @default 0
   */
  retries?: number;
}
