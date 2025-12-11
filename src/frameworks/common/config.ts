/**
 * 藍新金流設定介面
 */
export interface NewebPayConfig {
  merchantId: string;
  hashKey: string;
  hashIV: string;
  testMode?: boolean;
  returnUrl?: string;
  notifyUrl?: string;
  customerUrl?: string;
  clientBackUrl?: string;
}

/**
 * 環境變數設定介面
 */
export interface NewebPayEnvConfig {
  NEWEBPAY_MERCHANT_ID?: string;
  NEWEBPAY_HASH_KEY?: string;
  NEWEBPAY_HASH_IV?: string;
  NEWEBPAY_TEST_MODE?: string;
  NEWEBPAY_RETURN_URL?: string;
  NEWEBPAY_NOTIFY_URL?: string;
  NEWEBPAY_CUSTOMER_URL?: string;
  NEWEBPAY_CLIENT_BACK_URL?: string;
}

/**
 * 從環境變數載入設定
 */
export function loadConfigFromEnv(env?: NewebPayEnvConfig): NewebPayConfig {
  const processEnv = env ?? (process.env as NewebPayEnvConfig);

  const config: NewebPayConfig = {
    merchantId: processEnv.NEWEBPAY_MERCHANT_ID ?? '',
    hashKey: processEnv.NEWEBPAY_HASH_KEY ?? '',
    hashIV: processEnv.NEWEBPAY_HASH_IV ?? '',
    testMode: processEnv.NEWEBPAY_TEST_MODE === 'true' || processEnv.NEWEBPAY_TEST_MODE === '1',
  };

  if (processEnv.NEWEBPAY_RETURN_URL) {
    config.returnUrl = processEnv.NEWEBPAY_RETURN_URL;
  }

  if (processEnv.NEWEBPAY_NOTIFY_URL) {
    config.notifyUrl = processEnv.NEWEBPAY_NOTIFY_URL;
  }

  if (processEnv.NEWEBPAY_CUSTOMER_URL) {
    config.customerUrl = processEnv.NEWEBPAY_CUSTOMER_URL;
  }

  if (processEnv.NEWEBPAY_CLIENT_BACK_URL) {
    config.clientBackUrl = processEnv.NEWEBPAY_CLIENT_BACK_URL;
  }

  return config;
}
