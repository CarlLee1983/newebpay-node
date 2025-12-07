/**
 * 全支付方式範例
 *
 * 使用方式：
 * npx ts-node examples/all-in-one-payment.ts
 */

import { AllInOnePayment, FormBuilder } from '../src/index.js'

// 設定（請替換為您的實際設定）
const config = {
  merchantId: 'MS12345678',
  hashKey: '12345678901234567890123456789012',
  hashIV: '1234567890123456',
}

// 建立全支付方式付款
const payment = new AllInOnePayment(config.merchantId, config.hashKey, config.hashIV)
  .setTestMode(true) // 測試環境
  .setMerchantOrderNo('ALL' + Date.now()) // 訂單編號
  .setAmt(1000) // 金額
  .setItemDesc('多元支付測試') // 商品描述
  .setEmail('buyer@example.com') // 買家 Email
  .setReturnURL('https://your-site.com/return') // 付款完成返回網址
  .setNotifyURL('https://your-site.com/notify') // 付款結果通知網址
  // 啟用多種支付方式
  .enableCredit() // 啟用信用卡
  .enableAtm() // 啟用 ATM
  .enableCvs() // 啟用超商代碼
  .enableBarcode() // 啟用超商條碼
  .enableLinePay() // 啟用 LINE Pay
  .enableTaiwanPay() // 啟用台灣 Pay
  .enableInstallment([3, 6, 12]) // 啟用信用卡分期
  .enableRedeem() // 啟用紅利折抵

// 顯示設定資訊
console.log('=== 全支付方式範例 ===\n')
console.log('API 網址:', payment.getApiUrl())
console.log('\n加密前資料:')
console.log(JSON.stringify(payment.getPayload(), null, 2))

// 取得加密後的內容
const content = payment.getContent()
console.log('\n加密後資料:')
console.log(JSON.stringify(content, null, 2))

// 產生表單（手動送出）
const form = FormBuilder.create(payment, {
  autoSubmit: false,
  submitButtonText: '前往付款',
  formId: 'payment-form',
}).build()

console.log('\n產生的 HTML 表單（手動送出）:')
console.log(form)
