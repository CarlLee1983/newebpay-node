import { describe, it, expect } from 'vitest';
import { loadConfigFromEnv } from '../../../src/frameworks/common/config.js';
import type { NewebPayEnvConfig } from '../../../src/frameworks/common/config.js';

describe('loadConfigFromEnv', () => {
  it('應該從環境變數載入設定', () => {
    const env: NewebPayEnvConfig = {
      NEWEBPAY_MERCHANT_ID: 'MS12345678',
      NEWEBPAY_HASH_KEY: 'hashkey123',
      NEWEBPAY_HASH_IV: 'hashiv123',
      NEWEBPAY_TEST_MODE: 'true',
      NEWEBPAY_RETURN_URL: 'https://example.com/return',
      NEWEBPAY_NOTIFY_URL: 'https://example.com/notify',
    };

    const config = loadConfigFromEnv(env);

    expect(config.merchantId).toBe('MS12345678');
    expect(config.hashKey).toBe('hashkey123');
    expect(config.hashIV).toBe('hashiv123');
    expect(config.testMode).toBe(true);
    expect(config.returnUrl).toBe('https://example.com/return');
    expect(config.notifyUrl).toBe('https://example.com/notify');
  });

  it('testMode 為 false 時應該正確解析', () => {
    const env: NewebPayEnvConfig = {
      NEWEBPAY_MERCHANT_ID: 'MS12345678',
      NEWEBPAY_HASH_KEY: 'hashkey123',
      NEWEBPAY_HASH_IV: 'hashiv123',
      NEWEBPAY_TEST_MODE: 'false',
    };

    const config = loadConfigFromEnv(env);

    expect(config.testMode).toBe(false);
  });

  it('testMode 為 1 時應該解析為 true', () => {
    const env: NewebPayEnvConfig = {
      NEWEBPAY_MERCHANT_ID: 'MS12345678',
      NEWEBPAY_HASH_KEY: 'hashkey123',
      NEWEBPAY_HASH_IV: 'hashiv123',
      NEWEBPAY_TEST_MODE: '1',
    };

    const config = loadConfigFromEnv(env);

    expect(config.testMode).toBe(true);
  });

  it('缺少環境變數時應該使用預設值', () => {
    const env: NewebPayEnvConfig = {};

    const config = loadConfigFromEnv(env);

    expect(config.merchantId).toBe('');
    expect(config.hashKey).toBe('');
    expect(config.hashIV).toBe('');
    expect(config.testMode).toBe(false);
    expect(config.returnUrl).toBeUndefined();
  });
});

