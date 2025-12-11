import { Aes256Encoder } from './infrastructure/aes256-encoder.js'
import { CheckValueEncoder } from './infrastructure/check-value-encoder.js'
import { NewebPayError } from './errors/newebpay-error.js'
import { getTimestamp } from './utils/timestamp.js'
import type { PaymentInterface, PaymentContent } from './types/payment.js'

/**
 * 藍新金流 Content 基礎類別。
 *
 * 所有 MPG 支付操作類別的基類。
 */
export abstract class Content implements PaymentInterface {
  /**
   * 特店訂單編號最大長度。
   */
  static readonly MERCHANT_ORDER_NO_MAX_LENGTH = 30

  /**
   * 商品資訊最大長度。
   */
  static readonly ITEM_DESC_MAX_LENGTH = 50

  /**
   * Email 最大長度。
   */
  static readonly EMAIL_MAX_LENGTH = 50

  /**
   * MPG API 版本。
   */
  protected version = '2.0'

  /**
   * API 請求路徑。
   */
  protected requestPath = '/MPG/mpg_gateway'

  /**
   * 是否為測試環境。
   */
  protected isTest = false

  /**
   * 內容資料。
   */
  protected content: Record<string, unknown> = {}

  /**
   * AES256 編碼器。
   */
  private aesEncoder?: Aes256Encoder

  /**
   * CheckValue 編碼器。
   */
  private checkValueEncoder?: CheckValueEncoder

  /**
   * 建立 Content 實例。
   *
   * @param merchantId 特店編號
   * @param hashKey HashKey
   * @param hashIV HashIV
   */
  constructor(
    protected merchantId: string = '',
    protected hashKey: string = '',
    protected hashIV: string = '',
  ) {
    this.validateCredentials()
    this.initContent()
  }

  /**
   * 驗證憑證參數。
   */
  private validateCredentials(): void {
    if (!this.hashKey || this.hashKey.trim() === '') {
      throw NewebPayError.required('HashKey')
    }

    if (!this.hashIV || this.hashIV.trim() === '') {
      throw NewebPayError.required('HashIV')
    }
  }

  /**
   * 初始化內容。
   */
  protected initContent(): void {
    this.content = {
      MerchantID: this.merchantId,
      MerchantOrderNo: '',
      TimeStamp: getTimestamp(),
      Version: this.version,
      Amt: 0,
      ItemDesc: '',
      RespondType: 'JSON',
      LangType: 'zh-tw',
    }
  }

  /**
   * 設定特店編號。
   */
  setMerchantID(id: string): this {
    this.merchantId = id
    this.content['MerchantID'] = id
    return this
  }

  /**
   * 取得特店編號。
   */
  getMerchantID(): string {
    return this.merchantId
  }

  /**
   * 設定 HashKey。
   */
  setHashKey(key: string): this {
    this.hashKey = key
    return this
  }

  /**
   * 設定 HashIV。
   */
  setHashIV(iv: string): this {
    this.hashIV = iv
    return this
  }

  /**
   * 設定是否為測試環境。
   */
  setTestMode(isTest: boolean): this {
    this.isTest = isTest
    return this
  }

  /**
   * 是否為測試環境。
   */
  isTestMode(): boolean {
    return this.isTest
  }

  /**
   * 設定特店訂單編號。
   */
  setMerchantOrderNo(orderNo: string): this {
    if (orderNo.length > Content.MERCHANT_ORDER_NO_MAX_LENGTH) {
      throw NewebPayError.tooLong('MerchantOrderNo', Content.MERCHANT_ORDER_NO_MAX_LENGTH)
    }
    this.content['MerchantOrderNo'] = orderNo
    return this
  }

  /**
   * 設定時間戳記。
   */
  setTimeStamp(timestamp: number | string): this {
    this.content['TimeStamp'] = String(timestamp)
    return this
  }

  /**
   * 設定訂單金額。
   */
  setAmt(amount: number): this {
    if (amount <= 0) {
      throw NewebPayError.invalid('Amt', '金額必須大於 0')
    }
    this.content['Amt'] = amount
    return this
  }

  /**
   * 設定商品資訊。
   */
  setItemDesc(desc: string): this {
    if (desc.length > Content.ITEM_DESC_MAX_LENGTH) {
      throw NewebPayError.tooLong('ItemDesc', Content.ITEM_DESC_MAX_LENGTH)
    }
    this.content['ItemDesc'] = desc
    return this
  }

  /**
   * 設定交易限制秒數。
   */
  setTradeLimit(seconds: number): this {
    if (seconds < 60 || seconds > 900) {
      throw NewebPayError.invalid('TradeLimit', '限制秒數必須在 60-900 之間')
    }
    this.content['TradeLimit'] = seconds
    return this
  }

  /**
   * 設定繳費有效期限。
   */
  setExpireDate(expireDate: string): this {
    this.content['ExpireDate'] = expireDate
    return this
  }

  /**
   * 設定支付完成返回網址。
   */
  setReturnURL(url: string): this {
    this.content['ReturnURL'] = url
    return this
  }

  /**
   * 設定支付通知網址。
   */
  setNotifyURL(url: string): this {
    this.content['NotifyURL'] = url
    return this
  }

  /**
   * 設定取號完成返回網址。
   */
  setCustomerURL(url: string): this {
    this.content['CustomerURL'] = url
    return this
  }

  /**
   * 設定返回商店網址。
   */
  setClientBackURL(url: string): this {
    this.content['ClientBackURL'] = url
    return this
  }

  /**
   * 設定付款人電子信箱。
   */
  setEmail(email: string): this {
    if (email.length > Content.EMAIL_MAX_LENGTH) {
      throw NewebPayError.tooLong('Email', Content.EMAIL_MAX_LENGTH)
    }
    this.content['Email'] = email
    return this
  }

  /**
   * 設定是否開啟付款人資料修改。
   */
  setEmailModify(modify: number): this {
    this.content['EmailModify'] = modify
    return this
  }

  /**
   * 設定商店備註。
   */
  setOrderComment(orderComment: string): this {
    this.content['OrderComment'] = orderComment
    return this
  }

  /**
   * 設定語系。
   */
  setLangType(lang: string): this {
    this.content['LangType'] = lang
    return this
  }

  /**
   * 取得請求路徑。
   */
  getRequestPath(): string {
    return this.requestPath
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
    return this.getBaseUrl() + this.getRequestPath()
  }

  /**
   * 取得 AES256 編碼器。
   */
  getAesEncoder(): Aes256Encoder {
    if (!this.aesEncoder) {
      this.aesEncoder = new Aes256Encoder(this.hashKey, this.hashIV)
    }
    return this.aesEncoder
  }

  /**
   * 取得 CheckValue 編碼器。
   */
  getCheckValueEncoder(): CheckValueEncoder {
    if (!this.checkValueEncoder) {
      this.checkValueEncoder = new CheckValueEncoder(this.hashKey, this.hashIV)
    }
    return this.checkValueEncoder
  }

  /**
   * 驗證內容資料。
   */
  protected abstract validation(): void

  /**
   * 驗證基礎參數。
   */
  protected validateBaseParams(): void {
    if (!this.merchantId) {
      throw NewebPayError.required('MerchantID')
    }

    if (!this.content['MerchantOrderNo']) {
      throw NewebPayError.required('MerchantOrderNo')
    }

    const amt = this.content['Amt']
    if (!amt || (typeof amt === 'number' && amt <= 0)) {
      throw NewebPayError.required('Amt')
    }

    if (!this.content['ItemDesc']) {
      throw NewebPayError.required('ItemDesc')
    }
  }

  /**
   * 取得 Payload。
   */
  getPayload(): Record<string, unknown> {
    this.validation()

    // 同步 MerchantID
    this.content['MerchantID'] = this.merchantId

    // 過濾空值
    const payload: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(this.content)) {
      if (value !== '' && value !== null && value !== undefined) {
        payload[key] = value
      }
    }

    return payload
  }

  /**
   * 取得已加密的內容。
   */
  getContent(): PaymentContent {
    const payload = this.getPayload()
    const encoder = this.getAesEncoder()
    const checkValueEncoder = this.getCheckValueEncoder()

    // 1. 加密 TradeInfo
    const tradeInfo = encoder.encrypt(payload)

    // 2. 產生 TradeSha
    const tradeSha = checkValueEncoder.generate(tradeInfo)

    return {
      MerchantID: this.merchantId,
      TradeInfo: tradeInfo,
      TradeSha: tradeSha,
      Version: this.version,
    }
  }

  /**
   * 取得原始內容物件。
   */
  getRawContent(): Record<string, unknown> {
    return { ...this.content }
  }

  /**
   * 設定自訂內容。
   */
  set(key: string, value: unknown): this {
    this.content[key] = value
    return this
  }

  /**
   * 取得內容值。
   */
  get<T = unknown>(key: string, defaultValue?: T): T | undefined {
    if (key in this.content) {
      return this.content[key] as T
    }
    return defaultValue
  }
}
