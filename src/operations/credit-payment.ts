import { Content } from "../content.js";

/**
 * 信用卡一次付清支付。
 *
 * 支援信用卡一次付清、紅利折抵等功能。
 */
export class CreditPayment extends Content {
  /**
   * 初始化內容。
   */
  protected override initContent(): void {
    super.initContent();
    // 啟用信用卡付款
    this.content["CREDIT"] = 1;
  }

  /**
   * 設定是否啟用紅利折抵。
   */
  setRedeem(enable: number): this {
    this.content["CreditRed"] = enable;
    return this;
  }

  /**
   * 設定是否啟用銀聯卡。
   */
  setUnionPay(enable: number): this {
    this.content["UNIONPAY"] = enable;
    return this;
  }

  /**
   * 設定是否啟用 Google Pay。
   */
  setGooglePay(enable: number): this {
    this.content["ANDROIDPAY"] = enable;
    return this;
  }

  /**
   * 設定是否啟用 Samsung Pay。
   */
  setSamsungPay(enable: number): this {
    this.content["SAMSUNGPAY"] = enable;
    return this;
  }

  /**
   * 設定信用卡快速結帳。
   */
  setTokenTerm(enable: number): this {
    this.content["TokenTerm"] = enable;
    return this;
  }

  /**
   * 設定信用卡快速結帳使用者識別碼。
   */
  setTokenTermDemand(tokenTermId: string): this {
    this.content["TokenTermDemand"] = tokenTermId;
    return this;
  }

  /**
   * 驗證內容資料。
   */
  protected validation(): void {
    this.validateBaseParams();
  }
}
