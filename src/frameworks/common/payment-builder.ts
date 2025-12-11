import type { NewebPayConfig } from './config.js'
import type { PaymentInterface } from '../../types/payment.js'
import {
  CreditPayment,
  CreditInstallment,
  AtmPayment,
  WebAtmPayment,
  CvsPayment,
  BarcodePayment,
  LinePayPayment,
  TaiwanPayPayment,
  AllInOnePayment,
} from '../../index.js'

/**
 * 支付建構器（類似 PHP 的 PaymentBuilder）
 *
 * 提供簡化的鏈式 API
 */
export class PaymentBuilder {
  private orderNo = ''
  private amount = 0
  private itemDesc = ''
  private email = ''
  private returnUrl?: string
  private notifyUrl?: string
  private customerUrl?: string
  private clientBackUrl?: string
  private paymentClass: new (
    merchantId: string,
    hashKey: string,
    hashIV: string,
  ) => PaymentInterface = CreditPayment
  private installments?: number[]
  private expireDate?: string
  private customizer?: (payment: PaymentInterface) => void

  constructor(private readonly config: NewebPayConfig) {}

  /**
   * 設定基本交易資訊
   */
  setOrder(orderNo: string, amount: number, itemDesc: string, email = ''): this {
    this.orderNo = orderNo
    this.amount = amount
    this.itemDesc = itemDesc
    this.email = email
    return this
  }

  /**
   * 使用信用卡一次付清
   */
  creditCard(): this {
    this.paymentClass = CreditPayment
    return this
  }

  /**
   * 使用信用卡分期
   */
  creditInstallment(periods: number[] = [3, 6, 12]): this {
    this.paymentClass = CreditInstallment
    this.installments = periods
    return this
  }

  /**
   * 使用 WebATM
   */
  webAtm(): this {
    this.paymentClass = WebAtmPayment
    return this
  }

  /**
   * 使用 ATM 虛擬帳號
   */
  atm(expireDate?: string): this {
    this.paymentClass = AtmPayment
    if (expireDate) {
      this.expireDate = expireDate
    }
    return this
  }

  /**
   * 使用超商代碼繳費
   */
  cvs(expireDate?: string): this {
    this.paymentClass = CvsPayment
    if (expireDate) {
      this.expireDate = expireDate
    }
    return this
  }

  /**
   * 使用超商條碼繳費
   */
  barcode(expireDate?: string): this {
    this.paymentClass = BarcodePayment
    if (expireDate) {
      this.expireDate = expireDate
    }
    return this
  }

  /**
   * 使用 LINE Pay
   */
  linePay(): this {
    this.paymentClass = LinePayPayment
    return this
  }

  /**
   * 使用台灣 Pay
   */
  taiwanPay(): this {
    this.paymentClass = TaiwanPayPayment
    return this
  }

  /**
   * 使用全支付方式
   */
  allInOne(): this {
    this.paymentClass = AllInOnePayment
    return this
  }

  /**
   * 設定付款完成返回網址
   */
  setReturnUrl(url: string): this {
    this.returnUrl = url
    return this
  }

  /**
   * 設定付款結果通知網址
   */
  setNotifyUrl(url: string): this {
    this.notifyUrl = url
    return this
  }

  /**
   * 設定取號完成返回網址
   */
  setCustomerUrl(url: string): this {
    this.customerUrl = url
    return this
  }

  /**
   * 設定返回商店網址
   */
  setClientBackUrl(url: string): this {
    this.clientBackUrl = url
    return this
  }

  /**
   * 自訂支付物件設定
   */
  customize(callback: (payment: PaymentInterface) => void): this {
    this.customizer = callback
    return this
  }

  /**
   * 建立支付物件
   */
  build(): PaymentInterface {
    const payment = new this.paymentClass(
      this.config.merchantId,
      this.config.hashKey,
      this.config.hashIV,
    ) as PaymentInterface & {
      setTestMode: (test: boolean) => PaymentInterface
      setEmail: (email: string) => PaymentInterface
      setCustomerURL: (url: string) => PaymentInterface
      setClientBackURL: (url: string) => PaymentInterface
      getApiUrl: () => string
    }

    if (this.config.testMode !== undefined) {
      payment.setTestMode(this.config.testMode)
    }

    payment.setMerchantOrderNo(this.orderNo)
    payment.setAmt(this.amount)
    payment.setItemDesc(this.itemDesc)

    if (this.email) {
      payment.setEmail(this.email)
    }

    if (this.returnUrl) {
      payment.setReturnURL(this.returnUrl)
    } else if (this.config.returnUrl) {
      payment.setReturnURL(this.config.returnUrl)
    }

    if (this.notifyUrl) {
      payment.setNotifyURL(this.notifyUrl)
    } else if (this.config.notifyUrl) {
      payment.setNotifyURL(this.config.notifyUrl)
    }

    if (this.customerUrl) {
      payment.setCustomerURL(this.customerUrl)
    } else if (this.config.customerUrl) {
      payment.setCustomerURL(this.config.customerUrl)
    }

    if (this.clientBackUrl) {
      payment.setClientBackURL(this.clientBackUrl)
    } else if (this.config.clientBackUrl) {
      payment.setClientBackURL(this.config.clientBackUrl)
    }

    // 設定分期
    if (payment instanceof CreditInstallment && this.installments) {
      payment.setInstallment(this.installments)
    }

    // 設定繳費期限
    if (this.expireDate && 'setExpireDate' in payment) {
      ;(payment as { setExpireDate: (date: string) => void }).setExpireDate(this.expireDate)
    }

    // 執行自訂設定
    if (this.customizer) {
      this.customizer(payment)
    }

    return payment
  }

  /**
   * 取得支付參數（供前端使用）
   */
  getParams(): {
    action: string
    method: string
    fields: Record<string, string>
  } {
    const payment = this.build()
    const content = payment.getContent()

    // 統一取得 API URL 的邏輯
    let apiUrl = ''
    if ('getApiUrl' in payment && typeof payment.getApiUrl === 'function') {
      apiUrl = (payment as { getApiUrl: () => string }).getApiUrl()
    } else if ('getBaseUrl' in payment && typeof payment.getBaseUrl === 'function') {
      const baseUrl = (payment as { getBaseUrl: () => string }).getBaseUrl()
      apiUrl = baseUrl + payment.getRequestPath()
    } else {
      // 檢查是否為測試模式
      const isTest =
        'isTestMode' in payment && typeof payment.isTestMode === 'function'
          ? (payment as { isTestMode: () => boolean }).isTestMode()
          : this.config.testMode ?? false

      const baseUrl = isTest ? 'https://ccore.newebpay.com' : 'https://core.newebpay.com'
      apiUrl = baseUrl + payment.getRequestPath()
    }

    return {
      action: apiUrl,
      method: 'POST',
      fields: {
        MerchantID: content.MerchantID,
        TradeInfo: content.TradeInfo,
        TradeSha: content.TradeSha,
        Version: content.Version,
      },
    }
  }
}
