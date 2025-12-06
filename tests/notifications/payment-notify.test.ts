import { describe, it, expect, beforeEach, vi } from "vitest";
import { PaymentNotify } from "../../src/notifications/payment-notify.js";
import { Aes256Encoder } from "../../src/infrastructure/aes256-encoder.js";
import { CheckValueEncoder } from "../../src/infrastructure/check-value-encoder.js";
import { NewebPayError } from "../../src/errors/newebpay-error.js";

describe("PaymentNotify", () => {
  const hashKey = "12345678901234567890123456789012";
  const hashIV = "1234567890123456";

  let notify: PaymentNotify;
  let aesEncoder: Aes256Encoder;
  let checkValueEncoder: CheckValueEncoder;

  beforeEach(() => {
    notify = new PaymentNotify(hashKey, hashIV);
    aesEncoder = new Aes256Encoder(hashKey, hashIV);
    checkValueEncoder = new CheckValueEncoder(hashKey, hashIV);
  });

  /**
   * 建立模擬的通知資料
   */
  function createMockNotifyData(data: Record<string, unknown>) {
    const tradeInfo = aesEncoder.encrypt(data);
    const tradeSha = checkValueEncoder.generate(tradeInfo);

    return {
      Status: "SUCCESS",
      MerchantID: "MS12345678",
      TradeInfo: tradeInfo,
      TradeSha: tradeSha,
      Version: "2.0",
    };
  }

  describe("建構函式", () => {
    it("使用靜態方法建立實例", () => {
      const instance = PaymentNotify.create(hashKey, hashIV);
      expect(instance).toBeInstanceOf(PaymentNotify);
    });
  });

  describe("verify", () => {
    it("缺少 TradeInfo 應回傳 false", () => {
      const result = notify.verify({ TradeSha: "some_value" });
      expect(result).toBe(false);
    });

    it("缺少 TradeSha 應回傳 false", () => {
      const result = notify.verify({ TradeInfo: "some_value" });
      expect(result).toBe(false);
    });

    it("TradeSha 驗證失敗應回傳 false", () => {
      const mockData = createMockNotifyData({
        Status: "SUCCESS",
        Message: "授權成功",
      });
      mockData.TradeSha = "wrong_value";

      const result = notify.verify(mockData);
      expect(result).toBe(false);
    });

    it("有效的通知資料應回傳 true", () => {
      const mockData = createMockNotifyData({
        Status: "SUCCESS",
        Message: "授權成功",
        MerchantID: "MS12345678",
      });

      const result = notify.verify(mockData);
      expect(result).toBe(true);
    });
  });

  describe("verifyOrFail", () => {
    it("驗證失敗應拋出 NewebPayError", () => {
      expect(() =>
        notify.verifyOrFail({ TradeInfo: "invalid", TradeSha: "invalid" }),
      ).toThrow(NewebPayError);
    });

    it("驗證成功應返回 this", () => {
      const mockData = createMockNotifyData({
        Status: "SUCCESS",
        Message: "授權成功",
      });

      const result = notify.verifyOrFail(mockData);
      expect(result).toBe(notify);
    });
  });

  describe("getter 方法", () => {
    beforeEach(() => {
      const mockData = createMockNotifyData({
        Status: "SUCCESS",
        Message: "授權成功",
        MerchantID: "MS12345678",
      });
      notify.verify(mockData);
    });

    it("isSuccess 應回傳正確的值", () => {
      expect(notify.isSuccess()).toBe(true);
    });

    it("getStatus 應回傳狀態", () => {
      expect(notify.getStatus()).toBe("SUCCESS");
    });

    it("getMessage 應回傳訊息", () => {
      expect(notify.getMessage()).toBe("授權成功");
    });

    it("getMerchantID 應回傳特店編號", () => {
      expect(notify.getMerchantID()).toBe("MS12345678");
    });

    it("isVerified 應回傳 true", () => {
      expect(notify.isVerified()).toBe(true);
    });

    it("getRawData 應回傳原始資料", () => {
      expect(notify.getRawData()).toBeDefined();
      expect(notify.getRawData().Status).toBe("SUCCESS");
    });

    it("getData 應回傳解密後的資料", () => {
      expect(notify.getData()).toBeDefined();
      expect(notify.getData().Status).toBe("SUCCESS");
    });
  });

  describe("詳細交易資料 Getter", () => {
    beforeEach(() => {
      const resultData = {
        MerchantID: "MS12345678",
        Amt: 100,
        TradeNo: "202312010001",
        MerchantOrderNo: "ORD20231201",
        PaymentType: "CREDIT",
        RespondType: "JSON",
        PayTime: "2023-12-01 12:00:00",
        IP: "127.0.0.1",
        EscrowBank: "HNCB",
        AuthBank: "National",
        RespondCode: "00",
        Auth: "123456",
        Card6No: "400022",
        Card4No: "1111",
        Inst: 3,
        InstFirst: 34,
        InstEach: 33,
        ECI: "05",
        TokenUseStatus: 0,
        Redeem: 0,
        PayBankCode: "808",
        PayerAccount5Code: "12345",
        CodeNo: "123",
        Barcode_1: "ABC",
        Barcode_2: "DEF",
        Barcode_3: "GHI",
        StoreType: 1,
        StoreID: "S123",
        StoreName: "Store",
        StoreAddr: "Addr",
        TradeType: 1,
        StoreMsg: "Msg",
        CVSCOMName: "CVS",
        CVSCOMPhone: "0912345678",
        LgsType: "B2C",
        LgsNo: "LGS123",
      };

      const mockData = createMockNotifyData({
        Status: "SUCCESS",
        Message: "授權成功",
        MerchantID: "MS12345678",
        Result: JSON.stringify(resultData)
      });

      notify.verify(mockData);
    });

    it("應該正確解析並回傳各項交易資料", () => {
      expect(notify.getMerchantOrderNo()).toBe("ORD20231201");
      expect(notify.getTradeNo()).toBe("202312010001");
      expect(notify.getAmt()).toBe(100);
      expect(notify.getPaymentType()).toBe("CREDIT");
      expect(notify.getPayTime()).toBe("2023-12-01 12:00:00");
      expect(notify.getIP()).toBe("127.0.0.1");
      expect(notify.getPayBankCode()).toBe("808");
      expect(notify.getAuthCode()).toBe("123456");
      expect(notify.getCard4No()).toBe("1111");
      expect(notify.getCard6No()).toBe("400022");
      expect(notify.getECI()).toBe("05");
      expect(notify.getInst()).toBe(3);
      expect(notify.getInstFirst()).toBe(34);
      expect(notify.getInstEach()).toBe(33);
    });
  });

  describe("Result 解析失敗處理", () => {
    it("當 Result 不是 JSON 字串時應保留原始值", () => {
      const mockData = createMockNotifyData({
        Status: "SUCCESS",
        Result: "Not a JSON string"
      });

      notify.verify(mockData);
      expect(notify.getData().Result).toBe("Not a JSON string");
      expect(notify.getMerchantOrderNo()).toBe("");
    });
  });

  describe("解密失敗處理", () => {
    it("解密拋出錯誤時應回傳 false", () => {
      // Mock decrypt to throw
      vi.spyOn(aesEncoder, "decrypt").mockImplementationOnce(() => {
        throw new Error("Decrypt failed");
      });

      // Re-inject mocked encoder into notify instance (since private, we rely on verify using the same logic or verify calling public decrypt if we could mock prototype. 
      // But here we instantiated real Aes256Encoder in beforeEach. 
      // To spy on private member usage, we might need to spy on Aes256Encoder.prototype or just pass bad data that causes decrypt fail of real encoder? 
      // Real encoder decrypt fails if format bad.

      const badData = {
        TradeInfo: "InvalidHex",
        TradeSha: checkValueEncoder.generate("InvalidHex") // pass verify check sha
      };

      expect(notify.verify(badData as any)).toBe(false);
    });
  });

  describe("未驗證狀態", () => {
    it("isVerified 應回傳 false", () => {
      expect(notify.isVerified()).toBe(false);
    });

    it("getter 方法應回傳預設值", () => {
      expect(notify.getStatus()).toBe("");
      expect(notify.getMessage()).toBe("");
      expect(notify.getMerchantID()).toBe("");
    });
  });
});
