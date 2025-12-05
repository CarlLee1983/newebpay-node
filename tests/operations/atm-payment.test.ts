import { describe, it, expect, beforeEach } from "vitest";
import { AtmPayment } from "../../src/operations/atm-payment.js";
import { BankType } from "../../src/types/parameters.js";

describe("AtmPayment", () => {
    const merchantId = "MS12345678";
    const hashKey = "12345678901234567890123456789012";
    const hashIV = "1234567890123456";

    let payment: AtmPayment;

    beforeEach(() => {
        payment = new AtmPayment(merchantId, hashKey, hashIV);
    });

    describe("建構函式", () => {
        it("應該正確初始化並啟用 VACC", () => {
            const rawContent = payment.getRawContent();
            expect(rawContent["VACC"]).toBe(1);
        });
    });

    describe("static 常數", () => {
        it("應該定義正確的銀行代碼", () => {
            expect(AtmPayment.BANK_BOT).toBe(BankType.BOT);
            expect(AtmPayment.BANK_HNCB).toBe(BankType.HNCB);
            expect(AtmPayment.BANK_FCB).toBe(BankType.FCB);
        });
    });

    describe("setBankType", () => {
        it("應該正確設定銀行代碼", () => {
            payment.setBankType(BankType.BOT);
            expect(payment.getRawContent()["BankType"]).toBe(BankType.BOT);

            payment.setBankType("BOT");
            expect(payment.getRawContent()["BankType"]).toBe("BOT");
        });
    });

    describe("validation", () => {
        it("呼叫 validateBaseParams", () => {
            payment.setMerchantOrderNo("ORDER001").setAmt(100).setItemDesc("Test").setEmail("test@test.com");
            // Should not throw
            expect(() => payment.getPayload()).not.toThrow();
        });
    });
});
