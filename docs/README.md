**@carllee1983/newebpay**

---

# 藍新金流 Node.js SDK

[![npm version](https://img.shields.io/npm/v/@carllee1983/newebpay.svg)](https://www.npmjs.com/package/@carllee1983/newebpay)
[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![CI](https://github.com/CarlLee1983/newebpay-node/actions/workflows/ci.yml/badge.svg)](https://github.com/CarlLee1983/newebpay-node/actions/workflows/ci.yml)

> **📖 [English Version](_media/README_EN.md)**

藍新金流（NewebPay）Node.js SDK，提供簡潔易用的 API 整合藍新金流支付服務。

## 功能特色

- ✅ 支援全部支付方式：信用卡、ATM 轉帳、超商代碼/條碼繳費、LINE Pay、台灣 Pay 等
- ✅ 完整的 AES-256-CBC 加解密實作（使用 Node.js 原生 crypto）
- ✅ 支援交易查詢、退款、取消授權
- ✅ 完整的 TypeScript 型別定義
- ✅ ESM 和 CommonJS 雙重支援
- ✅ Node.js 18/20/22 LTS 支援
- ✅ Express、Fastify、Koa 框架整合

## 系統需求

- Node.js 18.0.0 或更高版本（支援 18.x、20.x、22.x LTS）

## 安裝

```bash
npm install @carllee1983/newebpay
```

或使用 yarn / pnpm：

```bash
yarn add @carllee1983/newebpay
# 或
pnpm add @carllee1983/newebpay
```

## 快速開始

### 基本使用

```typescript
import { CreditPayment, FormBuilder } from '@carllee1983/newebpay'

// 建立信用卡付款
const payment = new CreditPayment('特店編號', 'HashKey', 'HashIV')
  .setTestMode(true) // 測試環境
  .setMerchantOrderNo('ORDER' + Date.now()) // 訂單編號
  .setAmt(1000) // 金額
  .setItemDesc('測試商品') // 商品描述
  .setEmail('buyer@example.com') // 買家 Email
  .setReturnURL('https://your-site.com/return') // 付款完成返回網址
  .setNotifyURL('https://your-site.com/notify') // 付款結果通知網址

// 產生 HTML 表單（自動送出）
const form = FormBuilder.create(payment).build()
console.log(form)

// 或取得表單資料供前端使用
const formData = FormBuilder.create(payment).getFormData()
// { action: 'https://...', fields: { MerchantID: '...', TradeInfo: '...', ... } }
```

### Express 整合

```typescript
import express from 'express'
import {
  createNewebPayRouter,
  loadConfigFromEnv,
  NewebPayService,
} from '@carllee1983/newebpay/express'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 從環境變數載入設定
const config = loadConfigFromEnv()

// 方式一：使用內建路由
app.use('/newebpay', createNewebPayRouter(config))

// 方式二：使用 NewebPayService
app.post('/api/payment/create', (req, res) => {
  const { orderId, amount, itemDesc, email } = req.body
  const newebpay = new NewebPayService(config)

  const params = newebpay
    .payment(orderId, amount, itemDesc, email)
    .creditCard()
    .setReturnUrl('https://your-site.com/return')
    .setNotifyUrl('https://your-site.com/notify')
    .getParams()

  res.json({ success: true, data: params })
})

app.listen(3000)
```

環境變數設定：

```bash
# .env
NEWEBPAY_MERCHANT_ID=MS12345678
NEWEBPAY_HASH_KEY=your_hash_key_32_chars
NEWEBPAY_HASH_IV=your_hash_iv_16_chars
NEWEBPAY_RETURN_URL=https://your-site.com/return
NEWEBPAY_NOTIFY_URL=https://your-site.com/notify
NEWEBPAY_TEST_MODE=true
```

## 支援的支付方式

| 支付方式       | 類別                | 說明                  |
| -------------- | ------------------- | --------------------- |
| 信用卡一次付清 | `CreditPayment`     | 支援紅利折抵、銀聯卡  |
| 信用卡分期     | `CreditInstallment` | 3/6/12/18/24/30 期    |
| WebATM         | `WebAtmPayment`     | 即時網路 ATM 轉帳     |
| ATM 轉帳       | `AtmPayment`        | 虛擬帳號轉帳          |
| 超商代碼繳費   | `CvsPayment`        | 金額限制 30~20,000 元 |
| 超商條碼繳費   | `BarcodePayment`    | 金額限制 20~40,000 元 |
| LINE Pay       | `LinePayPayment`    | LINE Pay 電子錢包     |
| 台灣 Pay       | `TaiwanPayPayment`  | 台灣 Pay 行動支付     |
| 玉山 Wallet    | `EsunWalletPayment` | 玉山銀行電子錢包      |
| BitoPay        | `BitoPayPayment`    | 加密貨幣支付          |
| TWQR           | `TwqrPayment`       | TWQR 共通支付         |
| 付啦           | `FulaPayment`       | 先買後付              |
| 超商取貨付款   | `CvscomPayment`     | 超商物流取貨付款      |
| 全支付方式     | `AllInOnePayment`   | 自訂啟用多種支付      |

## 使用範例

### 信用卡分期

```typescript
import { CreditInstallment, FormBuilder } from '@carllee1983/newebpay'

const payment = new CreditInstallment('特店編號', 'HashKey', 'HashIV')
  .setTestMode(true)
  .setMerchantOrderNo('INST' + Date.now())
  .setAmt(3000)
  .setItemDesc('分期商品')
  .setEmail('buyer@example.com')
  .setInstallment([3, 6, 12]) // 提供 3/6/12 期選項
  .setReturnURL('https://your-site.com/return')
  .setNotifyURL('https://your-site.com/notify')

const form = FormBuilder.create(payment).build()
```

### ATM 虛擬帳號

```typescript
import { AtmPayment, BankType, FormBuilder } from '@carllee1983/newebpay'

const payment = new AtmPayment('特店編號', 'HashKey', 'HashIV')
  .setTestMode(true)
  .setMerchantOrderNo('ATM' + Date.now())
  .setAmt(2000)
  .setItemDesc('ATM 轉帳測試')
  .setEmail('buyer@example.com')
  .setExpireDate('2025-12-31') // 繳費期限
  .setBankType(BankType.BOT) // 指定銀行（可選）
  .setReturnURL('https://your-site.com/return')
  .setNotifyURL('https://your-site.com/notify')
  .setCustomerURL('https://your-site.com/customer') // 取號完成返回

const form = FormBuilder.create(payment).build()
```

### 全支付方式（多種支付選項）

```typescript
import { AllInOnePayment, FormBuilder } from '@carllee1983/newebpay'

const payment = new AllInOnePayment('特店編號', 'HashKey', 'HashIV')
  .setTestMode(true)
  .setMerchantOrderNo('ALL' + Date.now())
  .setAmt(1000)
  .setItemDesc('多元支付測試')
  .setEmail('buyer@example.com')
  .setReturnURL('https://your-site.com/return')
  .setNotifyURL('https://your-site.com/notify')
  // 啟用多種支付方式（依需求選擇）
  .enableCredit() // 信用卡一次付清
  .enableWebAtm() // WebATM 即時轉帳
  .enableAtm() // ATM 虛擬帳號
  .enableCvs() // 超商代碼繳費
  .enableBarcode() // 超商條碼繳費
  .enableLinePay() // LINE Pay
  .enableTaiwanPay() // 台灣 Pay
  .enableEsunWallet() // 玉山 Wallet
  .enableBitoPay() // BitoPay 加密貨幣
  .enableTwqr() // TWQR 共通支付
  .enableFula() // 付啦（先買後付）
  .enableInstallment([3, 6, 12]) // 信用卡分期（3/6/12 期）
  .enableRedeem() // 信用卡紅利折抵
  .enableUnionPay() // 銀聯卡

const form = FormBuilder.create(payment).build()
```

#### AllInOnePayment 可用方法

| 方法                        | 說明                           |
| --------------------------- | ------------------------------ |
| `.enableCredit()`           | 啟用信用卡一次付清             |
| `.enableWebAtm()`           | 啟用 WebATM 即時轉帳           |
| `.enableAtm()`              | 啟用 ATM 虛擬帳號轉帳          |
| `.enableCvs()`              | 啟用超商代碼繳費               |
| `.enableBarcode()`          | 啟用超商條碼繳費               |
| `.enableLinePay()`          | 啟用 LINE Pay                  |
| `.enableTaiwanPay()`        | 啟用台灣 Pay                   |
| `.enableEsunWallet()`       | 啟用玉山 Wallet                |
| `.enableBitoPay()`          | 啟用 BitoPay 加密貨幣支付      |
| `.enableTwqr()`             | 啟用 TWQR 共通支付             |
| `.enableFula()`             | 啟用付啦（先買後付）           |
| `.enableInstallment([3,6])` | 啟用信用卡分期（指定可選期數） |
| `.enableRedeem()`           | 啟用信用卡紅利折抵             |
| `.enableUnionPay()`         | 啟用銀聯卡                     |

> 所有 `enable*()` 方法都可傳入 `false` 來停用該支付方式，例如：`.enableCredit(false)`

### 超商取貨付款

```typescript
import { CvscomPayment, LgsType, FormBuilder } from '@carllee1983/newebpay'

const payment = new CvscomPayment('特店編號', 'HashKey', 'HashIV')
  .setTestMode(true)
  .setMerchantOrderNo('CVSCOM' + Date.now())
  .setAmt(500)
  .setItemDesc('超商取貨商品')
  .setEmail('buyer@example.com')
  .setLgsType(LgsType.B2C) // 大宗寄倉
  .setReceiverName('收件人')
  .setReceiverPhone('0912345678')
  .setReceiverEmail('receiver@example.com')
  .setReturnURL('https://your-site.com/return')
  .setNotifyURL('https://your-site.com/notify')

const form = FormBuilder.create(payment).build()
```

## 通知處理

### 付款完成通知

```typescript
import { PaymentNotify } from '@carllee1983/newebpay'

app.post('/payment/notify', (req, res) => {
  const notify = new PaymentNotify('HashKey', 'HashIV')

  try {
    notify.verifyOrFail(req.body)

    if (notify.isSuccess()) {
      const orderNo = notify.getMerchantOrderNo()
      const amount = notify.getAmt()
      const paymentType = notify.getPaymentType()
      const tradeNo = notify.getTradeNo()

      // 更新訂單狀態...
      console.log(`訂單 ${orderNo} 付款成功，金額 ${amount}`)
    }

    res.send('OK')
  } catch (error) {
    console.error('驗證失敗:', error)
    res.status(400).send('Verification failed')
  }
})
```

### ATM 取號通知

```typescript
import { AtmNotify } from '@carllee1983/newebpay'

app.post('/atm/notify', (req, res) => {
  const notify = new AtmNotify('HashKey', 'HashIV')

  if (notify.verify(req.body) && notify.isSuccess()) {
    const orderNo = notify.getMerchantOrderNo()
    const bankCode = notify.getBankCode() // 銀行代碼
    const codeNo = notify.getCodeNo() // 虛擬帳號
    const expireDate = notify.getExpireDate() // 繳費截止日

    // 儲存繳費資訊，通知買家...
    console.log(`ATM 帳號: ${bankCode}-${codeNo}，截止日: ${expireDate}`)
  }

  res.send('OK')
})
```

### 超商取號通知

```typescript
import { CvsNotify } from '@carllee1983/newebpay'

app.post('/cvs/notify', (req, res) => {
  const notify = new CvsNotify('HashKey', 'HashIV')

  if (notify.verify(req.body) && notify.isSuccess()) {
    const codeNo = notify.getCodeNo() // 繳費代碼
    const storeType = notify.getStoreType() // 超商類型
    const expireDate = notify.getExpireDate() // 繳費截止日

    // 條碼繳費資訊
    const barcode1 = notify.getBarcode1()
    const barcode2 = notify.getBarcode2()
    const barcode3 = notify.getBarcode3()

    // 儲存繳費資訊...
  }

  res.send('OK')
})
```

### 超商取貨付款通知

```typescript
import { CvscomNotify } from '@carllee1983/newebpay'

app.post('/cvscom/notify', (req, res) => {
  const notify = new CvscomNotify('HashKey', 'HashIV')

  if (notify.verify(req.body) && notify.isSuccess()) {
    const storeCode = notify.getStoreCode() // 門市代碼
    const storeName = notify.getStoreName() // 門市名稱
    const storeAddr = notify.getStoreAddr() // 門市地址
    const lgsNo = notify.getLgsNo() // 物流編號
    const lgsType = notify.getLgsType() // 物流類型
    const receiverName = notify.getCVSCOMName() // 取貨人姓名

    // 儲存物流資訊...
  }

  res.send('OK')
})
```

## 交易查詢

### 一般交易查詢

```typescript
import { QueryOrder } from '@carllee1983/newebpay'

const query = QueryOrder.create('特店編號', 'HashKey', 'HashIV').setTestMode(true)

try {
  const result = await query.query('ORDER123456', 1000)

  console.log('交易狀態:', result.TradeStatus)
  console.log('付款方式:', result.PaymentType)
  console.log('付款時間:', result.PayTime)
} catch (error) {
  console.error('查詢失敗:', error.message)
}
```

### 信用卡明細查詢

```typescript
import { QueryCreditDetail } from '@carllee1983/newebpay'

const query = QueryCreditDetail.create('特店編號', 'HashKey', 'HashIV').setTestMode(true)

try {
  const result = await query.query('ORDER123456', 1000)

  console.log('請款狀態:', result.CloseStatus)
  console.log('退款狀態:', result.BackStatus)
  console.log('授權碼:', result.Auth)
  console.log('卡號末四碼:', result.Card4No)
} catch (error) {
  console.error('查詢失敗:', error.message)
}
```

## 退款與取消

### 信用卡請款/退款

```typescript
import { CreditClose } from '@carllee1983/newebpay'

const creditClose = CreditClose.create('特店編號', 'HashKey', 'HashIV').setTestMode(true)

// 請款（授權後請款）
const payResult = await creditClose.pay('ORDER123456', 1000)

// 退款
const refundResult = await creditClose.refund('ORDER123456', 500)

// 取消請退款
const cancelResult = await creditClose.cancelClose(
  'ORDER123456',
  500,
  CreditClose.CLOSE_TYPE_REFUND,
)
```

### 取消授權

```typescript
import { CreditCancel } from '@carllee1983/newebpay'

const creditCancel = CreditCancel.create('特店編號', 'HashKey', 'HashIV').setTestMode(true)

const result = await creditCancel.cancel('ORDER123456', 1000)
```

### 電子錢包退款

```typescript
import { EWalletRefund } from '@carllee1983/newebpay'

const refund = EWalletRefund.create('特店編號', 'HashKey', 'HashIV').setTestMode(true)

// 支援 LINE Pay、台灣 Pay、玉山 Wallet 等
const result = await refund.refund('ORDER123456', 500, 'LINEPAY')
```

## 錯誤處理

SDK 提供 `NewebPayError` 類別處理各種錯誤情況：

```typescript
import { CreditPayment, NewebPayError } from '@carllee1983/newebpay'

try {
  const payment = new CreditPayment('特店編號', 'HashKey', 'HashIV')
    .setMerchantOrderNo('ORDER001')
    .setAmt(-100) // 金額錯誤
} catch (error) {
  if (error instanceof NewebPayError) {
    console.log('錯誤代碼:', error.code) // 'INVALID_FIELD'
    console.log('錯誤訊息:', error.message) // 'Amt 無效：金額必須大於 0'
  }
}
```

### 常見錯誤代碼

| 錯誤代碼             | 說明                |
| -------------------- | ------------------- |
| `REQUIRED_FIELD`     | 必填欄位未填寫      |
| `FIELD_TOO_LONG`     | 欄位值超過最大長度  |
| `INVALID_FIELD`      | 欄位值無效          |
| `DECRYPT_FAILED`     | 解密失敗            |
| `CHECK_VALUE_FAILED` | CheckValue 驗證失敗 |
| `API_ERROR`          | API 請求錯誤        |

## CLI 工具

套件提供 CLI 工具協助快速設定：

```bash
# 初始化環境變數設定檔
npx @carllee1983/newebpay init

# 產生 Express 整合範例專案
npx @carllee1983/newebpay express
```

## 測試卡號

| 類型                    | 卡號                | 說明      |
| ----------------------- | ------------------- | --------- |
| 信用卡（一次付清/分期） | 4000-2211-1111-1111 | 一般測試  |
| 紅利折抵                | 4003-5511-1111-1111 | 紅利測試  |
| 美國運通卡              | 3760-000000-00006   | AMEX 測試 |

> 測試卡號的有效月年及卡片背面末三碼可任意填寫。

## API 文件

本套件依據藍新金流「線上交易-幕前支付技術串接手冊」（NDNF-1.1.9）開發。

### 環境網址

| 環境     | 網址                       |
| -------- | -------------------------- |
| 測試環境 | https://ccore.newebpay.com |
| 正式環境 | https://core.newebpay.com  |

### 主要 API 端點

| API          | 路徑                   | 說明            |
| ------------ | ---------------------- | --------------- |
| MPG 交易     | /MPG/mpg_gateway       | 幕前支付        |
| 交易查詢     | /API/QueryTradeInfo    | 查詢訂單狀態    |
| 取消授權     | /API/CreditCard/Cancel | 取消信用卡授權  |
| 請退款       | /API/CreditCard/Close  | 信用卡請款/退款 |
| 電子錢包退款 | /API/EWallet/Refund    | LINE Pay 等退款 |

## 目錄結構

```
newebpay-node/
├── src/
│   ├── index.ts                    # 主要匯出
│   ├── content.ts                  # 基礎 Content 類別
│   ├── form-builder.ts             # HTML 表單產生器
│   ├── infrastructure/             # 加解密器
│   ├── operations/                 # 支付操作
│   ├── notifications/              # 通知處理器
│   ├── queries/                    # 查詢 API
│   ├── actions/                    # 退款/取消授權
│   ├── types/                      # TypeScript 型別
│   ├── errors/                     # 例外類別
│   └── frameworks/                 # 框架整合
│       ├── express/                # Express 整合
│       ├── fastify/                # Fastify 整合
│       └── koa/                    # Koa 整合
├── tests/                          # 單元測試
├── examples/                       # 範例程式
├── docs/                           # API 文件
└── README.md
```

## 開發

```bash
# 安裝依賴
npm install

# 建置
npm run build

# 執行測試
npm test

# 執行測試（監看模式）
npm run test:watch

# 測試覆蓋率
npm run test:coverage

# Lint 檢查
npm run lint

# 格式化程式碼
npm run format

# TypeScript 類型檢查
npm run typecheck
```

## 授權

MIT License

## 貢獻

歡迎提交 Issue 和 Pull Request。詳細資訊請參閱 [CONTRIBUTING.md](_media/CONTRIBUTING.md)。

## 相關連結

- [藍新金流官網](https://www.newebpay.com/)
- [藍新金流商店後台](https://www.newebpay.com/main/index)
- [PHP 版本 SDK](https://github.com/CarlLee1983/newebpay)
- [API 文件](https://github.com/CarlLee1983/newebpay-node/tree/master/docs)
