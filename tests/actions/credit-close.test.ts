import { describe, it, expect, beforeEach } from 'vitest';
import { CreditClose } from '../../src/actions/credit-close.js';
import { CloseType, IndexType } from '../../src/types/parameters.js';

describe('CreditClose', () => {
  const merchantId = 'MS12345678';
  const hashKey = '12345678901234567890123456789012';
  const hashIV = '1234567890123456';

  let creditClose: CreditClose;

  beforeEach(() => {
    creditClose = new CreditClose(merchantId, hashKey, hashIV);
  });

  describe('建構函式', () => {
    it('使用靜態方法建立實例', () => {
      const instance = CreditClose.create(merchantId, hashKey, hashIV);
      expect(instance).toBeInstanceOf(CreditClose);
    });
  });

  describe('常數', () => {
    it('CLOSE_TYPE_PAY 應該等於 CloseType.PAY', () => {
      expect(CreditClose.CLOSE_TYPE_PAY).toBe(CloseType.PAY);
    });

    it('CLOSE_TYPE_REFUND 應該等於 CloseType.REFUND', () => {
      expect(CreditClose.CLOSE_TYPE_REFUND).toBe(CloseType.REFUND);
    });
  });

  describe('setTestMode', () => {
    it('應該正確設定測試模式', () => {
      creditClose.setTestMode(true);
      expect(creditClose.getApiUrl()).toContain('ccore.newebpay.com');

      creditClose.setTestMode(false);
      expect(creditClose.getApiUrl()).toContain('core.newebpay.com');
    });
  });

  describe('getApiUrl', () => {
    it('測試模式應返回測試環境網址', () => {
      creditClose.setTestMode(true);
      expect(creditClose.getApiUrl()).toBe(
        'https://ccore.newebpay.com/API/CreditCard/Close'
      );
    });

    it('正式模式應返回正式環境網址', () => {
      creditClose.setTestMode(false);
      expect(creditClose.getApiUrl()).toBe(
        'https://core.newebpay.com/API/CreditCard/Close'
      );
    });
  });

  describe('IndexType', () => {
    it('應該正確使用 IndexType 列舉', () => {
      expect(IndexType.TRADE_NO).toBe('1');
      expect(IndexType.MERCHANT_ORDER_NO).toBe('2');
    });
  });
});

