import { describe, it, expect, beforeEach } from "vitest";
import { TaiwanPayPayment } from "../../src/operations/taiwanpay-payment.js";

describe("TaiwanPayPayment", () => {
    const merchantId = "MS12345678";
    const hashKey = "12345678901234567890123456789012";
    const hashIV = "1234567890123456";

    let payment: TaiwanPayPayment;

    beforeEach(() => {
        payment = new TaiwanPayPayment(merchantId, hashKey, hashIV);
    });

    describe("建構函式", () => {
        it("應該正確初始化並啟用 TAIWANPAY", () => {
            const rawContent = payment.getRawContent();
            expect(rawContent["TAIWANPAY"]).toBe(1);
        });
    });

    describe("validation", () => {
        it("呼叫 validateBaseParams", () => {
            payment.setMerchantOrderNo("ORDER001").setAmt(100).setItemDesc("Desc").setEmail("test@test.com");
            expect(() => payment.getPayload()).not.toThrow();
        });
    });
});
