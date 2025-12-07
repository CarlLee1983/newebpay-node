/**
 * Express 整合範例
 *
 * 使用方式：
 * npx ts-node examples/express-integration.ts
 */

import express from 'express'
import {
  createNewebPayRouter,
  loadConfigFromEnv,
  NewebPayService,
} from '../src/frameworks/express/index.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 從環境變數載入設定
const config = loadConfigFromEnv()

// 掛載藍新金流路由
app.use('/newebpay', createNewebPayRouter(config))

// 範例：使用 NewebPayService 建立支付
app.post('/api/payment/create', (req, res) => {
  const { orderId, amount, itemDesc, email, paymentType } = req.body

  if (!orderId || !amount || !itemDesc) {
    return res.status(400).json({
      error: 'Missing required fields: orderId, amount, itemDesc',
    })
  }

  const newebpay = new NewebPayService(config)

  // 方式一：使用簡化 API
  const params = newebpay
    .payment(orderId, amount, itemDesc, email ?? '')
    .creditCard()
    .getParams()

  res.json({ success: true, data: params })
})

// 範例：處理支付通知（使用 middleware）
app.post('/api/payment/notify', (req, res) => {
  // 注意：實際使用時應該使用 paymentNotifyMiddleware
  // 這裡只是示範如何處理通知資料
  res.send('OK')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log('\n可用端點：')
  console.log(`  POST http://localhost:${PORT}/newebpay/payment/create`)
  console.log(`  POST http://localhost:${PORT}/newebpay/payment/notify`)
  console.log(`  POST http://localhost:${PORT}/newebpay/atm/notify`)
  console.log(`  POST http://localhost:${PORT}/newebpay/cvs/notify`)
  console.log(`  POST http://localhost:${PORT}/api/payment/create`)
})
