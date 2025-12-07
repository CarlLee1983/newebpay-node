import { Content } from '../content.js'
import { NewebPayError } from '../errors/newebpay-error.js'

/**
 * 信用卡分期支付。
 *
 * 支援 3/6/12/18/24/30 期分期付款。
 */
export class CreditInstallment extends Content {
  /**
   * 允許的分期期數。
   */
  private static readonly ALLOWED_INSTALLMENTS = [3, 6, 12, 18, 24, 30]

  /**
   * 初始化內容。
   */
  protected override initContent(): void {
    super.initContent()
    // 啟用信用卡分期
    this.content['InstFlag'] = 1
  }

  /**
   * 設定分期期數選項。
   *
   * @param installments 分期期數陣列，例如 [3, 6, 12]
   */
  setInstallment(installments: number[]): this {
    // 驗證分期期數
    for (const inst of installments) {
      if (!CreditInstallment.ALLOWED_INSTALLMENTS.includes(inst)) {
        throw NewebPayError.invalid(
          'Installment',
          `不支援 ${inst} 期，允許的期數：${CreditInstallment.ALLOWED_INSTALLMENTS.join(', ')}`,
        )
      }
    }

    this.content['InstFlag'] = installments.join(',')
    return this
  }

  /**
   * 驗證內容資料。
   */
  protected validation(): void {
    this.validateBaseParams()
  }
}
