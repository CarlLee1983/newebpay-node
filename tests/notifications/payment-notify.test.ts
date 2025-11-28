import { describe, it, expect, beforeEach } from 'vitest';
import { PaymentNotify } from '../../src/notifications/payment-notify.js';
import { Aes256Encoder } from '../../src/infrastructure/aes256-encoder.js';
import { CheckValueEncoder } from '../../src/infrastructure/check-value-encoder.js';
import { NewebPayError } from '../../src/errors/newebpay-error.js';

describe('PaymentNotify', () => {
  const hashKey = '12345678901234567890123456789012';
  const hashIV = '1234567890123456';

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
      Status: 'SUCCESS',
      MerchantID: 'MS12345678',
      TradeInfo: tradeInfo,
      TradeSha: tradeSha,
      Version: '2.0',
    };
  }

  describe('建構函式', () => {
    it('使用靜態方法建立實例', () => {
      const instance = PaymentNotify.create(hashKey, hashIV);
      expect(instance).toBeInstanceOf(PaymentNotify);
    });
  });

  describe('verify', () => {
    it('缺少 TradeInfo 應回傳 false', () => {
      const result = notify.verify({ TradeSha: 'some_value' });
      expect(result).toBe(false);
    });

    it('缺少 TradeSha 應回傳 false', () => {
      const result = notify.verify({ TradeInfo: 'some_value' });
      expect(result).toBe(false);
    });

    it('TradeSha 驗證失敗應回傳 false', () => {
      const mockData = createMockNotifyData({
        Status: 'SUCCESS',
        Message: '授權成功',
      });
      mockData.TradeSha = 'wrong_value';

      const result = notify.verify(mockData);
      expect(result).toBe(false);
    });

    it('有效的通知資料應回傳 true', () => {
      const mockData = createMockNotifyData({
        Status: 'SUCCESS',
        Message: '授權成功',
        MerchantID: 'MS12345678',
      });

      const result = notify.verify(mockData);
      expect(result).toBe(true);
    });
  });

  describe('verifyOrFail', () => {
    it('驗證失敗應拋出 NewebPayError', () => {
      expect(() =>
        notify.verifyOrFail({ TradeInfo: 'invalid', TradeSha: 'invalid' })
      ).toThrow(NewebPayError);
    });

    it('驗證成功應返回 this', () => {
      const mockData = createMockNotifyData({
        Status: 'SUCCESS',
        Message: '授權成功',
      });

      const result = notify.verifyOrFail(mockData);
      expect(result).toBe(notify);
    });
  });

  describe('getter 方法', () => {
    beforeEach(() => {
      const mockData = createMockNotifyData({
        Status: 'SUCCESS',
        Message: '授權成功',
        MerchantID: 'MS12345678',
      });
      notify.verify(mockData);
    });

    it('isSuccess 應回傳正確的值', () => {
      expect(notify.isSuccess()).toBe(true);
    });

    it('getStatus 應回傳狀態', () => {
      expect(notify.getStatus()).toBe('SUCCESS');
    });

    it('getMessage 應回傳訊息', () => {
      expect(notify.getMessage()).toBe('授權成功');
    });

    it('getMerchantID 應回傳特店編號', () => {
      expect(notify.getMerchantID()).toBe('MS12345678');
    });

    it('isVerified 應回傳 true', () => {
      expect(notify.isVerified()).toBe(true);
    });
  });

  describe('未驗證狀態', () => {
    it('isVerified 應回傳 false', () => {
      expect(notify.isVerified()).toBe(false);
    });

    it('getter 方法應回傳預設值', () => {
      expect(notify.getStatus()).toBe('');
      expect(notify.getMessage()).toBe('');
      expect(notify.getMerchantID()).toBe('');
    });
  });
});

