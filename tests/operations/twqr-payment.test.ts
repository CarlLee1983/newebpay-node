import { describe, it, expect, beforeEach } from "vitest";
import { TwqrPayment } from "../../src/operations/twqr-payment.js";

describe("TwqrPayment", () => {
    const merchantId = "MS12345678";
    const hashKey = "12345678901234567890123456789012";
    const hashIV = "1234567890123456";

    let payment: TwqrPayment;

    beforeEach(() => {
        payment = new TwqrPayment(merchantId, hashKey, hashIV);
    });

    describe("建構函式", () => {
        it("應該正確初始化並啟用 TWQR", () => {
            const rawContent = payment.getRawContent();
            expect(rawContent["TWQR"]).toBe(1);
        });
    });

    describe("validation", () => {
        it("呼叫 validateBaseParams", () => {
            payment.setMerchantOrderNo("ORDER001").setAmt(100).setItemDesc("Desc").setEmail("test@test.com");
            expect(() => payment.getPayload()).not.toThrow();
        });
    });
});
