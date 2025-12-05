import { describe, it, expect, beforeEach } from "vitest";
import { QueryOrder } from "../../src/queries/query-order.js";

describe("QueryOrder", () => {
  const merchantId = "MS12345678";
  const hashKey = "12345678901234567890123456789012";
  const hashIV = "1234567890123456";

  let queryOrder: QueryOrder;

  beforeEach(() => {
    queryOrder = new QueryOrder(merchantId, hashKey, hashIV);
  });

  describe("建構函式", () => {
    it("使用靜態方法建立實例", () => {
      const instance = QueryOrder.create(merchantId, hashKey, hashIV);
      expect(instance).toBeInstanceOf(QueryOrder);
    });
  });

  describe("setTestMode", () => {
    it("應該正確設定測試模式", () => {
      queryOrder.setTestMode(true);
      expect(queryOrder.getApiUrl()).toContain("ccore.newebpay.com");

      queryOrder.setTestMode(false);
      expect(queryOrder.getApiUrl()).toContain("core.newebpay.com");
    });
  });

  describe("getApiUrl", () => {
    it("測試模式應返回測試環境網址", () => {
      queryOrder.setTestMode(true);
      expect(queryOrder.getApiUrl()).toBe(
        "https://ccore.newebpay.com/API/QueryTradeInfo",
      );
    });

    it("正式模式應返回正式環境網址", () => {
      queryOrder.setTestMode(false);
      expect(queryOrder.getApiUrl()).toBe(
        "https://core.newebpay.com/API/QueryTradeInfo",
      );
    });
  });

  describe("鏈式呼叫", () => {
    it("setTestMode 應支援鏈式呼叫", () => {
      const result = queryOrder.setTestMode(true);
      expect(result).toBe(queryOrder);
    });
  });
});
