/**
 * 信用卡一次付清範例
 *
 * 使用方式：
 * npx ts-node examples/credit-payment.ts
 */

import { CreditPayment, FormBuilder } from '../src/index.js';

// 設定（請替換為您的實際設定）
const config = {
  merchantId: 'MS12345678',
  hashKey: '12345678901234567890123456789012',
  hashIV: '1234567890123456',
};

// 建立信用卡付款
const payment = new CreditPayment(
  config.merchantId,
  config.hashKey,
  config.hashIV
)
  .setTestMode(true) // 測試環境
  .setMerchantOrderNo('ORDER' + Date.now()) // 訂單編號
  .setAmt(1000) // 金額
  .setItemDesc('測試商品') // 商品描述
  .setEmail('buyer@example.com') // 買家 Email
  .setReturnURL('https://your-site.com/return') // 付款完成返回網址
  .setNotifyURL('https://your-site.com/notify'); // 付款結果通知網址

// 顯示設定資訊
console.log('=== 信用卡付款範例 ===\n');
console.log('API 網址:', payment.getApiUrl());
console.log('\n加密前資料:');
console.log(JSON.stringify(payment.getPayload(), null, 2));

// 取得加密後的內容
const content = payment.getContent();
console.log('\n加密後資料:');
console.log(JSON.stringify(content, null, 2));

// 產生表單
const form = FormBuilder.create(payment).build();
console.log('\n產生的 HTML 表單:');
console.log(form);

// 取得表單資料（供前端 API 使用）
const formData = FormBuilder.create(payment).getFormData();
console.log('\n表單資料（供前端 API）:');
console.log(JSON.stringify(formData, null, 2));

