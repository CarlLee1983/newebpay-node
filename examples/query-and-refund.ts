/**
 * 交易查詢與退款範例
 *
 * 注意：此範例需要實際的訂單編號才能正常運作
 *
 * 使用方式：
 * npx ts-node examples/query-and-refund.ts
 */

import {
  QueryOrder,
  QueryCreditDetail,
  CreditClose,
  CreditCancel,
  EWalletRefund,
} from '../src/index.js'

// 設定（請替換為您的實際設定）
const config = {
  merchantId: 'MS12345678',
  hashKey: '12345678901234567890123456789012',
  hashIV: '1234567890123456',
}

// 範例訂單資料（請替換為實際的訂單資料）
const orderData = {
  merchantOrderNo: 'ORDER123456',
  amt: 1000,
}

// === 交易查詢 ===
console.log('=== 交易查詢範例 ===\n')

const queryOrder = QueryOrder.create(config.merchantId, config.hashKey, config.hashIV).setTestMode(
  true,
)

console.log('查詢 API 網址:', queryOrder.getApiUrl())
console.log('訂單編號:', orderData.merchantOrderNo)
console.log('金額:', orderData.amt)

// 注意：實際查詢需要有效的訂單
// try {
//   const result = await queryOrder.query(orderData.merchantOrderNo, orderData.amt);
//   console.log('查詢結果:', result);
// } catch (error) {
//   console.error('查詢失敗:', error.message);
// }

// === 信用卡明細查詢 ===
console.log('\n=== 信用卡明細查詢範例 ===\n')

const queryCreditDetail = QueryCreditDetail.create(
  config.merchantId,
  config.hashKey,
  config.hashIV,
).setTestMode(true)

console.log('查詢 API 網址:', queryCreditDetail.getApiUrl())

// 注意：實際查詢需要有效的訂單
// try {
//   const result = await queryCreditDetail.query(orderData.merchantOrderNo, orderData.amt);
//   console.log('查詢結果:', result);
// } catch (error) {
//   console.error('查詢失敗:', error.message);
// }

// === 信用卡退款 ===
console.log('\n=== 信用卡退款範例 ===\n')

const creditClose = CreditClose.create(
  config.merchantId,
  config.hashKey,
  config.hashIV,
).setTestMode(true)

console.log('退款 API 網址:', creditClose.getApiUrl())
console.log('CLOSE_TYPE_PAY:', CreditClose.CLOSE_TYPE_PAY)
console.log('CLOSE_TYPE_REFUND:', CreditClose.CLOSE_TYPE_REFUND)

// 退款範例（需要有效的已付款訂單）
// try {
//   const result = await creditClose.refund(orderData.merchantOrderNo, 500);
//   console.log('退款結果:', result);
// } catch (error) {
//   console.error('退款失敗:', error.message);
// }

// 請款範例（需要有效的已授權訂單）
// try {
//   const result = await creditClose.pay(orderData.merchantOrderNo, orderData.amt);
//   console.log('請款結果:', result);
// } catch (error) {
//   console.error('請款失敗:', error.message);
// }

// === 取消授權 ===
console.log('\n=== 取消授權範例 ===\n')

const creditCancel = CreditCancel.create(
  config.merchantId,
  config.hashKey,
  config.hashIV,
).setTestMode(true)

console.log('取消授權 API 網址:', creditCancel.getApiUrl())

// 取消授權範例（需要有效的已授權但未請款訂單）
// try {
//   const result = await creditCancel.cancel(orderData.merchantOrderNo, orderData.amt);
//   console.log('取消授權結果:', result);
// } catch (error) {
//   console.error('取消授權失敗:', error.message);
// }

// === 電子錢包退款 ===
console.log('\n=== 電子錢包退款範例 ===\n')

const ewalletRefund = EWalletRefund.create(
  config.merchantId,
  config.hashKey,
  config.hashIV,
).setTestMode(true)

console.log('電子錢包退款 API 網址:', ewalletRefund.getApiUrl())

// 電子錢包退款範例（需要有效的已付款訂單）
// try {
//   const result = await ewalletRefund.refund(orderData.merchantOrderNo, 500, 'LINEPAY');
//   console.log('退款結果:', result);
// } catch (error) {
//   console.error('退款失敗:', error.message);
// }

console.log('\n注意：上述 API 呼叫已註解，因為需要實際的訂單資料才能正常運作。')
console.log('請在實際使用時取消註解並替換為您的訂單資料。')
