import { Aes256Encoder } from '../infrastructure/aes256-encoder.js';
import { NewebPayError } from '../errors/newebpay-error.js';
import { IndexType } from '../types/parameters.js';

/**
 * 取消授權結果。
 */
export interface CreditCancelResult {
  MerchantID?: string;
  MerchantOrderNo?: string;
  TradeNo?: string;
  Amt?: number;
  [key: string]: unknown;
}

/**
 * 信用卡取消授權。
 *
 * 取消尚未請款的信用卡授權交易。
 */
export class CreditCancel {
  /**
   * API 版本。
   */
  protected version = '1.0';

  /**
   * API 請求路徑。
   */
  protected requestPath = '/API/CreditCard/Cancel';

  /**
   * 是否為測試環境。
   */
  protected isTest = false;

  /**
   * AES256 編碼器。
   */
  private aesEncoder?: Aes256Encoder;

  /**
   * 建立取消授權物件。
   */
  constructor(
    protected merchantId: string,
    protected hashKey: string,
    protected hashIV: string
  ) {}

  /**
   * 從設定建立取消授權物件。
   */
  static create(
    merchantId: string,
    hashKey: string,
    hashIV: string
  ): CreditCancel {
    return new CreditCancel(merchantId, hashKey, hashIV);
  }

  /**
   * 設定是否為測試環境。
   */
  setTestMode(isTest: boolean): this {
    this.isTest = isTest;
    return this;
  }

  /**
   * 取得 API 基礎網址。
   */
  getBaseUrl(): string {
    return this.isTest
      ? 'https://ccore.newebpay.com'
      : 'https://core.newebpay.com';
  }

  /**
   * 取得完整 API 網址。
   */
  getApiUrl(): string {
    return this.getBaseUrl() + this.requestPath;
  }

  /**
   * 執行取消授權。
   */
  async cancel(
    merchantOrderNo: string,
    amt: number,
    indexType: IndexType | string = IndexType.MERCHANT_ORDER_NO,
    tradeNo?: string
  ): Promise<CreditCancelResult> {
    const postData: Record<string, unknown> = {
      RespondType: 'JSON',
      Version: this.version,
      Amt: amt,
      MerchantOrderNo: merchantOrderNo,
      IndexType: indexType,
      TimeStamp: String(Math.floor(Date.now() / 1000)),
    };

    if (indexType === IndexType.TRADE_NO && tradeNo) {
      postData['TradeNo'] = tradeNo;
    }

    const payload = this.buildPayload(postData);

    const response = await fetch(this.getApiUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(payload).toString(),
    });

    if (!response.ok) {
      throw NewebPayError.apiError(`HTTP 錯誤：${response.status}`);
    }

    const result = (await response.json()) as {
      Status?: string;
      Message?: string;
      Result?: CreditCancelResult;
    };

    return this.parseResponse(result);
  }

  /**
   * 建立請求 Payload。
   */
  protected buildPayload(postData: Record<string, unknown>): Record<string, string> {
    const encoder = this.getAesEncoder();
    const tradeInfo = encoder.encrypt(postData);

    return {
      MerchantID_: this.merchantId,
      PostData_: tradeInfo,
    };
  }

  /**
   * 解析回應。
   */
  protected parseResponse(response: {
    Status?: string;
    Message?: string;
    Result?: CreditCancelResult;
  }): CreditCancelResult {
    const status = response.Status ?? '';
    const message = response.Message ?? '';

    if (status !== 'SUCCESS') {
      throw NewebPayError.apiError(message, status);
    }

    return response.Result ?? {};
  }

  /**
   * 取得 AES256 編碼器。
   */
  private getAesEncoder(): Aes256Encoder {
    if (!this.aesEncoder) {
      this.aesEncoder = new Aes256Encoder(this.hashKey, this.hashIV);
    }
    return this.aesEncoder;
  }
}

