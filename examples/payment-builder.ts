/**
 * PaymentBuilder 使用範例
 *
 * 使用方式：
 * npx ts-node examples/payment-builder.ts
 */

import { PaymentBuilder, loadConfigFromEnv } from '../src/frameworks/common/index.js'

// 從環境變數載入設定
const config = loadConfigFromEnv()

// 方式一：基本使用
console.log('=== 方式一：基本使用 ===\n')
const builder1 = new PaymentBuilder(config)
  .setOrder('ORDER001', 1000, '測試商品', 'buyer@example.com')
  .creditCard()

const params1 = builder1.getParams()
console.log('支付參數：', JSON.stringify(params1, null, 2))

// 方式二：信用卡分期
console.log('\n=== 方式二：信用卡分期 ===\n')
const builder2 = new PaymentBuilder(config)
  .setOrder('ORDER002', 3000, '分期商品', 'buyer@example.com')
  .creditInstallment([3, 6, 12])
  .setReturnUrl('https://your-site.com/return')
  .setNotifyUrl('https://your-site.com/notify')

const params2 = builder2.getParams()
console.log('支付參數：', JSON.stringify(params2, null, 2))

// 方式三：ATM 虛擬帳號
console.log('\n=== 方式三：ATM 虛擬帳號 ===\n')
const expireDate = new Date()
expireDate.setDate(expireDate.getDate() + 7)
const expireDateStr = expireDate.toISOString().split('T')[0]

const builder3 = new PaymentBuilder(config)
  .setOrder('ORDER003', 2000, 'ATM 商品', 'buyer@example.com')
  .atm(expireDateStr ?? '')
  .setCustomerUrl('https://your-site.com/customer')

const params3 = builder3.getParams()
console.log('支付參數：', JSON.stringify(params3, null, 2))

// 方式四：自訂設定
console.log('\n=== 方式四：自訂設定 ===\n')
const builder4 = new PaymentBuilder(config)
  .setOrder('ORDER004', 500, '自訂商品', 'buyer@example.com')
  .creditCard()
  .customize((payment) => {
    // 自訂設定
    if ('setRedeem' in payment) {
      ;(payment as { setRedeem: (enable: number) => void }).setRedeem(1)
    }
  })

const params4 = builder4.getParams()
console.log('支付參數：', JSON.stringify(params4, null, 2))
