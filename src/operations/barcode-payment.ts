import { Content } from '../content.js';
import { NewebPayError } from '../errors/newebpay-error.js';

/**
 * 超商條碼繳費支付。
 *
 * 金額限制 20~40,000 元。
 */
export class BarcodePayment extends Content {
  /**
   * 最小金額。
   */
  static readonly MIN_AMT = 20;

  /**
   * 最大金額。
   */
  static readonly MAX_AMT = 40000;

  /**
   * 初始化內容。
   */
  protected override initContent(): void {
    super.initContent();
    // 啟用超商條碼付款
    this.content['BARCODE'] = 1;
  }

  /**
   * 驗證內容資料。
   */
  protected validation(): void {
    this.validateBaseParams();

    const amt = this.content['Amt'] as number;
    if (amt < BarcodePayment.MIN_AMT || amt > BarcodePayment.MAX_AMT) {
      throw NewebPayError.invalid(
        'Amt',
        `超商條碼金額必須在 ${BarcodePayment.MIN_AMT}~${BarcodePayment.MAX_AMT} 元之間`
      );
    }
  }
}

