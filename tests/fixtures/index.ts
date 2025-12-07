import { Aes256Encoder } from '../../src/infrastructure/aes256-encoder.js'
import { CheckValueEncoder } from '../../src/infrastructure/check-value-encoder.js'

export const TEST_CONFIG = {
  merchantId: 'MS12345678',
  hashKey: '12345678901234567890123456789012',
  hashIV: '1234567890123456', // 16 chars
}

/**
 * 模擬 NewebPay 回調 Payload
 */
export function createMockCallbackPayload(data: Record<string, unknown>) {
  const aes = new Aes256Encoder(TEST_CONFIG.hashKey, TEST_CONFIG.hashIV)
  const sha = new CheckValueEncoder(TEST_CONFIG.hashKey, TEST_CONFIG.hashIV)

  const tradeInfo = aes.encrypt(data)
  const tradeSha = sha.generate(tradeInfo)

  return {
    TradeInfo: tradeInfo,
    TradeSha: tradeSha,
  }
}

export const MOCK_PAYMENT_DATA = {
  Status: 'SUCCESS',
  Message: '授權成功',
  MerchantID: TEST_CONFIG.merchantId,
  Amt: 100,
  TradeNo: '2301010000001',
  MerchantOrderNo: 'ORD12345678',
  PaymentType: 'CREDIT',
  RespondType: 'JSON',
  PayTime: '2023-01-01 12:00:00',
  IP: '127.0.0.1',
  EscrowBank: 'HNCB',
  AuthBank: 'HNCB',
  RespondCode: '00',
  Auth: '123456',
  Card6No: '400022',
  Card4No: '1111',
  Exp: '2301',
  TokenUseStatus: 0,
  InstFirst: 100,
  InstEach: 0,
  Inst: 0,
  ECI: '',
}
