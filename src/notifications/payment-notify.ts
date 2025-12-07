import { Aes256Encoder } from '../infrastructure/aes256-encoder.js'
import { CheckValueEncoder } from '../infrastructure/check-value-encoder.js'
import { NewebPayError } from '../errors/newebpay-error.js'
import type {
  NotifyHandlerInterface,
  NotifyRawData,
  PaymentResultData,
} from '../types/notification.js'

/**
 * 支付完成通知處理器。
 *
 * 處理藍新金流 ReturnURL / NotifyURL 回傳的支付結果通知。
 */
export class PaymentNotify implements NotifyHandlerInterface {
  private readonly aesEncoder: Aes256Encoder
  private readonly checkValueEncoder: CheckValueEncoder

  /**
   * 原始通知資料。
   */
  private rawData: NotifyRawData = {}

  /**
   * 解密後的交易資料。
   */
  private data: Record<string, unknown> = {}

  /**
   * 是否已驗證。
   */
  private verified = false

  /**
   * 建立通知處理器。
   *
   * @param hashKey HashKey
   * @param hashIV HashIV
   */
  constructor(hashKey: string, hashIV: string) {
    this.aesEncoder = new Aes256Encoder(hashKey, hashIV)
    this.checkValueEncoder = new CheckValueEncoder(hashKey, hashIV)
  }

  /**
   * 從設定建立通知處理器。
   */
  static create(hashKey: string, hashIV: string): PaymentNotify {
    return new PaymentNotify(hashKey, hashIV)
  }

  /**
   * 驗證通知資料。
   */
  verify(data: NotifyRawData): boolean {
    this.rawData = data

    // 檢查必要欄位
    if (!data.TradeInfo || !data.TradeSha) {
      return false
    }

    // 驗證 TradeSha
    if (!this.checkValueEncoder.verify(String(data.TradeInfo), String(data.TradeSha))) {
      return false
    }

    // 解密 TradeInfo
    try {
      const decrypted = this.aesEncoder.decrypt(String(data.TradeInfo))

      // 解析 JSON 格式的 Result
      this.data = this.parseDecryptedData(decrypted)
      this.verified = true

      return true
    } catch {
      return false
    }
  }

  /**
   * 驗證並拋出例外。
   */
  verifyOrFail(data: NotifyRawData): this {
    if (!this.verify(data)) {
      throw NewebPayError.checkValueFailed()
    }
    return this
  }

  /**
   * 解析解密後的資料。
   */
  private parseDecryptedData(decrypted: Record<string, string>): Record<string, unknown> {
    const result: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(decrypted)) {
      // 嘗試解析 JSON
      if (key === 'Result' && typeof value === 'string') {
        try {
          result[key] = JSON.parse(value)
        } catch {
          result[key] = value
        }
      } else {
        result[key] = value
      }
    }

    return result
  }

  /**
   * 取得解密後的資料。
   */
  getData(): Record<string, unknown> {
    return this.data
  }

  /**
   * 取得原始通知資料。
   */
  getRawData(): NotifyRawData {
    return this.rawData
  }

  /**
   * 是否成功。
   */
  isSuccess(): boolean {
    return this.getStatus() === 'SUCCESS'
  }

  /**
   * 取得狀態。
   */
  getStatus(): string {
    return String(this.data['Status'] ?? '')
  }

  /**
   * 取得訊息。
   */
  getMessage(): string {
    return String(this.data['Message'] ?? '')
  }

  /**
   * 取得特店編號。
   */
  getMerchantID(): string {
    return String(this.data['MerchantID'] ?? '')
  }

  /**
   * 取得特店訂單編號。
   */
  getMerchantOrderNo(): string {
    const result = this.getResult()
    return String(result.MerchantOrderNo ?? '')
  }

  /**
   * 取得藍新金流交易序號。
   */
  getTradeNo(): string {
    const result = this.getResult()
    return String(result.TradeNo ?? '')
  }

  /**
   * 取得交易金額。
   */
  getAmt(): number {
    const result = this.getResult()
    return Number(result.Amt ?? 0)
  }

  /**
   * 取得支付方式。
   */
  getPaymentType(): string {
    const result = this.getResult()
    return String(result.PaymentType ?? '')
  }

  /**
   * 取得交易時間。
   */
  getPayTime(): string {
    const result = this.getResult()
    return String(result.PayTime ?? '')
  }

  /**
   * 取得 IP 位址。
   */
  getIP(): string {
    const result = this.getResult()
    return String(result.IP ?? '')
  }

  /**
   * 取得付款銀行。
   */
  getPayBankCode(): string {
    const result = this.getResult()
    return String(result.PayBankCode ?? '')
  }

  /**
   * 取得授權碼（信用卡）。
   */
  getAuthCode(): string {
    const result = this.getResult()
    return String(result.Auth ?? '')
  }

  /**
   * 取得卡號末四碼（信用卡）。
   */
  getCard4No(): string {
    const result = this.getResult()
    return String(result.Card4No ?? '')
  }

  /**
   * 取得卡號前六碼（信用卡）。
   */
  getCard6No(): string {
    const result = this.getResult()
    return String(result.Card6No ?? '')
  }

  /**
   * 取得 ECI 值（3D 驗證）。
   */
  getECI(): string {
    const result = this.getResult()
    return String(result.ECI ?? '')
  }

  /**
   * 取得分期期數。
   */
  getInst(): number {
    const result = this.getResult()
    return Number(result.Inst ?? 0)
  }

  /**
   * 取得首期金額。
   */
  getInstFirst(): number {
    const result = this.getResult()
    return Number(result.InstFirst ?? 0)
  }

  /**
   * 取得每期金額。
   */
  getInstEach(): number {
    const result = this.getResult()
    return Number(result.InstEach ?? 0)
  }

  /**
   * 取得交易結果物件。
   */
  getResult(): PaymentResultData {
    return (this.data['Result'] as PaymentResultData) ?? {}
  }

  /**
   * 是否已驗證。
   */
  isVerified(): boolean {
    return this.verified
  }
}
