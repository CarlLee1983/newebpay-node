import { describe, it, expect, beforeEach } from "vitest";
import { LinePayPayment } from "../../src/operations/linepay-payment.js";

describe("LinePayPayment", () => {
    const merchantId = "MS12345678";
    const hashKey = "12345678901234567890123456789012";
    const hashIV = "1234567890123456";

    let payment: LinePayPayment;

    beforeEach(() => {
        payment = new LinePayPayment(merchantId, hashKey, hashIV);
    });

    describe("建構函式", () => {
        it("應該正確初始化並啟用 LINEPAY", () => {
            const rawContent = payment.getRawContent();
            expect(rawContent["LINEPAY"]).toBe(1);
        });
    });

    describe("setImageUrl", () => {
        it("應該正確設定圖片網址", () => {
            const url = "https://example.com/image.png";
            payment.setImageUrl(url);
            expect(payment.getRawContent()["LINEPayProductImageUrl"]).toBe(url);
        });
    });

    describe("validation", () => {
        it("呼叫 validateBaseParams", () => {
            payment.setMerchantOrderNo("ORDER001").setAmt(100).setItemDesc("Desc").setEmail("test@test.com");
            expect(() => payment.getPayload()).not.toThrow();
        });
    });
});
