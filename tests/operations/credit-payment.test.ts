import { describe, it, expect, beforeEach } from 'vitest';
import { CreditPayment } from '../../src/operations/credit-payment.js';
import { NewebPayError } from '../../src/errors/newebpay-error.js';

describe('CreditPayment', () => {
  const merchantId = 'MS12345678';
  const hashKey = '12345678901234567890123456789012';
  const hashIV = '1234567890123456';

  let payment: CreditPayment;

  beforeEach(() => {
    payment = new CreditPayment(merchantId, hashKey, hashIV);
  });

  describe('建構函式', () => {
    it('應該正確初始化', () => {
      expect(payment.getMerchantID()).toBe(merchantId);
      expect(payment.isTestMode()).toBe(false);
    });

    it('應該預設啟用信用卡付款', () => {
      const rawContent = payment.getRawContent();
      expect(rawContent['CREDIT']).toBe(1);
    });
  });

  describe('設定方法', () => {
    it('setTestMode 應該正確設定測試模式', () => {
      payment.setTestMode(true);
      expect(payment.isTestMode()).toBe(true);

      payment.setTestMode(false);
      expect(payment.isTestMode()).toBe(false);
    });

    it('setMerchantOrderNo 應該正確設定訂單編號', () => {
      payment.setMerchantOrderNo('ORDER001');
      expect(payment.get('MerchantOrderNo')).toBe('ORDER001');
    });

    it('setMerchantOrderNo 超過最大長度應拋出錯誤', () => {
      const longOrderNo = 'A'.repeat(31);
      expect(() => payment.setMerchantOrderNo(longOrderNo)).toThrow(
        NewebPayError
      );
    });

    it('setAmt 應該正確設定金額', () => {
      payment.setAmt(1000);
      expect(payment.get('Amt')).toBe(1000);
    });

    it('setAmt 金額為 0 應拋出錯誤', () => {
      expect(() => payment.setAmt(0)).toThrow(NewebPayError);
    });

    it('setAmt 金額為負數應拋出錯誤', () => {
      expect(() => payment.setAmt(-100)).toThrow(NewebPayError);
    });

    it('setItemDesc 應該正確設定商品描述', () => {
      payment.setItemDesc('測試商品');
      expect(payment.get('ItemDesc')).toBe('測試商品');
    });

    it('setItemDesc 超過最大長度應拋出錯誤', () => {
      const longDesc = 'A'.repeat(51);
      expect(() => payment.setItemDesc(longDesc)).toThrow(NewebPayError);
    });

    it('setEmail 應該正確設定 Email', () => {
      payment.setEmail('test@example.com');
      expect(payment.get('Email')).toBe('test@example.com');
    });

    it('setEmail 超過最大長度應拋出錯誤', () => {
      const longEmail = 'A'.repeat(51);
      expect(() => payment.setEmail(longEmail)).toThrow(NewebPayError);
    });

    it('setReturnURL 應該正確設定返回網址', () => {
      payment.setReturnURL('https://example.com/return');
      expect(payment.get('ReturnURL')).toBe('https://example.com/return');
    });

    it('setNotifyURL 應該正確設定通知網址', () => {
      payment.setNotifyURL('https://example.com/notify');
      expect(payment.get('NotifyURL')).toBe('https://example.com/notify');
    });

    it('setTradeLimit 應該正確設定交易限制秒數', () => {
      payment.setTradeLimit(300);
      expect(payment.get('TradeLimit')).toBe(300);
    });

    it('setTradeLimit 超出範圍應拋出錯誤', () => {
      expect(() => payment.setTradeLimit(59)).toThrow(NewebPayError);
      expect(() => payment.setTradeLimit(901)).toThrow(NewebPayError);
    });
  });

  describe('信用卡特定設定', () => {
    it('setRedeem 應該正確設定紅利折抵', () => {
      payment.setRedeem(1);
      expect(payment.get('CreditRed')).toBe(1);
    });

    it('setUnionPay 應該正確設定銀聯卡', () => {
      payment.setUnionPay(1);
      expect(payment.get('UNIONPAY')).toBe(1);
    });

    it('setGooglePay 應該正確設定 Google Pay', () => {
      payment.setGooglePay(1);
      expect(payment.get('ANDROIDPAY')).toBe(1);
    });

    it('setSamsungPay 應該正確設定 Samsung Pay', () => {
      payment.setSamsungPay(1);
      expect(payment.get('SAMSUNGPAY')).toBe(1);
    });
  });

  describe('getPayload', () => {
    it('缺少必要欄位應拋出錯誤', () => {
      expect(() => payment.getPayload()).toThrow(NewebPayError);
    });

    it('填寫完整應該返回 payload', () => {
      payment
        .setMerchantOrderNo('ORDER001')
        .setAmt(1000)
        .setItemDesc('測試商品');

      const payload = payment.getPayload();

      expect(payload['MerchantID']).toBe(merchantId);
      expect(payload['MerchantOrderNo']).toBe('ORDER001');
      expect(payload['Amt']).toBe(1000);
      expect(payload['ItemDesc']).toBe('測試商品');
      expect(payload['CREDIT']).toBe(1);
    });
  });

  describe('getContent', () => {
    it('應該返回加密後的內容', () => {
      payment
        .setMerchantOrderNo('ORDER001')
        .setAmt(1000)
        .setItemDesc('測試商品');

      const content = payment.getContent();

      expect(content.MerchantID).toBe(merchantId);
      expect(content.TradeInfo).toBeDefined();
      expect(content.TradeSha).toBeDefined();
      expect(content.Version).toBe('2.0');
    });
  });

  describe('getApiUrl', () => {
    it('測試模式應返回測試環境網址', () => {
      payment.setTestMode(true);
      expect(payment.getApiUrl()).toBe(
        'https://ccore.newebpay.com/MPG/mpg_gateway'
      );
    });

    it('正式模式應返回正式環境網址', () => {
      payment.setTestMode(false);
      expect(payment.getApiUrl()).toBe(
        'https://core.newebpay.com/MPG/mpg_gateway'
      );
    });
  });

  describe('鏈式呼叫', () => {
    it('所有設定方法應支援鏈式呼叫', () => {
      const result = payment
        .setTestMode(true)
        .setMerchantOrderNo('ORDER001')
        .setAmt(1000)
        .setItemDesc('測試商品')
        .setEmail('test@example.com')
        .setReturnURL('https://example.com/return')
        .setNotifyURL('https://example.com/notify')
        .setRedeem(1);

      expect(result).toBe(payment);
    });
  });
});

