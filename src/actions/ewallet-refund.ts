import { Aes256Encoder } from "../infrastructure/aes256-encoder.js";
import { NewebPayError } from "../errors/newebpay-error.js";

/**
 * 電子錢包退款結果。
 */
export interface EWalletRefundResult {
  MerchantID?: string;
  MerchantOrderNo?: string;
  TradeNo?: string;
  Amt?: number;
  RefundAmt?: number;
  [key: string]: unknown;
}

/**
 * 支援的電子錢包類型。
 */
export type EWalletType = "LINEPAY" | "ESUNWALLET" | "TAIWANPAY";

/**
 * 電子錢包退款。
 *
 * 對 LINE Pay、玉山 Wallet、台灣 Pay 等電子錢包交易進行退款。
 */
export class EWalletRefund {
  /**
   * API 版本。
   */
  protected version = "1.0";

  /**
   * API 請求路徑。
   */
  protected requestPath = "/API/EWallet/Refund";

  /**
   * 是否為測試環境。
   */
  protected isTest = false;

  /**
   * AES256 編碼器。
   */
  private aesEncoder?: Aes256Encoder;

  /**
   * 建立退款物件。
   */
  constructor(
    protected merchantId: string,
    protected hashKey: string,
    protected hashIV: string,
  ) {}

  /**
   * 從設定建立退款物件。
   */
  static create(
    merchantId: string,
    hashKey: string,
    hashIV: string,
  ): EWalletRefund {
    return new EWalletRefund(merchantId, hashKey, hashIV);
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
      ? "https://ccore.newebpay.com"
      : "https://core.newebpay.com";
  }

  /**
   * 取得完整 API 網址。
   */
  getApiUrl(): string {
    return this.getBaseUrl() + this.requestPath;
  }

  /**
   * 執行退款。
   *
   * @param merchantOrderNo 特店訂單編號
   * @param amt 退款金額
   * @param paymentType 電子錢包類型
   */
  async refund(
    merchantOrderNo: string,
    amt: number,
    paymentType: EWalletType,
  ): Promise<EWalletRefundResult> {
    const postData: Record<string, unknown> = {
      RespondType: "JSON",
      Version: this.version,
      TimeStamp: String(Math.floor(Date.now() / 1000)),
      MerchantOrderNo: merchantOrderNo,
      Amt: amt,
      PaymentType: paymentType,
    };

    const payload = this.buildPayload(postData);

    const response = await fetch(this.getApiUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(payload).toString(),
    });

    if (!response.ok) {
      throw NewebPayError.apiError(`HTTP 錯誤：${response.status}`);
    }

    const result = (await response.json()) as {
      Status?: string;
      Message?: string;
      Result?: EWalletRefundResult;
    };

    return this.parseResponse(result);
  }

  /**
   * 建立請求 Payload。
   */
  protected buildPayload(
    postData: Record<string, unknown>,
  ): Record<string, string> {
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
    Result?: EWalletRefundResult;
  }): EWalletRefundResult {
    const status = response.Status ?? "";
    const message = response.Message ?? "";

    if (status !== "SUCCESS") {
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
