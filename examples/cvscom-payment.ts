/**
 * 超商取貨付款範例
 *
 * 使用方式：
 * npx ts-node examples/cvscom-payment.ts
 */

import { CvscomPayment, LgsType, FormBuilder } from '../src/index.js'

// 設定（請替換為您的實際設定）
const config = {
  merchantId: 'MS12345678',
  hashKey: '12345678901234567890123456789012',
  hashIV: '1234567890123456',
}

// 建立超商取貨付款
const payment = new CvscomPayment(config.merchantId, config.hashKey, config.hashIV)
  .setTestMode(true) // 測試環境
  .setMerchantOrderNo('CVSCOM' + Date.now()) // 訂單編號
  .setAmt(500) // 金額
  .setItemDesc('超商取貨商品') // 商品描述
  .setEmail('buyer@example.com') // 買家 Email
  .setLgsType(LgsType.UNIMARTC2C) // 統一超商
  .setReceiverName('王小明') // 取貨人姓名
  .setReceiverPhone('0912345678') // 取貨人電話
  .setReturnURL('https://your-site.com/return') // 付款完成返回網址
  .setNotifyURL('https://your-site.com/notify') // 付款結果通知網址

// 顯示設定資訊
console.log('=== 超商取貨付款範例 ===\n')
console.log('API 網址:', payment.getApiUrl())
console.log('\n支援的物流類型:')
console.log('- FAMIC2C (全家)')
console.log('- HILIFEC2C (萊爾富)')
console.log('- OKMARTC2C (OK)')
console.log('- UNIMARTC2C (統一)')

console.log('\n加密前資料:')
console.log(JSON.stringify(payment.getPayload(), null, 2))

// 取得加密後的內容
const content = payment.getContent()
console.log('\n加密後資料:')
console.log(JSON.stringify(content, null, 2))

// 產生表單
const form = FormBuilder.create(payment).build()
console.log('\n產生的 HTML 表單:')
console.log(form)
