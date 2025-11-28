import { Content } from '../content.js';
import { NewebPayError } from '../errors/newebpay-error.js';

/**
 * 超商代碼繳費支付。
 *
 * 金額限制 30~20,000 元。
 */
export class CvsPayment extends Content {
  /**
   * 最小金額。
   */
  static readonly MIN_AMT = 30;

  /**
   * 最大金額。
   */
  static readonly MAX_AMT = 20000;

  /**
   * 初始化內容。
   */
  protected override initContent(): void {
    super.initContent();
    // 啟用超商代碼付款
    this.content['CVS'] = 1;
  }

  /**
   * 驗證內容資料。
   */
  protected validation(): void {
    this.validateBaseParams();

    const amt = this.content['Amt'] as number;
    if (amt < CvsPayment.MIN_AMT || amt > CvsPayment.MAX_AMT) {
      throw NewebPayError.invalid(
        'Amt',
        `超商代碼金額必須在 ${CvsPayment.MIN_AMT}~${CvsPayment.MAX_AMT} 元之間`
      );
    }
  }
}

