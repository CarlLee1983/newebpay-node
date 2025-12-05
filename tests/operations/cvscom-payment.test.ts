import { describe, it, expect, beforeEach } from "vitest";
import { CvscomPayment } from "../../src/operations/cvscom-payment.js";
import { LgsType } from "../../src/types/parameters.js";
import { NewebPayError } from "../../src/errors/newebpay-error.js";

describe("CvscomPayment", () => {
    const merchantId = "MS12345678";
    const hashKey = "12345678901234567890123456789012";
    const hashIV = "1234567890123456";

    let payment: CvscomPayment;

    beforeEach(() => {
        payment = new CvscomPayment(merchantId, hashKey, hashIV);
    });

    describe("建構函式", () => {
        it("應該正確初始化並啟用 CVSCOM", () => {
            const rawContent = payment.getRawContent();
            expect(rawContent["CVSCOM"]).toBe(1);
        });
    });

    describe("static 常數", () => {
        it("應該定義正確的物流代碼", () => {
            expect(CvscomPayment.LGS_FAMI).toBe(LgsType.FAMIC2C);
            expect(CvscomPayment.LGS_HILIFE).toBe(LgsType.HILIFEC2C);
            expect(CvscomPayment.LGS_OK).toBe(LgsType.OKMARTC2C);
            expect(CvscomPayment.LGS_UNIMART).toBe(LgsType.UNIMARTC2C);
        });
    });

    describe("setLgsType", () => {
        it("應該正確設定物流類型", () => {
            payment.setLgsType(LgsType.FAMIC2C);
            expect(payment.getRawContent()["LgsType"]).toBe(LgsType.FAMIC2C);
        });
    });

    describe("setReceiverName", () => {
        it("應該正確設定取貨人姓名", () => {
            payment.setReceiverName("王小明");
            expect(payment.getRawContent()["CVSCOMName"]).toBe("王小明");
        });

        it("姓名過長應拋出錯誤", () => {
            const longName = "A".repeat(61);
            expect(() => payment.setReceiverName(longName)).toThrow(NewebPayError);
        });
    });

    describe("setReceiverPhone", () => {
        it("應該正確設定取貨人電話", () => {
            payment.setReceiverPhone("0912345678");
            expect(payment.getRawContent()["CVSCOMPhone"]).toBe("0912345678");
        });

        it("電話過長應拋出錯誤", () => {
            const longPhone = "1".repeat(21);
            expect(() => payment.setReceiverPhone(longPhone)).toThrow(NewebPayError);
        });
    });

    describe("validation", () => {
        it("呼叫 validateBaseParams", () => {
            payment.setMerchantOrderNo("ORDER001").setAmt(100).setItemDesc("Desc").setEmail("test@test.com");
            expect(() => payment.getPayload()).not.toThrow();
        });
    });
});
