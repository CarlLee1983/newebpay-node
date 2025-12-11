import { Content } from '../content.js';

/**
 * 玉山 Wallet 支付。
 *
 * 玉山銀行電子錢包支付。
 */
export class EsunWalletPayment extends Content {
  /**
   * 初始化內容。
   */
  protected override initContent(): void {
    super.initContent();
    // 啟用玉山 Wallet 付款
    this.content.ESUNWALLET = 1;
  }

  /**
   * 驗證內容資料。
   */
  protected validation(): void {
    this.validateBaseParams();
  }
}
