import { createCipheriv, createDecipheriv } from 'node:crypto';
import { NewebPayError } from '../errors/newebpay-error.js';

/**
 * AES-256-CBC 加解密器。
 *
 * 依據藍新金流技術文件 4.1.1 AES256 加密規範實作。
 */
export class Aes256Encoder {
  /**
   * 加密演算法。
   */
  private static readonly CIPHER_METHOD = 'aes-256-cbc' as const;

  /**
   * 建立加解密器。
   *
   * @param hashKey HashKey
   * @param hashIV HashIV
   */
  constructor(
    private readonly hashKey: string,
    private readonly hashIV: string
  ) {}

  /**
   * 從設定建立加解密器。
   *
   * @param hashKey HashKey
   * @param hashIV HashIV
   */
  static create(hashKey: string, hashIV: string): Aes256Encoder {
    return new Aes256Encoder(hashKey, hashIV);
  }

  /**
   * 加密資料。
   *
   * 將資料物件轉換為 URL 編碼查詢字串後進行 AES-256-CBC 加密。
   *
   * @param data 原始資料
   * @returns 加密後的十六進位字串
   */
  encrypt(data: Record<string, unknown>): string {
    // 1. 將參數組成 URL 編碼查詢字串
    const queryString = this.buildQueryString(data);

    // 2. 使用 AES-256-CBC 加密
    const cipher = createCipheriv(Aes256Encoder.CIPHER_METHOD, this.hashKey, this.hashIV);

    let encrypted = cipher.update(queryString, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
  }

  /**
   * 解密資料。
   *
   * 將十六進位加密字串解密為資料物件。
   *
   * @param tradeInfo 加密的 TradeInfo 字串
   * @returns 解密後的資料物件
   * @throws NewebPayError 當解密失敗時
   */
  decrypt(tradeInfo: string): Record<string, string> {
    // 檢查是否為有效的十六進位字串
    if (!/^[0-9a-fA-F]+$/.test(tradeInfo) || tradeInfo.length % 2 !== 0) {
      throw NewebPayError.decryptFailed();
    }

    try {
      const decipher = createDecipheriv(Aes256Encoder.CIPHER_METHOD, this.hashKey, this.hashIV);

      let decrypted = decipher.update(tradeInfo, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      // 解析 URL 編碼查詢字串
      return this.parseQueryString(decrypted);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown decryption error';
      throw new NewebPayError(`解密失敗: ${errorMessage}`, 'DECRYPT_FAILED');
    }
  }

  /**
   * 建立 URL 編碼查詢字串。
   */
  private buildQueryString(data: Record<string, unknown>): string {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    }

    return params.toString();
  }

  /**
   * 解析 URL 編碼查詢字串。
   */
  private parseQueryString(queryString: string): Record<string, string> {
    const params = new URLSearchParams(queryString);
    const result: Record<string, string> = {};

    for (const [key, value] of params.entries()) {
      result[key] = value;
    }

    return result;
  }
}
