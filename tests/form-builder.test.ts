import { describe, it, expect } from "vitest";
import { FormBuilder } from "../src/form-builder.js";
import { CreditPayment } from "../src/operations/credit-payment.js";

describe("FormBuilder", () => {
  const merchantId = "MS12345678";
  const hashKey = "12345678901234567890123456789012";
  const hashIV = "1234567890123456";

  function createPayment() {
    return new CreditPayment(merchantId, hashKey, hashIV)
      .setTestMode(true)
      .setMerchantOrderNo("ORDER001")
      .setAmt(1000)
      .setItemDesc("測試商品");
  }

  describe("建構函式", () => {
    it("使用靜態方法建立實例", () => {
      const payment = createPayment();
      const builder = FormBuilder.create(payment);

      expect(builder).toBeInstanceOf(FormBuilder);
    });

    it("預設選項應正確設定", () => {
      const payment = createPayment();
      const builder = new FormBuilder(payment);
      const formData = builder.getFormData();

      expect(formData.method).toBe("POST");
    });
  });

  describe("build", () => {
    it("應該產生有效的 HTML 表單", () => {
      const payment = createPayment();
      const builder = new FormBuilder(payment);

      const html = builder.build();

      expect(html).toContain("<form");
      expect(html).toContain('method="POST"');
      expect(html).toContain(
        'action="https://ccore.newebpay.com/MPG/mpg_gateway"',
      );
      expect(html).toContain('name="MerchantID"');
      expect(html).toContain('name="TradeInfo"');
      expect(html).toContain('name="TradeSha"');
      expect(html).toContain('name="Version"');
    });

    it("自動送出應包含 script", () => {
      const payment = createPayment();
      const builder = new FormBuilder(payment, { autoSubmit: true });

      const html = builder.build();

      expect(html).toContain("<script>");
      expect(html).toContain(".submit()");
    });

    it("手動送出應包含按鈕", () => {
      const payment = createPayment();
      const builder = new FormBuilder(payment, { autoSubmit: false });

      const html = builder.build();

      expect(html).toContain('<button type="submit">');
      expect(html).not.toContain("<script>");
    });

    it("自訂按鈕文字", () => {
      const payment = createPayment();
      const builder = new FormBuilder(payment, {
        autoSubmit: false,
        submitButtonText: "立即付款",
      });

      const html = builder.build();

      expect(html).toContain("立即付款");
    });

    it("自訂表單 ID", () => {
      const payment = createPayment();
      const builder = new FormBuilder(payment, { formId: "my-payment-form" });

      const html = builder.build();

      expect(html).toContain('id="my-payment-form"');
    });
  });

  describe("getFormData", () => {
    it("應該返回表單資料", () => {
      const payment = createPayment();
      const builder = new FormBuilder(payment);

      const formData = builder.getFormData();

      expect(formData.action).toBe(
        "https://ccore.newebpay.com/MPG/mpg_gateway",
      );
      expect(formData.method).toBe("POST");
      expect(formData.fields).toBeDefined();
      expect(formData.fields.MerchantID).toBe(merchantId);
      expect(formData.fields.TradeInfo).toBeDefined();
      expect(formData.fields.TradeSha).toBeDefined();
    });
  });

  describe("鏈式呼叫", () => {
    it("設定方法應支援鏈式呼叫", () => {
      const payment = createPayment();
      const builder = new FormBuilder(payment);

      const result = builder
        .setAutoSubmit(false)
        .setFormId("custom-form")
        .setSubmitButtonText("付款");

      expect(result).toBe(builder);
    });
  });

  describe("HTML 跳脫", () => {
    it("應該正確跳脫特殊字元", () => {
      const payment = createPayment();
      const builder = new FormBuilder(payment, {
        formId: "test<>form",
        autoSubmit: false,
        submitButtonText: '<script>alert("xss")</script>',
      });

      const html = builder.build();

      expect(html).not.toContain("<script>alert");
      expect(html).toContain("&lt;script&gt;");
    });
  });
});
