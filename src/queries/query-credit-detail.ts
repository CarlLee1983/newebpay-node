import { NewebPayError } from '../errors/newebpay-error.js';
import { Aes256Encoder } from '../infrastructure/aes256-encoder.js';
import { FetchHttpClient } from '../infrastructure/http/fetch-http-client.js';
import type { HttpClientInterface } from '../infrastructure/http/http-client.interface.js';
import { getTimestamp } from '../utils/timestamp.js';

/**
 * 信用卡交易明細查詢結果。
 */
export interface QueryCreditDetailResult {
  MerchantID?: string;
  MerchantOrderNo?: string;
  TradeNo?: string;
  Amt?: number;
  CloseAmt?: number;
  CloseStatus?: string;
  BackBalance?: number;
  BackStatus?: string;
  RespondCode?: string;
  Auth?: string;
  ECI?: string;
  CloseAmt0?: number;
  CloseStatus0?: string;
  [key: string]: unknown;
}

/**
 * 信用卡交易明細查詢。
 *
 * 查詢信用卡請退款狀態。
 */
export class QueryCreditDetail {
  /**
   * API 版本。
   */
  protected version = '1.1';

  /**
   * API 請求路徑。
   */
  protected requestPath = '/API/CreditCard/QueryTradeInfo';

  /**
   * 是否為測試環境。
   */
  protected isTest = false;

  /**
   * AES256 編碼器。
   */
  private aesEncoder?: Aes256Encoder;

  /**
   * HTTP 客戶端。
   */
  protected httpClient: HttpClientInterface;

  /**
   * 建立查詢物件。
   */
  constructor(
    protected merchantId: string,
    protected hashKey: string,
    protected hashIV: string,
    httpClient?: HttpClientInterface
  ) {
    this.httpClient = httpClient ?? new FetchHttpClient();
  }

  /**
   * 從設定建立查詢物件。
   */
  static create(
    merchantId: string,
    hashKey: string,
    hashIV: string,
    httpClient?: HttpClientInterface
  ): QueryCreditDetail {
    return new QueryCreditDetail(merchantId, hashKey, hashIV, httpClient);
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
    return this.isTest ? 'https://ccore.newebpay.com' : 'https://core.newebpay.com';
  }

  /**
   * 取得完整 API 網址。
   */
  getApiUrl(): string {
    return this.getBaseUrl() + this.requestPath;
  }

  /**
   * 執行查詢。
   */
  async query(merchantOrderNo: string, amt: number): Promise<QueryCreditDetailResult> {
    const payload = this.buildPayload(merchantOrderNo, amt);

    const result = await this.httpClient.post<{
      Status?: string;
      Message?: string;
      Result?: QueryCreditDetailResult;
    }>(this.getApiUrl(), payload);

    return this.parseResponse(result);
  }

  /**
   * 建立請求 Payload。
   */
  protected buildPayload(merchantOrderNo: string, amt: number): Record<string, string> {
    const postData = {
      MerchantID: this.merchantId,
      Version: this.version,
      RespondType: 'JSON',
      TimeStamp: getTimestamp(),
      MerchantOrderNo: merchantOrderNo,
      Amt: amt,
    };

    const encoder = this.getAesEncoder();
    const postDataStr = encoder.encrypt(postData);

    return {
      MerchantID_: this.merchantId,
      PostData_: postDataStr,
    };
  }

  /**
   * 解析回應。
   */
  protected parseResponse(response: {
    Status?: string;
    Message?: string;
    Result?: QueryCreditDetailResult;
  }): QueryCreditDetailResult {
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
