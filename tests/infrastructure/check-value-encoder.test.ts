import { describe, it, expect } from 'vitest';
import { CheckValueEncoder } from '../../src/infrastructure/check-value-encoder.js';
import { NewebPayError } from '../../src/errors/newebpay-error.js';

describe('CheckValueEncoder', () => {
  const hashKey = '12345678901234567890123456789012';
  const hashIV = '1234567890123456';

  describe('generate', () => {
    it('應該產生大寫的 SHA256 雜湊值', () => {
      const encoder = new CheckValueEncoder(hashKey, hashIV);
      const tradeInfo = 'test_trade_info';

      const checkValue = encoder.generate(tradeInfo);

      expect(checkValue).toBeDefined();
      expect(typeof checkValue).toBe('string');
      expect(checkValue).toBe(checkValue.toUpperCase());
      expect(checkValue.length).toBe(64); // SHA256 產生 64 個字元
    });

    it('相同輸入應產生相同輸出', () => {
      const encoder = new CheckValueEncoder(hashKey, hashIV);
      const tradeInfo = 'consistent_input';

      const result1 = encoder.generate(tradeInfo);
      const result2 = encoder.generate(tradeInfo);

      expect(result1).toBe(result2);
    });

    it('使用靜態方法建立實例', () => {
      const encoder = CheckValueEncoder.create(hashKey, hashIV);

      expect(encoder).toBeInstanceOf(CheckValueEncoder);
    });
  });

  describe('verify', () => {
    it('正確的 TradeSha 應回傳 true', () => {
      const encoder = new CheckValueEncoder(hashKey, hashIV);
      const tradeInfo = 'test_trade_info';
      const tradeSha = encoder.generate(tradeInfo);

      const result = encoder.verify(tradeInfo, tradeSha);

      expect(result).toBe(true);
    });

    it('錯誤的 TradeSha 應回傳 false', () => {
      const encoder = new CheckValueEncoder(hashKey, hashIV);
      const tradeInfo = 'test_trade_info';

      const result = encoder.verify(tradeInfo, 'wrong_value');

      expect(result).toBe(false);
    });

    it('大小寫不敏感驗證', () => {
      const encoder = new CheckValueEncoder(hashKey, hashIV);
      const tradeInfo = 'test_trade_info';
      const tradeSha = encoder.generate(tradeInfo);

      const result = encoder.verify(tradeInfo, tradeSha.toLowerCase());

      expect(result).toBe(true);
    });
  });

  describe('verifyOrFail', () => {
    it('正確的 TradeSha 不應拋出錯誤', () => {
      const encoder = new CheckValueEncoder(hashKey, hashIV);
      const tradeInfo = 'test_trade_info';
      const tradeSha = encoder.generate(tradeInfo);

      expect(() => encoder.verifyOrFail(tradeInfo, tradeSha)).not.toThrow();
    });

    it('錯誤的 TradeSha 應拋出 NewebPayError', () => {
      const encoder = new CheckValueEncoder(hashKey, hashIV);
      const tradeInfo = 'test_trade_info';

      expect(() => encoder.verifyOrFail(tradeInfo, 'wrong_value')).toThrow(
        NewebPayError
      );
    });
  });
});

