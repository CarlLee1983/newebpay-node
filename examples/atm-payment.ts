/**
 * ATM 虛擬帳號付款範例
 *
 * 使用方式：
 * npx ts-node examples/atm-payment.ts
 */

import { AtmPayment, BankType, FormBuilder } from '../src/index.js';

// 設定（請替換為您的實際設定）
const config = {
  merchantId: 'MS12345678',
  hashKey: '12345678901234567890123456789012',
  hashIV: '1234567890123456',
};

// 計算繳費期限（7 天後）
const expireDate = new Date();
expireDate.setDate(expireDate.getDate() + 7);
const expireDateStr = expireDate.toISOString().split('T')[0];

// 建立 ATM 付款
const payment = new AtmPayment(
  config.merchantId,
  config.hashKey,
  config.hashIV
)
  .setTestMode(true) // 測試環境
  .setMerchantOrderNo('ATM' + Date.now()) // 訂單編號
  .setAmt(2000) // 金額
  .setItemDesc('ATM 轉帳測試') // 商品描述
  .setEmail('buyer@example.com') // 買家 Email
  .setExpireDate(expireDateStr ?? '') // 繳費期限
  .setBankType(BankType.BOT) // 指定銀行（台灣銀行）
  .setReturnURL('https://your-site.com/return') // 付款完成返回網址
  .setNotifyURL('https://your-site.com/notify') // 付款結果通知網址
  .setCustomerURL('https://your-site.com/customer'); // 取號完成返回網址

// 顯示設定資訊
console.log('=== ATM 虛擬帳號付款範例 ===\n');
console.log('API 網址:', payment.getApiUrl());
console.log('繳費期限:', expireDateStr);
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

