import { Content } from "../content.js";
import { BankType } from "../types/parameters.js";

/**
 * ATM 虛擬帳號支付。
 *
 * 產生虛擬帳號供消費者轉帳。
 */
export class AtmPayment extends Content {
  /**
   * 台灣銀行。
   */
  static readonly BANK_BOT = BankType.BOT;

  /**
   * 華南銀行。
   */
  static readonly BANK_HNCB = BankType.HNCB;

  /**
   * 第一銀行。
   */
  static readonly BANK_FCB = BankType.FCB;

  /**
   * 初始化內容。
   */
  protected override initContent(): void {
    super.initContent();
    // 啟用 ATM 付款
    this.content["VACC"] = 1;
  }

  /**
   * 設定指定銀行。
   */
  setBankType(bankType: BankType | string): this {
    this.content["BankType"] = bankType;
    return this;
  }

  /**
   * 驗證內容資料。
   */
  protected validation(): void {
    this.validateBaseParams();
  }
}
