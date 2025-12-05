import { Content } from "../content.js";

/**
 * 台灣 Pay 支付。
 *
 * 台灣 Pay 行動支付。
 */
export class TaiwanPayPayment extends Content {
  /**
   * 初始化內容。
   */
  protected override initContent(): void {
    super.initContent();
    // 啟用台灣 Pay 付款
    this.content["TAIWANPAY"] = 1;
  }

  /**
   * 驗證內容資料。
   */
  protected validation(): void {
    this.validateBaseParams();
  }
}
