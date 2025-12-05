import { describe, it, expect, beforeEach } from "vitest";
import { CreditInstallment } from "../../src/operations/credit-installment.js";
import { NewebPayError } from "../../src/errors/newebpay-error.js";

describe("CreditInstallment", () => {
    const merchantId = "MS12345678";
    const hashKey = "12345678901234567890123456789012";
    const hashIV = "1234567890123456";

    let payment: CreditInstallment;

    beforeEach(() => {
        payment = new CreditInstallment(merchantId, hashKey, hashIV);
    });

    describe("建構函式", () => {
        it("應該正確初始化並啟用 InstFlag", () => {
            const rawContent = payment.getRawContent();
            expect(rawContent["InstFlag"]).toBe(1);
        });
    });

    describe("setInstallment", () => {
        it("應該正確設定分期期數", () => {
            payment.setInstallment([3, 6, 12]);
            expect(payment.getRawContent()["InstFlag"]).toBe("3,6,12");
        });

        it("單一期數也應該正確設定", () => {
            payment.setInstallment([3]);
            expect(payment.getRawContent()["InstFlag"]).toBe("3");
        });

        it("設定不支援的期數應拋出錯誤", () => {
            expect(() => payment.setInstallment([4])).toThrow(NewebPayError);
            expect(() => payment.setInstallment([3, 5])).toThrow(NewebPayError);
        });
    });

    describe("validation", () => {
        it("呼叫 validateBaseParams", () => {
            payment.setMerchantOrderNo("ORDER001").setAmt(100).setItemDesc("Desc").setEmail("test@test.com");
            expect(() => payment.getPayload()).not.toThrow();
        });
    });
});
