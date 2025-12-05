import { Content } from "../content.js";

/**
 * 全支付方式。
 *
 * 自訂啟用多種支付方式。
 */
export class AllInOnePayment extends Content {
  /**
   * 啟用信用卡。
   */
  enableCredit(enable = true): this {
    this.content["CREDIT"] = enable ? 1 : 0;
    return this;
  }

  /**
   * 啟用 WebATM。
   */
  enableWebAtm(enable = true): this {
    this.content["WEBATM"] = enable ? 1 : 0;
    return this;
  }

  /**
   * 啟用 ATM 轉帳。
   */
  enableAtm(enable = true): this {
    this.content["VACC"] = enable ? 1 : 0;
    return this;
  }

  /**
   * 啟用超商代碼。
   */
  enableCvs(enable = true): this {
    this.content["CVS"] = enable ? 1 : 0;
    return this;
  }

  /**
   * 啟用超商條碼。
   */
  enableBarcode(enable = true): this {
    this.content["BARCODE"] = enable ? 1 : 0;
    return this;
  }

  /**
   * 啟用 LINE Pay。
   */
  enableLinePay(enable = true): this {
    this.content["LINEPAY"] = enable ? 1 : 0;
    return this;
  }

  /**
   * 啟用台灣 Pay。
   */
  enableTaiwanPay(enable = true): this {
    this.content["TAIWANPAY"] = enable ? 1 : 0;
    return this;
  }

  /**
   * 啟用玉山 Wallet。
   */
  enableEsunWallet(enable = true): this {
    this.content["ESUNWALLET"] = enable ? 1 : 0;
    return this;
  }

  /**
   * 啟用 BitoPay。
   */
  enableBitoPay(enable = true): this {
    this.content["BITOPAY"] = enable ? 1 : 0;
    return this;
  }

  /**
   * 啟用 TWQR。
   */
  enableTwqr(enable = true): this {
    this.content["TWQR"] = enable ? 1 : 0;
    return this;
  }

  /**
   * 啟用付啦。
   */
  enableFula(enable = true): this {
    this.content["FULA"] = enable ? 1 : 0;
    return this;
  }

  /**
   * 啟用信用卡分期。
   */
  enableInstallment(installments: number[]): this {
    this.content["InstFlag"] = installments.join(",");
    return this;
  }

  /**
   * 啟用紅利折抵。
   */
  enableRedeem(enable = true): this {
    this.content["CreditRed"] = enable ? 1 : 0;
    return this;
  }

  /**
   * 啟用銀聯卡。
   */
  enableUnionPay(enable = true): this {
    this.content["UNIONPAY"] = enable ? 1 : 0;
    return this;
  }

  /**
   * 驗證內容資料。
   */
  protected validation(): void {
    this.validateBaseParams();
  }
}
