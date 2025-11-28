import { Content } from '../content.js';

/**
 * LINE Pay 支付。
 *
 * LINE Pay 電子錢包支付。
 */
export class LinePayPayment extends Content {
  /**
   * 初始化內容。
   */
  protected override initContent(): void {
    super.initContent();
    // 啟用 LINE Pay 付款
    this.content['LINEPAY'] = 1;
  }

  /**
   * 設定是否使用 LINE Pay 產品圖片。
   */
  setImageUrl(url: string): this {
    this.content['LINEPayProductImageUrl'] = url;
    return this;
  }

  /**
   * 驗證內容資料。
   */
  protected validation(): void {
    this.validateBaseParams();
  }
}

