import { createHash } from 'node:crypto';
import { NewebPayError } from '../errors/newebpay-error.js';
import { FetchHttpClient } from '../infrastructure/http/fetch-http-client.js';
import type { HttpClientInterface } from '../infrastructure/http/http-client.interface.js';
import { getTimestamp } from '../utils/timestamp.js';

/**
 * 查詢結果。
 */
export interface QueryOrderResult {
  MerchantID?: string;
  MerchantOrderNo?: string;
  TradeNo?: string;
  Amt?: number;
  TradeStatus?: string;
  PaymentType?: string;
  CreateTime?: string;
  PayTime?: string;
  CheckCode?: string;
  FundTime?: string;
  ShopMerchantID?: string;
  [key: string]: unknown;
}

/**
 * 交易查詢。
 *
 * 查詢藍新金流交易訂單狀態。
 */
export class QueryOrder {
  /**
   * API 版本。
   */
  protected version = '1.3';

  /**
   * API 請求路徑。
   */
  protected requestPath = '/API/QueryTradeInfo';

  /**
   * 是否為測試環境。
   */
  protected isTest = false;

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
  ): QueryOrder {
    return new QueryOrder(merchantId, hashKey, hashIV, httpClient);
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
  async query(merchantOrderNo: string, amt: number): Promise<QueryOrderResult> {
    const payload = this.buildPayload(merchantOrderNo, amt);

    // Use HttpClient
    const result = await this.httpClient.post<{
      Status?: string;
      Message?: string;
      Result?: QueryOrderResult;
    }>(this.getApiUrl(), payload);

    return this.parseResponse(result);
  }

  /**
   * 建立請求 Payload。
   */
  protected buildPayload(merchantOrderNo: string, amt: number): Record<string, string> {
    const checkValue = this.generateCheckValue(merchantOrderNo, amt);

    return {
      MerchantID: this.merchantId,
      Version: this.version,
      RespondType: 'JSON',
      CheckValue: checkValue,
      TimeStamp: getTimestamp(),
      MerchantOrderNo: merchantOrderNo,
      Amt: String(amt),
    };
  }

  /**
   * 產生查詢用 CheckValue。
   *
   * 查詢 API 的 CheckValue 計算方式與 MPG 不同：
   * SHA256(HashIV={HashIV}&Amt={Amt}&MerchantID={MerchantID}&MerchantOrderNo={MerchantOrderNo}&HashKey={HashKey})
   */
  protected generateCheckValue(merchantOrderNo: string, amt: number): string {
    const raw = `HashIV=${this.hashIV}&Amt=${amt}&MerchantID=${this.merchantId}&MerchantOrderNo=${merchantOrderNo}&HashKey=${this.hashKey}`;
    return createHash('sha256').update(raw).digest('hex').toUpperCase();
  }

  /**
   * 解析回應。
   */
  protected parseResponse(response: {
    Status?: string;
    Message?: string;
    Result?: QueryOrderResult;
  }): QueryOrderResult {
    const status = response.Status ?? '';
    const message = response.Message ?? '';

    if (status !== 'SUCCESS') {
      throw NewebPayError.apiError(message, status);
    }

    return response.Result ?? {};
  }
}
