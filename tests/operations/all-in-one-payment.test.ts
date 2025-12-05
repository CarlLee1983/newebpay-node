import { describe, it, expect, beforeEach } from "vitest";
import { AllInOnePayment } from "../../src/operations/all-in-one-payment.js";

describe("AllInOnePayment", () => {
  const merchantId = "MS12345678";
  const hashKey = "12345678901234567890123456789012";
  const hashIV = "1234567890123456";

  let payment: AllInOnePayment;

  beforeEach(() => {
    payment = new AllInOnePayment(merchantId, hashKey, hashIV);
  });

  describe("啟用支付方式", () => {
    it("enableCredit 應該正確設定信用卡", () => {
      payment.enableCredit(true);
      expect(payment.get("CREDIT")).toBe(1);

      payment.enableCredit(false);
      expect(payment.get("CREDIT")).toBe(0);
    });

    it("enableWebAtm 應該正確設定 WebATM", () => {
      payment.enableWebAtm(true);
      expect(payment.get("WEBATM")).toBe(1);
    });

    it("enableAtm 應該正確設定 ATM", () => {
      payment.enableAtm(true);
      expect(payment.get("VACC")).toBe(1);
    });

    it("enableCvs 應該正確設定超商代碼", () => {
      payment.enableCvs(true);
      expect(payment.get("CVS")).toBe(1);
    });

    it("enableBarcode 應該正確設定超商條碼", () => {
      payment.enableBarcode(true);
      expect(payment.get("BARCODE")).toBe(1);
    });

    it("enableLinePay 應該正確設定 LINE Pay", () => {
      payment.enableLinePay(true);
      expect(payment.get("LINEPAY")).toBe(1);
    });

    it("enableTaiwanPay 應該正確設定台灣 Pay", () => {
      payment.enableTaiwanPay(true);
      expect(payment.get("TAIWANPAY")).toBe(1);
    });

    it("enableInstallment 應該正確設定分期", () => {
      payment.enableInstallment([3, 6, 12]);
      expect(payment.get("InstFlag")).toBe("3,6,12");
    });

    it("enableRedeem 應該正確設定紅利折抵", () => {
      payment.enableRedeem(true);
      expect(payment.get("CreditRed")).toBe(1);
    });

    it("enableUnionPay 應該正確設定銀聯卡", () => {
      payment.enableUnionPay(true);
      expect(payment.get("UNIONPAY")).toBe(1);
    });
  });

  describe("多重支付方式組合", () => {
    it("應該能同時啟用多種支付方式", () => {
      payment
        .enableCredit(true)
        .enableAtm(true)
        .enableCvs(true)
        .enableLinePay(true);

      expect(payment.get("CREDIT")).toBe(1);
      expect(payment.get("VACC")).toBe(1);
      expect(payment.get("CVS")).toBe(1);
      expect(payment.get("LINEPAY")).toBe(1);
    });
  });

  describe("getPayload", () => {
    it("應該正確產生 payload", () => {
      payment
        .setMerchantOrderNo("ORDER001")
        .setAmt(1000)
        .setItemDesc("測試商品")
        .enableCredit(true)
        .enableAtm(true);

      const payload = payment.getPayload();

      expect(payload["CREDIT"]).toBe(1);
      expect(payload["VACC"]).toBe(1);
    });
  });
});
