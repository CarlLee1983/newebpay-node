import { createHash } from 'node:crypto';
import { NewebPayError } from '../errors/newebpay-error.js';

/**
 * CheckValue (TradeSha) 編碼器。
 *
 * 依據藍新金流技術文件 4.1.5 CheckValue 規範實作。
 * 用於驗證交易資料的完整性。
 */
export class CheckValueEncoder {
  /**
   * 建立編碼器。
   *
   * @param hashKey HashKey
   * @param hashIV HashIV
   */
  constructor(
    private readonly hashKey: string,
    private readonly hashIV: string
  ) {}

  /**
   * 從設定建立編碼器。
   *
   * @param hashKey HashKey
   * @param hashIV HashIV
   */
  static create(hashKey: string, hashIV: string): CheckValueEncoder {
    return new CheckValueEncoder(hashKey, hashIV);
  }

  /**
   * 產生 CheckValue (TradeSha)。
   *
   * 計算方式：SHA256(HashKey={HashKey}&{TradeInfo}&HashIV={HashIV})
   *
   * @param tradeInfo 加密後的 TradeInfo 字串
   * @returns 大寫的 SHA256 雜湊值
   */
  generate(tradeInfo: string): string {
    const raw = `HashKey=${this.hashKey}&${tradeInfo}&HashIV=${this.hashIV}`;
    return createHash('sha256').update(raw).digest('hex').toUpperCase();
  }

  /**
   * 驗證 CheckValue (TradeSha)。
   *
   * @param tradeInfo 加密後的 TradeInfo 字串
   * @param tradeSha 收到的 TradeSha 值
   */
  verify(tradeInfo: string, tradeSha: string): boolean {
    const calculated = this.generate(tradeInfo);
    return tradeSha.toUpperCase() === calculated;
  }

  /**
   * 驗證並拋出例外。
   *
   * @param tradeInfo 加密後的 TradeInfo 字串
   * @param tradeSha 收到的 TradeSha 值
   * @throws NewebPayError 當驗證失敗時
   */
  verifyOrFail(tradeInfo: string, tradeSha: string): void {
    if (!this.verify(tradeInfo, tradeSha)) {
      throw NewebPayError.checkValueFailed();
    }
  }
}

