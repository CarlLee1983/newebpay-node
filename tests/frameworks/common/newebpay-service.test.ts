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
    it("creditInstallment 應該返回 CreditInstallment", () => {
      const service = new NewebPayService(config);
      const payment = service.creditInstallment() as any;
      expect(payment.get("InstFlag")).toBeDefined();
    });

    it("esunWallet 應該返回 EsunWalletPayment", () => {
      const service = new NewebPayService(config);
      const payment = service.esunWallet() as any;
      expect(payment.get("ESUNWALLET")).toBe(1);
    });

    it("bitoPay 應該返回 BitoPayPayment", () => {
      const service = new NewebPayService(config);
      const payment = service.bitoPay() as any;
      expect(payment.get("BITOPAY")).toBe(1);
    });

    it("twqr 應該返回 TwqrPayment", () => {
      const service = new NewebPayService(config);
      const payment = service.twqr() as any;
      expect(payment.get("TWQR")).toBe(1);
    });

    it("fula 應該返回 FulaPayment", () => {
      const service = new NewebPayService(config);
      const payment = service.fula() as any;
      expect(payment.get("FULA")).toBe(1);
    });

    it("cvscom 應該返回 CvscomPayment", () => {
      const service = new NewebPayService(config);
      const payment = service.cvscom() as any;
      expect(payment.get("CVSCOM")).toBe(1);
    });

    it("allInOne 應該返回 AllInOnePayment", () => {
      const service = new NewebPayService(config);
      const payment = service.allInOne();
      expect(payment).toBeDefined();
    });
  });

  describe("Form Builder", () => {
    it("form 應該返回 FormBuilder", () => {
      const service = new NewebPayService(config);
      const payment = service.credit();
      const form = service.form(payment);
      expect(form).toBeDefined();
    });
  });

  describe("Configuration Application", () => {
    it("應該將 URL 設定應用到支付物件", () => {
      const fullConfig: NewebPayConfig = {
        ...config,
        returnUrl: "https://example.com/return",
        notifyUrl: "https://example.com/notify",
        customerUrl: "https://example.com/customer",
        clientBackUrl: "https://example.com/back",
      };

      const service = new NewebPayService(fullConfig);
      const payment = service.credit() as any;

      expect(payment.get("ReturnURL")).toBe("https://example.com/return");
      expect(payment.get("NotifyURL")).toBe("https://example.com/notify");
      expect(payment.get("CustomerURL")).toBe("https://example.com/customer");
      expect(payment.get("ClientBackURL")).toBe("https://example.com/back");
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

    it("eWalletRefund 應該返回 EWalletRefund", () => {
      const service = new NewebPayService(config);
      const refund = service.eWalletRefund();

      expect(refund.getApiUrl()).toContain("Refund");
    });
  });
});
