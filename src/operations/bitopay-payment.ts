import { Content } from "../content.js";

/**
 * BitoPay 支付。
 *
 * 加密貨幣支付。
 */
export class BitoPayPayment extends Content {
  /**
   * 初始化內容。
   */
  protected override initContent(): void {
    super.initContent();
    // 啟用 BitoPay 付款
    this.content["BITOPAY"] = 1;
  }

  /**
   * 驗證內容資料。
   */
  protected validation(): void {
    this.validateBaseParams();
  }
}
