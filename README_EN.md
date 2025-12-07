# NewebPay Node.js SDK

[![npm version](https://img.shields.io/npm/v/@carllee1983/newebpay.svg)](https://www.npmjs.com/package/@carllee1983/newebpay)
[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![CI](https://github.com/CarlLee1983/newebpay-node/actions/workflows/ci.yml/badge.svg)](https://github.com/CarlLee1983/newebpay-node/actions/workflows/ci.yml)

> **📖 [中文版本](README.md)**

A Node.js SDK for NewebPay (藍新金流), a major payment gateway in Taiwan. This SDK provides a clean and easy-to-use API for integrating NewebPay payment services.

## Features

- ✅ Support all payment methods: Credit Card, ATM, CVS, Barcode, LINE Pay, Taiwan Pay, etc.
- ✅ Complete AES-256-CBC encryption/decryption (using native Node.js crypto)
- ✅ Support transaction query, refund, and cancel authorization
- ✅ Full TypeScript type definitions
- ✅ ESM and CommonJS dual support
- ✅ Node.js 18/20/22 LTS support
- ✅ Express, Fastify, Koa framework integration

## Requirements

- Node.js 18.0.0 or higher (supports 18.x, 20.x, 22.x LTS)

## Installation

```bash
npm install @carllee1983/newebpay
```

Or using yarn / pnpm:

```bash
yarn add @carllee1983/newebpay
# or
pnpm add @carllee1983/newebpay
```

## Quick Start

### Basic Usage

```typescript
import { CreditPayment, FormBuilder } from '@carllee1983/newebpay'

// Create a credit card payment
const payment = new CreditPayment('MerchantID', 'HashKey', 'HashIV')
  .setTestMode(true) // Enable test mode
  .setMerchantOrderNo('ORDER' + Date.now()) // Order number
  .setAmt(1000) // Amount
  .setItemDesc('Test Product') // Item description
  .setEmail('buyer@example.com') // Buyer email
  .setReturnURL('https://your-site.com/return') // Return URL after payment
  .setNotifyURL('https://your-site.com/notify') // Payment notification URL

// Generate HTML form (auto-submit)
const form = FormBuilder.create(payment).build()
console.log(form)

// Or get form data for frontend use
const formData = FormBuilder.create(payment).getFormData()
// { action: 'https://...', fields: { MerchantID: '...', TradeInfo: '...', ... } }
```

### Express Integration

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

// Load config from environment variables
const config = loadConfigFromEnv()

// Option 1: Use built-in router
app.use('/newebpay', createNewebPayRouter(config))

// Option 2: Use NewebPayService
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

Environment variables:

```bash
# .env
NEWEBPAY_MERCHANT_ID=MS12345678
NEWEBPAY_HASH_KEY=your_hash_key_32_chars
NEWEBPAY_HASH_IV=your_hash_iv_16_chars
NEWEBPAY_RETURN_URL=https://your-site.com/return
NEWEBPAY_NOTIFY_URL=https://your-site.com/notify
NEWEBPAY_TEST_MODE=true
```

## Supported Payment Methods

| Payment Method     | Class               | Description                |
| ------------------ | ------------------- | -------------------------- |
| Credit Card        | `CreditPayment`     | One-time payment, UnionPay |
| Credit Installment | `CreditInstallment` | 3/6/12/18/24/30 periods    |
| WebATM             | `WebAtmPayment`     | Real-time ATM transfer     |
| ATM Transfer       | `AtmPayment`        | Virtual account transfer   |
| CVS Code           | `CvsPayment`        | Limit: 30~20,000 TWD       |
| CVS Barcode        | `BarcodePayment`    | Limit: 20~40,000 TWD       |
| LINE Pay           | `LinePayPayment`    | LINE Pay e-wallet          |
| Taiwan Pay         | `TaiwanPayPayment`  | Taiwan Pay mobile          |
| E.SUN Wallet       | `EsunWalletPayment` | E.SUN Bank e-wallet        |
| BitoPay            | `BitoPayPayment`    | Cryptocurrency payment     |
| TWQR               | `TwqrPayment`       | TWQR unified payment       |
| FulaPay            | `FulaPayment`       | Buy now pay later          |
| CVS Pickup         | `CvscomPayment`     | CVS logistics pickup       |
| All-in-One         | `AllInOnePayment`   | Enable multiple methods    |

## Usage Examples

### Credit Card Installment

```typescript
import { CreditInstallment, FormBuilder } from '@carllee1983/newebpay'

const payment = new CreditInstallment('MerchantID', 'HashKey', 'HashIV')
  .setTestMode(true)
  .setMerchantOrderNo('INST' + Date.now())
  .setAmt(3000)
  .setItemDesc('Installment Product')
  .setEmail('buyer@example.com')
  .setInstallment([3, 6, 12]) // Offer 3/6/12 installment options
  .setReturnURL('https://your-site.com/return')
  .setNotifyURL('https://your-site.com/notify')

const form = FormBuilder.create(payment).build()
```

### ATM Virtual Account

```typescript
import { AtmPayment, BankType, FormBuilder } from '@carllee1983/newebpay'

const payment = new AtmPayment('MerchantID', 'HashKey', 'HashIV')
  .setTestMode(true)
  .setMerchantOrderNo('ATM' + Date.now())
  .setAmt(2000)
  .setItemDesc('ATM Transfer Test')
  .setEmail('buyer@example.com')
  .setExpireDate('2025-12-31') // Payment deadline
  .setBankType(BankType.BOT) // Specify bank (optional)
  .setReturnURL('https://your-site.com/return')
  .setNotifyURL('https://your-site.com/notify')
  .setCustomerURL('https://your-site.com/customer') // Return after account generated

const form = FormBuilder.create(payment).build()
```

### All-in-One Payment (Multiple Options)

```typescript
import { AllInOnePayment, FormBuilder } from '@carllee1983/newebpay'

const payment = new AllInOnePayment('MerchantID', 'HashKey', 'HashIV')
  .setTestMode(true)
  .setMerchantOrderNo('ALL' + Date.now())
  .setAmt(1000)
  .setItemDesc('Multi-payment Test')
  .setEmail('buyer@example.com')
  .setReturnURL('https://your-site.com/return')
  .setNotifyURL('https://your-site.com/notify')
  // Enable multiple payment methods
  .enableCredit() // Credit card
  .enableAtm() // ATM virtual account
  .enableCvs() // CVS code
  .enableBarcode() // CVS barcode
  .enableLinePay() // LINE Pay
  .enableTaiwanPay() // Taiwan Pay
  .enableInstallment([3, 6, 12]) // Credit installment
  .enableRedeem() // Bonus redemption

const form = FormBuilder.create(payment).build()
```

### CVS Pickup Payment

```typescript
import { CvscomPayment, LgsType, FormBuilder } from '@carllee1983/newebpay'

const payment = new CvscomPayment('MerchantID', 'HashKey', 'HashIV')
  .setTestMode(true)
  .setMerchantOrderNo('CVSCOM' + Date.now())
  .setAmt(500)
  .setItemDesc('CVS Pickup Product')
  .setEmail('buyer@example.com')
  .setLgsType(LgsType.B2C) // Bulk shipping
  .setReceiverName('Receiver Name')
  .setReceiverPhone('0912345678')
  .setReceiverEmail('receiver@example.com')
  .setReturnURL('https://your-site.com/return')
  .setNotifyURL('https://your-site.com/notify')

const form = FormBuilder.create(payment).build()
```

## Notification Handling

### Payment Completion Notification

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

      // Update order status...
      console.log(`Order ${orderNo} paid successfully, amount: ${amount}`)
    }

    res.send('OK')
  } catch (error) {
    console.error('Verification failed:', error)
    res.status(400).send('Verification failed')
  }
})
```

### ATM Account Notification

```typescript
import { AtmNotify } from '@carllee1983/newebpay'

app.post('/atm/notify', (req, res) => {
  const notify = new AtmNotify('HashKey', 'HashIV')

  if (notify.verify(req.body) && notify.isSuccess()) {
    const orderNo = notify.getMerchantOrderNo()
    const bankCode = notify.getBankCode() // Bank code
    const codeNo = notify.getCodeNo() // Virtual account number
    const expireDate = notify.getExpireDate() // Payment deadline

    // Save payment info, notify buyer...
    console.log(`ATM Account: ${bankCode}-${codeNo}, Expires: ${expireDate}`)
  }

  res.send('OK')
})
```

### CVS Code Notification

```typescript
import { CvsNotify } from '@carllee1983/newebpay'

app.post('/cvs/notify', (req, res) => {
  const notify = new CvsNotify('HashKey', 'HashIV')

  if (notify.verify(req.body) && notify.isSuccess()) {
    const codeNo = notify.getCodeNo() // Payment code
    const storeType = notify.getStoreType() // Store type
    const expireDate = notify.getExpireDate() // Payment deadline

    // Barcode payment info
    const barcode1 = notify.getBarcode1()
    const barcode2 = notify.getBarcode2()
    const barcode3 = notify.getBarcode3()

    // Save payment info...
  }

  res.send('OK')
})
```

### CVS Pickup Notification

```typescript
import { CvscomNotify } from '@carllee1983/newebpay'

app.post('/cvscom/notify', (req, res) => {
  const notify = new CvscomNotify('HashKey', 'HashIV')

  if (notify.verify(req.body) && notify.isSuccess()) {
    const storeCode = notify.getStoreCode() // Store code
    const storeName = notify.getStoreName() // Store name
    const storeAddr = notify.getStoreAddr() // Store address
    const lgsNo = notify.getLgsNo() // Logistics number
    const lgsType = notify.getLgsType() // Logistics type
    const receiverName = notify.getCVSCOMName() // Receiver name

    // Save logistics info...
  }

  res.send('OK')
})
```

## Transaction Query

### General Transaction Query

```typescript
import { QueryOrder } from '@carllee1983/newebpay'

const query = QueryOrder.create('MerchantID', 'HashKey', 'HashIV').setTestMode(true)

try {
  const result = await query.query('ORDER123456', 1000)

  console.log('Trade Status:', result.TradeStatus)
  console.log('Payment Type:', result.PaymentType)
  console.log('Payment Time:', result.PayTime)
} catch (error) {
  console.error('Query failed:', error.message)
}
```

### Credit Card Detail Query

```typescript
import { QueryCreditDetail } from '@carllee1983/newebpay'

const query = QueryCreditDetail.create('MerchantID', 'HashKey', 'HashIV').setTestMode(true)

try {
  const result = await query.query('ORDER123456', 1000)

  console.log('Close Status:', result.CloseStatus)
  console.log('Refund Status:', result.BackStatus)
  console.log('Auth Code:', result.Auth)
  console.log('Card Last 4:', result.Card4No)
} catch (error) {
  console.error('Query failed:', error.message)
}
```

## Refund and Cancel

### Credit Card Capture/Refund

```typescript
import { CreditClose } from '@carllee1983/newebpay'

const creditClose = CreditClose.create('MerchantID', 'HashKey', 'HashIV').setTestMode(true)

// Capture (after authorization)
const payResult = await creditClose.pay('ORDER123456', 1000)

// Refund
const refundResult = await creditClose.refund('ORDER123456', 500)

// Cancel capture/refund
const cancelResult = await creditClose.cancelClose(
  'ORDER123456',
  500,
  CreditClose.CLOSE_TYPE_REFUND,
)
```

### Cancel Authorization

```typescript
import { CreditCancel } from '@carllee1983/newebpay'

const creditCancel = CreditCancel.create('MerchantID', 'HashKey', 'HashIV').setTestMode(true)

const result = await creditCancel.cancel('ORDER123456', 1000)
```

### E-Wallet Refund

```typescript
import { EWalletRefund } from '@carllee1983/newebpay'

const refund = EWalletRefund.create('MerchantID', 'HashKey', 'HashIV').setTestMode(true)

// Supports LINE Pay, Taiwan Pay, E.SUN Wallet, etc.
const result = await refund.refund('ORDER123456', 500, 'LINEPAY')
```

## Error Handling

The SDK provides `NewebPayError` class for error handling:

```typescript
import { CreditPayment, NewebPayError } from '@carllee1983/newebpay'

try {
  const payment = new CreditPayment('MerchantID', 'HashKey', 'HashIV')
    .setMerchantOrderNo('ORDER001')
    .setAmt(-100) // Invalid amount
} catch (error) {
  if (error instanceof NewebPayError) {
    console.log('Error Code:', error.code) // 'INVALID_FIELD'
    console.log('Error Message:', error.message) // 'Amt invalid: Amount must be greater than 0'
  }
}
```

### Common Error Codes

| Error Code           | Description                    |
| -------------------- | ------------------------------ |
| `REQUIRED_FIELD`     | Required field is missing      |
| `FIELD_TOO_LONG`     | Field value exceeds limit      |
| `INVALID_FIELD`      | Invalid field value            |
| `DECRYPT_FAILED`     | Decryption failed              |
| `CHECK_VALUE_FAILED` | CheckValue verification failed |
| `API_ERROR`          | API request error              |

## CLI Tools

The package provides CLI tools for quick setup:

```bash
# Initialize environment configuration file
npx @carllee1983/newebpay init

# Generate Express integration example project
npx @carllee1983/newebpay express
```

## Test Card Numbers

| Type                  | Card Number         | Description  |
| --------------------- | ------------------- | ------------ |
| Credit Card (General) | 4000-2211-1111-1111 | General test |
| Bonus Redemption      | 4003-5511-1111-1111 | Bonus test   |
| American Express      | 3760-000000-00006   | AMEX test    |

> The expiration date and CVV for test cards can be any value.

## API Documentation

This SDK is developed based on NewebPay's "Online Transaction - Frontend Payment Technical Integration Manual" (NDNF-1.1.9).

### Environment URLs

| Environment | URL                        |
| ----------- | -------------------------- |
| Test        | https://ccore.newebpay.com |
| Production  | https://core.newebpay.com  |

### Main API Endpoints

| API             | Path                   | Description           |
| --------------- | ---------------------- | --------------------- |
| MPG Transaction | /MPG/mpg_gateway       | Frontend payment      |
| Query Trade     | /API/QueryTradeInfo    | Query order status    |
| Cancel Auth     | /API/CreditCard/Cancel | Cancel credit auth    |
| Capture/Refund  | /API/CreditCard/Close  | Credit capture/refund |
| E-Wallet Refund | /API/EWallet/Refund    | LINE Pay, etc. refund |

## Project Structure

```
newebpay-node/
├── src/
│   ├── index.ts                    # Main exports
│   ├── content.ts                  # Base Content class
│   ├── form-builder.ts             # HTML form generator
│   ├── infrastructure/             # Encryption/decryption
│   ├── operations/                 # Payment operations
│   ├── notifications/              # Notification handlers
│   ├── queries/                    # Query APIs
│   ├── actions/                    # Refund/cancel
│   ├── types/                      # TypeScript types
│   ├── errors/                     # Error classes
│   └── frameworks/                 # Framework integration
│       ├── express/                # Express integration
│       ├── fastify/                # Fastify integration
│       └── koa/                    # Koa integration
├── tests/                          # Unit tests
├── examples/                       # Example code
├── docs/                           # API documentation
└── README.md
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Run tests (watch mode)
npm run test:watch

# Test coverage
npm run test:coverage

# Lint check
npm run lint

# Format code
npm run format

# TypeScript type check
npm run typecheck
```

## License

MIT License

## Contributing

Issues and Pull Requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## Links

- [NewebPay Official Website](https://www.newebpay.com/)
- [NewebPay Merchant Dashboard](https://www.newebpay.com/main/index)
- [PHP Version SDK](https://github.com/CarlLee1983/newebpay)
- [API Documentation](https://github.com/CarlLee1983/newebpay-node/tree/master/docs)
