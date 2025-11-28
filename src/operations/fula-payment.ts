import { Content } from '../content.js';

/**
 * 付啦支付。
 *
 * 先買後付服務。
 */
export class FulaPayment extends Content {
  /**
   * 初始化內容。
   */
  protected override initContent(): void {
    super.initContent();
    // 啟用付啦付款
    this.content['FULA'] = 1;
  }

  /**
   * 驗證內容資料。
   */
  protected validation(): void {
    this.validateBaseParams();
  }
}

