import { describe, it, expect } from "vitest";
import { NewebPayService } from "../../../src/frameworks/common/index.js";
import type { NewebPayConfig } from "../../../src/frameworks/common/config.js";

describe("NewebPayService", () => {
  const config: NewebPayConfig = {
    merchantId: "MS12345678",
    hashKey: "12345678901234567890123456789012",
    hashIV: "1234567890123456",
    testMode: true,
  };

  describe("payment", () => {
    it("應該返回 PaymentBuilder 實例", () => {
      const service = new NewebPayService(config);
      const builder = service.payment(
        "ORDER001",
        1000,
        "商品",
        "test@example.com",
      );

      expect(builder).toBeDefined();
      const params = builder.creditCard().getParams();
      expect(params.fields.MerchantID).toBe(config.merchantId);
    });
  });

  describe("Payment Methods", () => {
    it("credit should return CreditPayment", () => {
      const service = new NewebPayService(config);
      const payment = service.credit() as any;

      expect(payment.get("CREDIT")).toBe(1);
      expect(payment.isTestMode()).toBe(true);
    });

    it("atm should return AtmPayment", () => {
      const service = new NewebPayService(config);
      const payment = service.atm() as any;

      expect(payment.get("VACC")).toBe(1);
    });

    it("cvs should return CvsPayment", () => {
      const service = new NewebPayService(config);
      const payment = service.cvs() as any;
      expect(payment.get("CVS")).toBe(1);
    });

    it("barcode should return BarcodePayment", () => {
      const service = new NewebPayService(config);
      const payment = service.barcode() as any;
      expect(payment.get("BARCODE")).toBe(1);
    });

    it("linePay should return LinePayPayment", () => {
      const service = new NewebPayService(config);
      const payment = service.linePay() as any;
      expect(payment.get("LINEPAY")).toBe(1);
    });

    it("webAtm should return WebAtmPayment", () => {
      const service = new NewebPayService(config);
      const payment = service.webAtm() as any;
      expect(payment.get("WEBATM")).toBe(1);
    });

    it("taiwanPay should return TaiwanPayPayment", () => {
      const service = new NewebPayService(config);
      const payment = service.taiwanPay() as any;
      expect(payment.get("TAIWANPAY")).toBe(1);
    });
  });

  describe("查詢方法", () => {
    it("queryOrder 應該返回 QueryOrder", () => {
      const service = new NewebPayService(config);
      const query = service.queryOrder();

      expect(query.getApiUrl()).toContain("QueryTradeInfo");
      expect(query.getApiUrl()).toContain("ccore.newebpay.com"); // 測試環境
    });

    it("queryCreditDetail 應該返回 QueryCreditDetail", () => {
      const service = new NewebPayService(config);
      const query = service.queryCreditDetail();

      expect(query.getApiUrl()).toContain("QueryTradeInfo");
      expect(query.getApiUrl()).toContain("ccore.newebpay.com"); // 測試環境
    });
  });

  describe("動作方法", () => {
    it("creditClose 應該返回 CreditClose", () => {
      const service = new NewebPayService(config);
      const creditClose = service.creditClose();

      expect(creditClose.getApiUrl()).toContain("Close");
    });

    it("creditCancel 應該返回 CreditCancel", () => {
      const service = new NewebPayService(config);
      const creditCancel = service.creditCancel();

      expect(creditCancel.getApiUrl()).toContain("Cancel");
    });
  });
});
