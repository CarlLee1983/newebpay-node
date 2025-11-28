import { describe, it, expect } from 'vitest';
import { NewebPayService } from '../../../src/frameworks/common/newebpay-service.js';
import type { NewebPayConfig } from '../../../src/frameworks/common/config.js';

describe('NewebPayService', () => {
  const config: NewebPayConfig = {
    merchantId: 'MS12345678',
    hashKey: '12345678901234567890123456789012',
    hashIV: '1234567890123456',
    testMode: true,
  };

  describe('payment', () => {
    it('應該返回 PaymentBuilder 實例', () => {
      const service = new NewebPayService(config);
      const builder = service.payment('ORDER001', 1000, '商品', 'test@example.com');

      expect(builder).toBeDefined();
      const params = builder.creditCard().getParams();
      expect(params.fields.MerchantID).toBe(config.merchantId);
    });
  });

  describe('支付方式方法', () => {
    it('credit 應該返回 CreditPayment', () => {
      const service = new NewebPayService(config);
      const payment = service.credit();

      expect(payment.get('CREDIT')).toBe(1);
      expect(payment.isTestMode()).toBe(true);
    });

    it('atm 應該返回 AtmPayment', () => {
      const service = new NewebPayService(config);
      const payment = service.atm();

      expect(payment.get('VACC')).toBe(1);
    });

    it('cvs 應該返回 CvsPayment', () => {
      const service = new NewebPayService(config);
      const payment = service.cvs();

      expect(payment.get('CVS')).toBe(1);
    });
  });

  describe('查詢方法', () => {
    it('queryOrder 應該返回 QueryOrder', () => {
      const service = new NewebPayService(config);
      const query = service.queryOrder();

      expect(query.getApiUrl()).toContain('QueryTradeInfo');
      expect(query.getApiUrl()).toContain('ccore.newebpay.com'); // 測試環境
    });

    it('queryCreditDetail 應該返回 QueryCreditDetail', () => {
      const service = new NewebPayService(config);
      const query = service.queryCreditDetail();

      expect(query.getApiUrl()).toContain('QueryTradeInfo');
      expect(query.getApiUrl()).toContain('ccore.newebpay.com'); // 測試環境
    });
  });

  describe('動作方法', () => {
    it('creditClose 應該返回 CreditClose', () => {
      const service = new NewebPayService(config);
      const creditClose = service.creditClose();

      expect(creditClose.getApiUrl()).toContain('Close');
    });

    it('creditCancel 應該返回 CreditCancel', () => {
      const service = new NewebPayService(config);
      const creditCancel = service.creditCancel();

      expect(creditCancel.getApiUrl()).toContain('Cancel');
    });
  });
});

