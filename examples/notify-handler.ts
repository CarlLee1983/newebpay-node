/**
 * 通知處理範例
 *
 * 此範例展示如何處理藍新金流的各種通知
 */

import {
  PaymentNotify,
  AtmNotify,
  CvsNotify,
  Aes256Encoder,
  CheckValueEncoder,
} from '../src/index.js'

// 設定（請替換為您的實際設定）
const config = {
  hashKey: '12345678901234567890123456789012',
  hashIV: '1234567890123456',
}

/**
 * 模擬建立通知資料（實際使用時由藍新金流 POST 傳入）
 */
function createMockNotifyData(data: Record<string, unknown>) {
  const aesEncoder = new Aes256Encoder(config.hashKey, config.hashIV)
  const checkValueEncoder = new CheckValueEncoder(config.hashKey, config.hashIV)

  const tradeInfo = aesEncoder.encrypt(data)
  const tradeSha = checkValueEncoder.generate(tradeInfo)

  return {
    Status: 'SUCCESS',
    MerchantID: 'MS12345678',
    TradeInfo: tradeInfo,
    TradeSha: tradeSha,
    Version: '2.0',
  }
}

// === 支付完成通知處理 ===
console.log('=== 支付完成通知處理範例 ===\n')

const paymentNotifyData = createMockNotifyData({
  Status: 'SUCCESS',
  Message: '授權成功',
  MerchantID: 'MS12345678',
  Result: JSON.stringify({
    MerchantOrderNo: 'ORDER123456',
    TradeNo: 'TN123456789',
    Amt: 1000,
    PaymentType: 'CREDIT',
    PayTime: '2025-01-15 12:30:00',
    IP: '192.168.1.1',
    Auth: '123456',
    Card4No: '1234',
    Card6No: '400022',
    ECI: '5',
  }),
})

const paymentNotify = new PaymentNotify(config.hashKey, config.hashIV)

if (paymentNotify.verify(paymentNotifyData)) {
  console.log('驗證成功！')
  console.log('狀態:', paymentNotify.getStatus())
  console.log('訊息:', paymentNotify.getMessage())
  console.log('是否成功:', paymentNotify.isSuccess())
  console.log('訂單編號:', paymentNotify.getMerchantOrderNo())
  console.log('藍新交易序號:', paymentNotify.getTradeNo())
  console.log('金額:', paymentNotify.getAmt())
  console.log('付款方式:', paymentNotify.getPaymentType())
  console.log('授權碼:', paymentNotify.getAuthCode())
  console.log('卡號末四碼:', paymentNotify.getCard4No())
} else {
  console.log('驗證失敗！')
}

// === ATM 取號通知處理 ===
console.log('\n=== ATM 取號通知處理範例 ===\n')

const atmNotifyData = createMockNotifyData({
  Status: 'SUCCESS',
  Message: '取號成功',
  Result: JSON.stringify({
    MerchantOrderNo: 'ATM123456',
    TradeNo: 'TN987654321',
    Amt: 2000,
    BankCode: '004',
    CodeNo: '12345678901234',
    ExpireDate: '2025-01-22',
    ExpireTime: '23:59:59',
  }),
})

const atmNotify = new AtmNotify(config.hashKey, config.hashIV)

if (atmNotify.verify(atmNotifyData)) {
  console.log('驗證成功！')
  console.log('狀態:', atmNotify.getStatus())
  console.log('訂單編號:', atmNotify.getMerchantOrderNo())
  console.log('銀行代碼:', atmNotify.getBankCode())
  console.log('虛擬帳號:', atmNotify.getCodeNo())
  console.log('繳費截止日:', atmNotify.getExpireDate())
  console.log('繳費截止時間:', atmNotify.getExpireTime())
} else {
  console.log('驗證失敗！')
}

// === 超商取號通知處理 ===
console.log('\n=== 超商取號通知處理範例 ===\n')

const cvsNotifyData = createMockNotifyData({
  Status: 'SUCCESS',
  Message: '取號成功',
  Result: JSON.stringify({
    MerchantOrderNo: 'CVS123456',
    TradeNo: 'TN111222333',
    Amt: 500,
    PaymentType: 'CVS',
    CodeNo: 'ABCD1234567890',
    StoreType: 'SEVEN',
    ExpireDate: '2025-01-22',
    Barcode_1: '1234567890',
    Barcode_2: '0987654321',
    Barcode_3: '1111222233',
  }),
})

const cvsNotify = new CvsNotify(config.hashKey, config.hashIV)

if (cvsNotify.verify(cvsNotifyData)) {
  console.log('驗證成功！')
  console.log('狀態:', cvsNotify.getStatus())
  console.log('訂單編號:', cvsNotify.getMerchantOrderNo())
  console.log('繳費代碼:', cvsNotify.getCodeNo())
  console.log('超商類型:', cvsNotify.getStoreType())
  console.log('繳費截止日:', cvsNotify.getExpireDate())
  console.log('條碼1:', cvsNotify.getBarcode1())
  console.log('條碼2:', cvsNotify.getBarcode2())
  console.log('條碼3:', cvsNotify.getBarcode3())
} else {
  console.log('驗證失敗！')
}

// === 使用 verifyOrFail 的錯誤處理 ===
console.log('\n=== verifyOrFail 錯誤處理範例 ===\n')

try {
  const invalidData = {
    TradeInfo: 'invalid_data',
    TradeSha: 'invalid_sha',
  }

  const notify = new PaymentNotify(config.hashKey, config.hashIV)
  notify.verifyOrFail(invalidData)
} catch (error) {
  console.log('捕獲到錯誤:', (error as Error).message)
}
