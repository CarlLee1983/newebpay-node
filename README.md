# 藍新金流 Node.js SDK

[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

藍新金流（NewebPay）Node.js SDK，提供簡潔易用的 API 整合藍新金流支付服務。

## 功能特色

- 支援全部支付方式：信用卡、ATM 轉帳、超商代碼/條碼繳費、LINE Pay、台灣 Pay 等
- 完整的 AES-256-CBC 加解密實作（使用 Node.js 原生 crypto）
- 支援交易查詢、退款、取消授權
- 完整的 TypeScript 型別定義
- ESM 和 CommonJS 雙重支援
- Node.js 18/20/22 LTS 支援

## 系統需求

- Node.js 18.0.0 或更高版本（支援 18.x、20.x、22.x LTS）

## 安裝

```bash
npm install @carllee1983/newebpay
```

或使用 yarn：

```bash
yarn add @carllee1983/newebpay
```

### Express 整合（需要額外安裝）

```bash
npm install express
npm install -D @types/express
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

// 產生表單並自動送出
const form = FormBuilder.create(payment).build()
console.log(form)
```

### 前端整合（Vue/React）

```typescript
import { NewebPayService, loadConfigFromEnv } from '@carllee1983/newebpay/express'

// Express API 範例
app.post('/api/payment/create', (req, res) => {
  const newebpay = new NewebPayService(loadConfigFromEnv())

  const params = newebpay
    .payment(req.body.orderId, req.body.amount, req.body.itemDesc)
    .creditCard()
    .getParams()

  res.json({ success: true, data: params })
})
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
import { CreditInstallment } from '@carllee1983/newebpay'

const payment = new CreditInstallment('特店編號', 'HashKey', 'HashIV')
  .setTestMode(true)
  .setMerchantOrderNo('INST' + Date.now())
  .setAmt(3000)
  .setItemDesc('分期商品')
  .setInstallment([3, 6, 12]) // 提供 3/6/12 期選項
  .setReturnURL('https://your-site.com/return')
  .setNotifyURL('https://your-site.com/notify')
```

### ATM 虛擬帳號

```typescript
import { AtmPayment, BankType } from '@carllee1983/newebpay'

const payment = new AtmPayment('特店編號', 'HashKey', 'HashIV')
  .setTestMode(true)
  .setMerchantOrderNo('ATM' + Date.now())
  .setAmt(2000)
  .setItemDesc('ATM 轉帳測試')
  .setExpireDate('2025-12-31') // 繳費期限
  .setBankType(BankType.BOT) // 指定銀行
  .setReturnURL('https://your-site.com/return')
  .setNotifyURL('https://your-site.com/notify')
  .setCustomerURL('https://your-site.com/customer') // 取號完成返回
```

### 全支付方式

```typescript
import { AllInOnePayment } from '@carllee1983/newebpay';

    res.send('OK');
  } catch (error) {
    // 驗證失敗
    res.status(400).send('Verification failed');
  }
});
```

### ATM 取號通知

```typescript
import { AtmNotify } from '@carllee1983/newebpay'

app.post('/atm-notify', (req, res) => {
  const notify = new AtmNotify('HashKey', 'HashIV')

  if (notify.verify(req.body) && notify.isSuccess()) {
    const bankCode = notify.getBankCode() // 銀行代碼
    const codeNo = notify.getCodeNo() // 虛擬帳號
    const expireDate = notify.getExpireDate() // 繳費截止日

    // 儲存繳費資訊...
  }

  res.send('OK')
})
```

### 超商取號通知

```typescript
import { CvsNotify } from '@carllee1983/newebpay'

app.post('/cvs-notify', (req, res) => {
  const notify = new CvsNotify('HashKey', 'HashIV')

  if (notify.verify(req.body) && notify.isSuccess()) {
    const codeNo = notify.getCodeNo() // 繳費代碼
    const storeType = notify.getStoreType() // 超商類型
    const expireDate = notify.getExpireDate() // 繳費截止日

    // 條碼繳費
    const barcode1 = notify.getBarcode1()
    const barcode2 = notify.getBarcode2()
    const barcode3 = notify.getBarcode3()
  }

  res.send('OK')
})
```

### 超商取貨付款通知

```typescript
import { CvscomNotify } from '@carllee1983/newebpay'

app.post('/cvscom-notify', (req, res) => {
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

  console.log('交易狀態：', result.TradeStatus)
  console.log('付款方式：', result.PaymentType)
} catch (error) {
  console.error('查詢失敗：', error.message)
}
```

### 信用卡明細查詢

```typescript
import { QueryCreditDetail } from '@carllee1983/newebpay'

const query = QueryCreditDetail.create('特店編號', 'HashKey', 'HashIV').setTestMode(true)

try {
  const result = await query.query('ORDER123456', 1000)

  console.log('請款狀態：', result.CloseStatus)
  console.log('退款狀態：', result.BackStatus)
  console.log('授權碼：', result.Auth)
} catch (error) {
  console.error('查詢失敗：', error.message)
}
```

## 退款與取消

### 信用卡退款

```typescript
import { CreditClose } from '@carllee1983/newebpay'

const creditClose = CreditClose.create('特店編號', 'HashKey', 'HashIV').setTestMode(true)

// 退款
const result = await creditClose.refund('ORDER123456', 500)

// 請款（授權後請款）
const payResult = await creditClose.pay('ORDER123456', 1000)

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

## 測試卡號

| 類型                    | 卡號                | 說明      |
| ----------------------- | ------------------- | --------- |
| 信用卡（一次付清/分期） | 4000-2211-1111-1111 | 一般測試  |
| 紅利折抵                | 4003-5511-1111-1111 | 紅利測試  |
| 美國運通卡              | 3760-000000-00006   | AMEX 測試 |

測試卡號的有效月年及卡片背面末三碼可任意填寫。

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
│   └── errors/                     # 例外類別
├── tests/                          # 單元測試
├── examples/                       # 範例程式
├── package.json
├── tsconfig.json
└── README.md
```

## CLI 工具

套件提供 CLI 工具協助快速設定：

```bash
# 初始化環境變數設定檔
npx @carllee1983/newebpay init

# 產生 Express 整合範例專案
npx @carllee1983/newebpay express
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

# TypeScript 類型檢查
npm run typecheck
```

## 授權

MIT License

## 貢獻

歡迎提交 Issue 和 Pull Request。

## 框架整合

### Express.js

完整整合範例請參考 [examples/express-integration.ts](examples/express-integration.ts)

```typescript
import { createNewebPayRouter, loadConfigFromEnv } from '@carllee1983/newebpay/express'

const app = express()
app.use('/newebpay', createNewebPayRouter(loadConfigFromEnv()))
```

### 使用簡化 API

```typescript
import { NewebPayService, loadConfigFromEnv } from '@carllee1983/newebpay/express'

const newebpay = new NewebPayService(loadConfigFromEnv())

// 鏈式呼叫
const params = newebpay
  .payment('ORDER001', 1000, '商品', 'buyer@example.com')
  .creditCard() // 或 .atm(), .cvs(), .linePay() 等
  .setReturnUrl('https://your-site.com/return')
  .setNotifyUrl('https://your-site.com/notify')
  .getParams()
```

## 相關連結

- [藍新金流官網](https://www.newebpay.com/)
- [藍新金流商店後台](https://www.newebpay.com/main/index)
- [PHP 版本 SDK](https://github.com/CarlLee1983/newebpay)
