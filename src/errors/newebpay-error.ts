/**
 * 藍新金流 SDK 自訂例外。
 */
export class NewebPayError extends Error {
  /**
   * 錯誤代碼。
   */
  public readonly code: string | undefined;

  constructor(message: string, code?: string) {
    super(message);
    this.name = 'NewebPayError';
    this.code = code;
    Object.setPrototypeOf(this, NewebPayError.prototype);
  }

  /**
   * 必要欄位未填寫。
   */
  static required(field: string): NewebPayError {
    return new NewebPayError(`${field} 為必填欄位`, 'REQUIRED_FIELD');
  }

  /**
   * 欄位值過長。
   */
  static tooLong(field: string, maxLength: number): NewebPayError {
    return new NewebPayError(
      `${field} 超過最大長度 ${maxLength}`,
      'FIELD_TOO_LONG'
    );
  }

  /**
   * 欄位值無效。
   */
  static invalid(field: string, reason: string): NewebPayError {
    return new NewebPayError(`${field} 無效：${reason}`, 'INVALID_FIELD');
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
}

