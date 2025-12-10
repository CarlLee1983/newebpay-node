import { Aes256Encoder } from '../infrastructure/aes256-encoder.js'
import { NewebPayError } from '../errors/newebpay-error.js'
import { getTimestamp } from '../utils/timestamp.js'
import { CloseType, IndexType } from '../types/parameters.js'
import type { HttpClientInterface } from '../infrastructure/http/http-client.interface.js'
import { FetchHttpClient } from '../infrastructure/http/fetch-http-client.js'

/**
 * 請退款結果。
 */
export interface CreditCloseResult {
  MerchantID?: string
  MerchantOrderNo?: string
  TradeNo?: string
  Amt?: number
  CloseType?: number
  [key: string]: unknown
}

/**
 * 信用卡請退款。
 *
 * 對已授權的信用卡交易進行請款或退款操作。
 */
export class CreditClose {
  /**
   * 請款類型：請款。
   */
  static readonly CLOSE_TYPE_PAY = CloseType.PAY

  /**
   * 請款類型：退款。
   */
  static readonly CLOSE_TYPE_REFUND = CloseType.REFUND

  /**
   * API 版本。
   */
  protected version = '1.1'

  /**
   * API 請求路徑。
   */
  protected requestPath = '/API/CreditCard/Close'

  /**
   * 是否為測試環境。
   */
  protected isTest = false

  /**
   * AES256 編碼器。
   */
  private aesEncoder?: Aes256Encoder

  /**
   * HTTP 客戶端。
   */
  protected httpClient: HttpClientInterface

  /**
   * 建立請退款物件。
   */
  constructor(
    protected merchantId: string,
    protected hashKey: string,
    protected hashIV: string,
    httpClient?: HttpClientInterface,
  ) {
    this.httpClient = httpClient ?? new FetchHttpClient()
  }

  /**
   * 從設定建立請退款物件。
   */
  static create(
    merchantId: string,
    hashKey: string,
    hashIV: string,
    httpClient?: HttpClientInterface,
  ): CreditClose {
    return new CreditClose(merchantId, hashKey, hashIV, httpClient)
  }

  /**
   * 設定是否為測試環境。
   */
  setTestMode(isTest: boolean): this {
    this.isTest = isTest
    return this
  }

  /**
   * 取得 API 基礎網址。
   */
  getBaseUrl(): string {
    return this.isTest ? 'https://ccore.newebpay.com' : 'https://core.newebpay.com'
  }

  /**
   * 取得完整 API 網址。
   */
  getApiUrl(): string {
    return this.getBaseUrl() + this.requestPath
  }

  /**
   * 執行請款。
   */
  async pay(
    merchantOrderNo: string,
    amt: number,
    indexType: IndexType | string = IndexType.MERCHANT_ORDER_NO,
    tradeNo?: string,
  ): Promise<CreditCloseResult> {
    return this.execute(merchantOrderNo, amt, CloseType.PAY, indexType, tradeNo)
  }

  /**
   * 執行退款。
   */
  async refund(
    merchantOrderNo: string,
    amt: number,
    indexType: IndexType | string = IndexType.MERCHANT_ORDER_NO,
    tradeNo?: string,
  ): Promise<CreditCloseResult> {
    return this.execute(merchantOrderNo, amt, CloseType.REFUND, indexType, tradeNo)
  }

  /**
   * 取消請退款。
   */
  async cancelClose(
    merchantOrderNo: string,
    amt: number,
    closeType: CloseType | number,
    indexType: IndexType | string = IndexType.MERCHANT_ORDER_NO,
    tradeNo?: string,
  ): Promise<CreditCloseResult> {
    return this.execute(merchantOrderNo, amt, closeType, indexType, tradeNo, true)
  }

  /**
   * 執行請退款操作。
   */
  protected async execute(
    merchantOrderNo: string,
    amt: number,
    closeType: CloseType | number,
    indexType: IndexType | string = IndexType.MERCHANT_ORDER_NO,
    tradeNo?: string,
    cancel = false,
  ): Promise<CreditCloseResult> {
    const postData: Record<string, unknown> = {
      RespondType: 'JSON',
      Version: this.version,
      Amt: amt,
      MerchantOrderNo: merchantOrderNo,
      IndexType: indexType,
      TimeStamp: getTimestamp(),
      CloseType: closeType,
    }

    if (indexType === IndexType.TRADE_NO && tradeNo) {
      postData['TradeNo'] = tradeNo
    }

    if (cancel) {
      postData['Cancel'] = 1
    }

    const payload = this.buildPayload(postData)

    const result = await this.httpClient.post<{
      Status?: string
      Message?: string
      Result?: CreditCloseResult
    }>(this.getApiUrl(), payload)

    return this.parseResponse(result)
  }

  /**
   * 建立請求 Payload。
   */
  protected buildPayload(postData: Record<string, unknown>): Record<string, string> {
    const encoder = this.getAesEncoder()
    const tradeInfo = encoder.encrypt(postData)

    return {
      MerchantID_: this.merchantId,
      PostData_: tradeInfo,
    }
  }

  /**
   * 解析回應。
   */
  protected parseResponse(response: {
    Status?: string
    Message?: string
    Result?: CreditCloseResult
  }): CreditCloseResult {
    const status = response.Status ?? ''
    const message = response.Message ?? ''

    if (status !== 'SUCCESS') {
      throw NewebPayError.apiError(message, status)
    }

    return response.Result ?? {}
  }

  /**
   * 取得 AES256 編碼器。
   */
  private getAesEncoder(): Aes256Encoder {
    if (!this.aesEncoder) {
      this.aesEncoder = new Aes256Encoder(this.hashKey, this.hashIV)
    }
    return this.aesEncoder
  }
}
