import { describe, it, expect, beforeEach } from "vitest";
import { BarcodePayment } from "../../src/operations/barcode-payment.js";
import { NewebPayError } from "../../src/errors/newebpay-error.js";

describe("BarcodePayment", () => {
    const merchantId = "MS12345678";
    const hashKey = "12345678901234567890123456789012";
    const hashIV = "1234567890123456";

    let payment: BarcodePayment;

    beforeEach(() => {
        payment = new BarcodePayment(merchantId, hashKey, hashIV);
    });

    describe("建構函式", () => {
        it("應該正確初始化並啟用 BARCODE", () => {
            const rawContent = payment.getRawContent();
            expect(rawContent["BARCODE"]).toBe(1);
        });
    });

    describe("常數", () => {
        it("應該定義正確的金額限制", () => {
            expect(BarcodePayment.MIN_AMT).toBe(20);
            expect(BarcodePayment.MAX_AMT).toBe(40000);
        });
    });

    describe("validation", () => {
        it("金額在範圍內應通過驗證", () => {
            payment.setMerchantOrderNo("ORDER001").setItemDesc("Test").setEmail("test@test.com");

            payment.setAmt(20);
            expect(() => payment.getPayload()).not.toThrow();

            payment.setAmt(40000);
            expect(() => payment.getPayload()).not.toThrow();
        });

        it("金額低於最小值應拋出錯誤", () => {
            payment.setMerchantOrderNo("ORDER001").setItemDesc("Test").setEmail("test@test.com");
            payment.setAmt(19);
            expect(() => payment.getPayload()).toThrow(NewebPayError);
        });

        it("金額高於最大值應拋出錯誤", () => {
            payment.setMerchantOrderNo("ORDER001").setItemDesc("Test").setEmail("test@test.com");
            payment.setAmt(40001);
            expect(() => payment.getPayload()).toThrow(NewebPayError);
        });
    });
});
