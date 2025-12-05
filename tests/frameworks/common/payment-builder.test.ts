import { describe, it, expect, beforeEach } from "vitest";
import { PaymentBuilder } from "../../../src/frameworks/common/payment-builder.js";
import type { NewebPayConfig } from "../../../src/frameworks/common/config.js";

describe("PaymentBuilder", () => {
  const config: NewebPayConfig = {
    merchantId: "MS12345678",
    hashKey: "12345678901234567890123456789012",
    hashIV: "1234567890123456",
    testMode: true,
  };

  let builder: PaymentBuilder;

  beforeEach(() => {
    builder = new PaymentBuilder(config);
  });

  describe("setOrder", () => {
    it("應該正確設定訂單資訊", () => {
      builder.setOrder("ORDER001", 1000, "測試商品", "test@example.com");

      const payment = builder.build();
      expect(payment.get("MerchantOrderNo")).toBe("ORDER001");
      expect(payment.get("Amt")).toBe(1000);
      expect(payment.get("ItemDesc")).toBe("測試商品");
      expect(payment.get("Email")).toBe("test@example.com");
    });
  });

  describe("支付方式選擇", () => {
    it("creditCard 應該設定為信用卡", () => {
      builder.setOrder("ORDER001", 1000, "商品", "").creditCard();
      const payment = builder.build();
      expect(payment.get("CREDIT")).toBe(1);
    });

    it("creditInstallment 應該設定為分期", () => {
      builder
        .setOrder("ORDER001", 3000, "商品", "")
        .creditInstallment([3, 6, 12]);
      const payment = builder.build();
      expect(payment.get("InstFlag")).toBe("3,6,12");
    });

    it("atm 應該設定為 ATM", () => {
      builder.setOrder("ORDER001", 2000, "商品", "").atm("2025-12-31");
      const payment = builder.build();
      expect(payment.get("VACC")).toBe(1);
      expect(payment.get("ExpireDate")).toBe("2025-12-31");
    });
  });

  describe("URL 設定", () => {
    it("setReturnUrl 應該正確設定", () => {
      builder
        .setOrder("ORDER001", 1000, "商品", "")
        .setReturnUrl("https://example.com/return");

      const payment = builder.build();
      expect(payment.get("ReturnURL")).toBe("https://example.com/return");
    });

    it("setNotifyUrl 應該正確設定", () => {
      builder
        .setOrder("ORDER001", 1000, "商品", "")
        .setNotifyUrl("https://example.com/notify");

      const payment = builder.build();
      expect(payment.get("NotifyURL")).toBe("https://example.com/notify");
    });
  });

  describe("getParams", () => {
    it("應該返回正確的參數格式", () => {
      builder.setOrder("ORDER001", 1000, "商品", "").creditCard();

      const params = builder.getParams();

      expect(params.method).toBe("POST");
      expect(params.fields.MerchantID).toBe(config.merchantId);
      expect(params.fields.TradeInfo).toBeDefined();
      expect(params.fields.TradeSha).toBeDefined();
    });
  });

  describe("鏈式呼叫", () => {
    it("應該支援鏈式呼叫", () => {
      const result = builder
        .setOrder("ORDER001", 1000, "商品", "")
        .creditCard()
        .setReturnUrl("https://example.com/return")
        .setNotifyUrl("https://example.com/notify");

      expect(result).toBe(builder);
    });
  });
});
