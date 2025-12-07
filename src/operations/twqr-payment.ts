import { Content } from '../content.js'

/**
 * TWQR 共通支付。
 *
 * 台灣 QR Code 共通支付。
 */
export class TwqrPayment extends Content {
  /**
   * 初始化內容。
   */
  protected override initContent(): void {
    super.initContent()
    // 啟用 TWQR 付款
    this.content['TWQR'] = 1
  }

  /**
   * 驗證內容資料。
   */
  protected validation(): void {
    this.validateBaseParams()
  }
}
