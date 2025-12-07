import { Content } from '../content.js'
import { LgsType } from '../types/parameters.js'
import { NewebPayError } from '../errors/newebpay-error.js'

/**
 * 超商取貨付款支付。
 *
 * 超商物流取貨付款服務。
 */
export class CvscomPayment extends Content {
  /**
   * 全家。
   */
  static readonly LGS_FAMI = LgsType.FAMIC2C

  /**
   * 萊爾富。
   */
  static readonly LGS_HILIFE = LgsType.HILIFEC2C

  /**
   * OK。
   */
  static readonly LGS_OK = LgsType.OKMARTC2C

  /**
   * 統一。
   */
  static readonly LGS_UNIMART = LgsType.UNIMARTC2C

  /**
   * 初始化內容。
   */
  protected override initContent(): void {
    super.initContent()
    // 啟用超商取貨付款
    this.content['CVSCOM'] = 1
  }

  /**
   * 設定物流類型。
   */
  setLgsType(lgsType: LgsType | string): this {
    this.content['LgsType'] = lgsType
    return this
  }

  /**
   * 設定取貨人姓名。
   */
  setReceiverName(name: string): this {
    if (name.length > 60) {
      throw NewebPayError.tooLong('ReceiverName', 60)
    }
    this.content['CVSCOMName'] = name
    return this
  }

  /**
   * 設定取貨人電話。
   */
  setReceiverPhone(phone: string): this {
    if (phone.length > 20) {
      throw NewebPayError.tooLong('ReceiverPhone', 20)
    }
    this.content['CVSCOMPhone'] = phone
    return this
  }

  /**
   * 驗證內容資料。
   */
  protected validation(): void {
    this.validateBaseParams()
  }
}
