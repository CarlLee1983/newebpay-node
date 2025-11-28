import { Aes256Encoder } from '../infrastructure/aes256-encoder.js';
import { CheckValueEncoder } from '../infrastructure/check-value-encoder.js';
import { NewebPayError } from '../errors/newebpay-error.js';
import type {
  NotifyHandlerInterface,
  NotifyRawData,
  CvscomResultData,
} from '../types/notification.js';

/**
 * 超商取貨付款通知處理器。
 *
 * 處理超商取貨付款的通知。
 */
export class CvscomNotify implements NotifyHandlerInterface {
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
  static create(hashKey: string, hashIV: string): CvscomNotify {
    return new CvscomNotify(hashKey, hashIV);
  }

  /**
   * 驗證通知資料。
   */
  verify(data: NotifyRawData): boolean {
    this.rawData = data;

    if (!data.TradeInfo || !data.TradeSha) {
      return false;
    }

    if (
      !this.checkValueEncoder.verify(
        String(data.TradeInfo),
        String(data.TradeSha)
      )
    ) {
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
  private parseDecryptedData(
    decrypted: Record<string, string>
  ): Record<string, unknown> {
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
    return String(this.data['Status'] ?? '');
  }

  /**
   * 取得訊息。
   */
  getMessage(): string {
    return String(this.data['Message'] ?? '');
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
   * 取得超商類型。
   */
  getStoreType(): string {
    const result = this.getResult();
    return String(result.StoreType ?? '');
  }

  /**
   * 取得門市代碼。
   */
  getStoreCode(): string {
    const result = this.getResult();
    return String(result.StoreCode ?? '');
  }

  /**
   * 取得門市名稱。
   */
  getStoreName(): string {
    const result = this.getResult();
    return String(result.StoreName ?? '');
  }

  /**
   * 取得門市地址。
   */
  getStoreAddr(): string {
    const result = this.getResult();
    return String(result.StoreAddr ?? '');
  }

  /**
   * 取得取貨人姓名。
   */
  getCVSCOMName(): string {
    const result = this.getResult();
    return String(result.CVSCOMName ?? '');
  }

  /**
   * 取得取貨人電話。
   */
  getCVSCOMPhone(): string {
    const result = this.getResult();
    return String(result.CVSCOMPhone ?? '');
  }

  /**
   * 取得物流編號。
   */
  getLgsNo(): string {
    const result = this.getResult();
    return String(result.LgsNo ?? '');
  }

  /**
   * 取得物流類型。
   */
  getLgsType(): string {
    const result = this.getResult();
    return String(result.LgsType ?? '');
  }

  /**
   * 取得交易結果物件。
   */
  getResult(): CvscomResultData {
    return (this.data['Result'] as CvscomResultData) ?? {};
  }

  /**
   * 是否已驗證。
   */
  isVerified(): boolean {
    return this.verified;
  }
}

