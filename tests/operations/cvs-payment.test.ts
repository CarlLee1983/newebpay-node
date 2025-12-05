import { describe, it, expect, beforeEach } from "vitest";
import { CvsPayment } from "../../src/operations/cvs-payment.js";
import { NewebPayError } from "../../src/errors/newebpay-error.js";

describe("CvsPayment", () => {
    const merchantId = "MS12345678";
    const hashKey = "12345678901234567890123456789012";
    const hashIV = "1234567890123456";

    let payment: CvsPayment;

    beforeEach(() => {
        payment = new CvsPayment(merchantId, hashKey, hashIV);
    });

    describe("建構函式", () => {
        it("應該正確初始化並啟用 CVS", () => {
            const rawContent = payment.getRawContent();
            expect(rawContent["CVS"]).toBe(1);
        });
    });

    describe("常數", () => {
        it("應該定義正確的金額限制", () => {
            expect(CvsPayment.MIN_AMT).toBe(30);
            expect(CvsPayment.MAX_AMT).toBe(20000);
        });
    });

    describe("validation", () => {
        it("金額在範圍內應通過驗證", () => {
            payment.setMerchantOrderNo("ORDER001").setItemDesc("Test").setEmail("test@test.com");

            payment.setAmt(30);
            expect(() => payment.getPayload()).not.toThrow();

            payment.setAmt(20000);
            expect(() => payment.getPayload()).not.toThrow();
        });

        it("金額低於最小值應拋出錯誤", () => {
            payment.setMerchantOrderNo("ORDER001").setItemDesc("Test").setEmail("test@test.com");
            payment.setAmt(29);
            expect(() => payment.getPayload()).toThrow(NewebPayError);
        });

        it("金額高於最大值應拋出錯誤", () => {
            payment.setMerchantOrderNo("ORDER001").setItemDesc("Test").setEmail("test@test.com");
            payment.setAmt(20001);
            expect(() => payment.getPayload()).toThrow(NewebPayError);
        });
    });
});
