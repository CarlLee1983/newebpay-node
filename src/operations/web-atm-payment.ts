import { Content } from '../content.js'

/**
 * WebATM 支付。
 *
 * 即時網路 ATM 轉帳。
 */
export class WebAtmPayment extends Content {
  /**
   * 初始化內容。
   */
  protected override initContent(): void {
    super.initContent()
    // 啟用 WebATM 付款
    this.content['WEBATM'] = 1
  }

  /**
   * 驗證內容資料。
   */
  protected validation(): void {
    this.validateBaseParams()
  }
}
