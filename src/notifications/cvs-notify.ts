import { NewebPayError } from '../errors/newebpay-error.js';
import { Aes256Encoder } from '../infrastructure/aes256-encoder.js';
import { CheckValueEncoder } from '../infrastructure/check-value-encoder.js';
import type {
  CvsResultData,
  NotifyHandlerInterface,
  NotifyRawData,
} from '../types/notification.js';

/**
 * 超商取號通知處理器。
 *
 * 處理超商代碼/條碼繳費取號完成的通知。
 */
export class CvsNotify implements NotifyHandlerInterface {
  private readonly aesEncoder: Aes256Encoder;
  private readonly checkValueEncoder: CheckValueEncoder;

  /**
   * 原始通知資料。
   */
  private rawData: NotifyRawData = {};

  /**
   * 解密後的交易資料。
   */
  private data: Record<string, unknown> = {};

  /**
   * 是否已驗證。
   */
  private verified = false;

  /**
   * 建立通知處理器。
   */
  constructor(hashKey: string, hashIV: string) {
    this.aesEncoder = new Aes256Encoder(hashKey, hashIV);
    this.checkValueEncoder = new CheckValueEncoder(hashKey, hashIV);
  }

  /**
   * 從設定建立通知處理器。
   */
  static create(hashKey: string, hashIV: string): CvsNotify {
    return new CvsNotify(hashKey, hashIV);
  }

  /**
   * 驗證通知資料。
   */
  verify(data: NotifyRawData): boolean {
    this.rawData = data;

    if (!data.TradeInfo || !data.TradeSha) {
      return false;
    }

    if (!this.checkValueEncoder.verify(String(data.TradeInfo), String(data.TradeSha))) {
      return false;
    }

    try {
      const decrypted = this.aesEncoder.decrypt(String(data.TradeInfo));
      this.data = this.parseDecryptedData(decrypted);
      this.verified = true;
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 驗證並拋出例外。
   */
  verifyOrFail(data: NotifyRawData): this {
    if (!this.verify(data)) {
      throw NewebPayError.checkValueFailed();
    }
    return this;
  }

  /**
   * 解析解密後的資料。
   */
  private parseDecryptedData(decrypted: Record<string, string>): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(decrypted)) {
      if (key === 'Result' && typeof value === 'string') {
        try {
          result[key] = JSON.parse(value);
        } catch {
          result[key] = value;
        }
      } else {
        result[key] = value;
      }
    }

    return result;
  }

  /**
   * 取得解密後的資料。
   */
  getData(): Record<string, unknown> {
    return this.data;
  }

  /**
   * 取得原始通知資料。
   */
  getRawData(): NotifyRawData {
    return this.rawData;
  }

  /**
   * 是否成功。
   */
  isSuccess(): boolean {
    return this.getStatus() === 'SUCCESS';
  }

  /**
   * 取得狀態。
   */
  getStatus(): string {
    return String(this.data.Status ?? '');
  }

  /**
   * 取得訊息。
   */
  getMessage(): string {
    return String(this.data.Message ?? '');
  }

  /**
   * 取得特店訂單編號。
   */
  getMerchantOrderNo(): string {
    const result = this.getResult();
    return String(result.MerchantOrderNo ?? '');
  }

  /**
   * 取得藍新金流交易序號。
   */
  getTradeNo(): string {
    const result = this.getResult();
    return String(result.TradeNo ?? '');
  }

  /**
   * 取得交易金額。
   */
  getAmt(): number {
    const result = this.getResult();
    return Number(result.Amt ?? 0);
  }

  /**
   * 取得支付方式。
   */
  getPaymentType(): string {
    const result = this.getResult();
    return String(result.PaymentType ?? '');
  }

  /**
   * 取得繳費代碼。
   */
  getCodeNo(): string {
    const result = this.getResult();
    return String(result.CodeNo ?? '');
  }

  /**
   * 取得超商類型。
   */
  getStoreType(): string {
    const result = this.getResult();
    return String(result.StoreType ?? '');
  }

  /**
   * 取得繳費截止日。
   */
  getExpireDate(): string {
    const result = this.getResult();
    return String(result.ExpireDate ?? '');
  }

  /**
   * 取得繳費截止時間。
   */
  getExpireTime(): string {
    const result = this.getResult();
    return String(result.ExpireTime ?? '');
  }

  /**
   * 取得條碼第一段。
   */
  getBarcode1(): string {
    const result = this.getResult();
    return String(result.Barcode_1 ?? '');
  }

  /**
   * 取得條碼第二段。
   */
  getBarcode2(): string {
    const result = this.getResult();
    return String(result.Barcode_2 ?? '');
  }

  /**
   * 取得條碼第三段。
   */
  getBarcode3(): string {
    const result = this.getResult();
    return String(result.Barcode_3 ?? '');
  }

  /**
   * 取得交易結果物件。
   */
  getResult(): CvsResultData {
    return (this.data.Result as CvsResultData) ?? {};
  }

  /**
   * 是否已驗證。
   */
  isVerified(): boolean {
    return this.verified;
  }
}
