/**
 * 支付操作介面。
 */
export interface PaymentInterface {
  /**
   * 設定特店訂單編號。
   */
  setMerchantOrderNo(orderNo: string): this

  /**
   * 設定訂單金額。
   */
  setAmt(amount: number): this

  /**
   * 設定商品資訊。
   */
  setItemDesc(desc: string): this

  /**
   * 設定支付完成返回網址。
   */
  setReturnURL(url: string): this

  /**
   * 設定支付通知網址。
   */
  setNotifyURL(url: string): this

  /**
   * 取得請求路徑。
   */
  getRequestPath(): string

  /**
   * 取得 Payload。
   */
  getPayload(): Record<string, unknown>

  /**
   * 取得已加密的內容。
   */
  getContent(): PaymentContent
}

/**
 * 支付內容（加密後）。
 */
export interface PaymentContent {
  MerchantID: string
  TradeInfo: string
  TradeSha: string
  Version: string
}

/**
 * 基礎支付參數。
 */
export interface BasePaymentParams {
  MerchantID: string
  MerchantOrderNo: string
  TimeStamp: string
  Version: string
  Amt: number
  ItemDesc: string
  RespondType: string
  LangType: string
  ReturnURL?: string
  NotifyURL?: string
  CustomerURL?: string
  ClientBackURL?: string
  Email?: string
  EmailModify?: number
  TradeLimit?: number
  ExpireDate?: string
  OrderComment?: string
}

/**
 * 支付設定。
 */
export interface PaymentConfig {
  merchantId: string
  hashKey: string
  hashIV: string
  testMode?: boolean
  returnUrl?: string
  notifyUrl?: string
}
