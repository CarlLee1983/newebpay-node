/**
 * 藍新金流 SDK 自訂例外。
 */
export class NewebPayError extends Error {
  /**
   * 錯誤代碼。
   */
  public readonly code: string | undefined;

  /**
   * HTTP 狀態碼（僅適用於 HTTP 錯誤）。
   */
  public readonly httpStatus?: number;

  /**
   * 請求 URL（僅適用於網路相關錯誤）。
   */
  public readonly url?: string;

  /**
   * 欄位名稱（僅適用於驗證錯誤）。
   */
  public readonly field?: string;

  constructor(
    message: string,
    code?: string,
    options?: {
      httpStatus?: number | undefined;
      url?: string | undefined;
      field?: string | undefined;
    }
  ) {
    super(message);
    this.name = 'NewebPayError';
    this.code = code;
    if (options?.httpStatus !== undefined) {
      this.httpStatus = options.httpStatus;
    }
    if (options?.url !== undefined) {
      this.url = options.url;
    }
    if (options?.field !== undefined) {
      this.field = options.field;
    }
    Object.setPrototypeOf(this, NewebPayError.prototype);
  }

  /**
   * 必要欄位未填寫。
   */
  static required(field: string): NewebPayError {
    return new NewebPayError(`${field} 為必填欄位`, 'REQUIRED_FIELD', { field });
  }

  /**
   * 欄位值過長。
   */
  static tooLong(field: string, maxLength: number): NewebPayError {
    return new NewebPayError(`${field} 超過最大長度 ${maxLength}`, 'FIELD_TOO_LONG', { field });
  }

  /**
   * 欄位值無效。
   */
  static invalid(field: string, reason: string): NewebPayError {
    return new NewebPayError(`${field} 無效：${reason}`, 'INVALID_FIELD', { field });
  }

  /**
   * 解密失敗。
   */
  static decryptFailed(): NewebPayError {
    return new NewebPayError('解密失敗', 'DECRYPT_FAILED');
  }

  /**
   * CheckValue 驗證失敗。
   */
  static checkValueFailed(): NewebPayError {
    return new NewebPayError('CheckValue 驗證失敗', 'CHECK_VALUE_FAILED');
  }

  /**
   * API 請求錯誤。
   */
  static apiError(message: string, code?: string): NewebPayError {
    return new NewebPayError(message, code ?? 'API_ERROR');
  }

  /**
   * HTTP 錯誤。
   */
  static httpError(status: number, statusText: string, url?: string): NewebPayError {
    return new NewebPayError(
      `HTTP Error: ${status} ${statusText}`,
      'HTTP_ERROR',
      url !== undefined ? { httpStatus: status, url } : { httpStatus: status }
    );
  }

  /**
   * 請求超時。
   */
  static timeout(timeoutMs: number, url?: string): NewebPayError {
    return new NewebPayError(
      `Request timeout after ${timeoutMs}ms`,
      'REQUEST_TIMEOUT',
      url !== undefined ? { url } : undefined
    );
  }

  /**
   * 網路錯誤。
   */
  static networkError(message: string, url?: string): NewebPayError {
    return new NewebPayError(
      `Network error: ${message}`,
      'NETWORK_ERROR',
      url !== undefined ? { url } : undefined
    );
  }

  /**
   * 轉換為 JSON 物件。
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      httpStatus: this.httpStatus,
      url: this.url,
      field: this.field,
    };
  }
}
