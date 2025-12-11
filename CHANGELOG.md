## [1.5.0](https://github.com/CarlLee1983/newebpay-node/compare/v1.4.0...v1.5.0) (2025-12-11)

### Features

* enhance payment middleware and validation ([d39220f](https://github.com/CarlLee1983/newebpay-node/commit/d39220fc0a7fc584a6f4d3ff97844a32d96e5850))

## [1.4.0](https://github.com/CarlLee1983/newebpay-node/compare/v1.3.3...v1.4.0) (2025-12-10)

### Features

- implement HTTP client abstraction and timestamp utility ([6bfedd3](https://github.com/CarlLee1983/newebpay-node/commit/6bfedd355d40e6c7980ff3ead0a02eaa2a8eb56e))

### Bug Fixes

- **errors:** update error messages to English for consistency ([493032b](https://github.com/CarlLee1983/newebpay-node/commit/493032b54952e398781ad6f7d289c062c0abfb58))
- **QueryOrder:** enhance HTTP post response type definition for better type safety ([9495796](https://github.com/CarlLee1983/newebpay-node/commit/949579636fbc94f1db95a41c2624db9afa9fc330))

### Code Refactoring

- **NewebPayError:** improve handling of optional properties in error constructor ([68321b3](https://github.com/CarlLee1983/newebpay-node/commit/68321b3da4e7b6793c5ac624e9e54db0365196a9))
- **tests:** replace global fetch with HttpClientInterface mock in tests ([d3f35b5](https://github.com/CarlLee1983/newebpay-node/commit/d3f35b5d2ddbdf4cdcb6f649c188d5824be13122))

## [1.3.3](https://github.com/CarlLee1983/newebpay-node/compare/v1.3.2...v1.3.3) (2025-12-07)

### Documentation

- **README:** complete AllInOnePayment documentation with all available methods ([af9a582](https://github.com/CarlLee1983/newebpay-node/commit/af9a58266b5860760e537ab33dc4d4da80820fc6))

## [1.3.2](https://github.com/CarlLee1983/newebpay-node/compare/v1.3.1...v1.3.2) (2025-12-07)

### Documentation

- complete README documentation with English version and fix broken examples ([988c930](https://github.com/CarlLee1983/newebpay-node/commit/988c930480a42450f97aedcb5f68cb8d334b3abe))
- **README:** add bilingual documentation with complete examples ([d62cfbb](https://github.com/CarlLee1983/newebpay-node/commit/d62cfbb4362d75578f553d8469a46e81701f5b56))

## [1.3.1](https://github.com/CarlLee1983/newebpay-node/compare/v1.3.0...v1.3.1) (2025-12-07)

## [1.3.0](https://github.com/CarlLee1983/newebpay-node/compare/v1.2.0...v1.3.0) (2025-12-06)

### Features

- Add GitHub Actions workflows for automatic pull request labeling and stale issue/PR management. ([e38b88b](https://github.com/CarlLee1983/newebpay-node/commit/e38b88b6361b9f7adb9b44b730822356bdbc3faf))
- Add Koa and Fastify framework integrations, introduce HTTP client abstraction, and setup project governance files ([fd779ce](https://github.com/CarlLee1983/newebpay-node/commit/fd779ce88acefa95c668ad917c9f3f6cb28be6d3))

### Documentation

- Add security reporting template, code of conduct, and security policy ([bb250f1](https://github.com/CarlLee1983/newebpay-node/commit/bb250f106bea5a58ad48d796c6f3ca5cf362812b))

## [1.2.0](https://github.com/CarlLee1983/newebpay-node/compare/v1.1.0...v1.2.0) (2025-12-06)

### Features

- Add automated release workflow using semantic-release and GitHub Actions. ([b1c7b77](https://github.com/CarlLee1983/newebpay-node/commit/b1c7b77c35473876dd12e6d2e471e4cf1c17a66c))
- add comprehensive test suite for various NewebPay operations, notifications, errors, actions, queries, and CLI, and enhance existing payment notification tests. ([126e714](https://github.com/CarlLee1983/newebpay-node/commit/126e7140a29ea4faad222e12b08b14c1832a82a6))
- Add E2E tests for the Express framework and integrate them into the CI pipeline. ([d8e55b9](https://github.com/CarlLee1983/newebpay-node/commit/d8e55b9e8bd24262d946550a460a91116911fa5b))
- Add support and tests for new payment methods, notification types, and improved error handling. ([b31b77d](https://github.com/CarlLee1983/newebpay-node/commit/b31b77d5ed6ec69b58b77a391fe0396c9c1971bf))
- Generate API documentation, add a Fastify example, and document Express framework integration. ([5521070](https://github.com/CarlLee1983/newebpay-node/commit/55210706904374cd30cdaa5e9503389826616bae))

# 變更日誌

所有重要的變更都會記錄在此檔案中。

本專案遵循 [語意化版本](https://semver.org/lang/zh-TW/) 規範。

## [1.1.0] - 2025-11-28

### 新增

#### 框架整合

- **Express.js 整合** - 完整的 Express 路由與中間件支援
  - `createNewebPayRouter()` - 自動建立藍新金流路由
  - `paymentNotifyMiddleware()` - 支付完成通知驗證
  - `atmNotifyMiddleware()` - ATM 取號通知驗證
  - `cvsNotifyMiddleware()` - 超商取號通知驗證
  - `cvscomNotifyMiddleware()` - 超商取貨付款通知驗證

#### 服務層

- **NewebPayService** - 統一的服務介面（類似 PHP PaymentCoordinator）
  - 簡化的支付 API
  - 支援所有支付方式
  - 查詢與退款功能整合

#### 支付建構器

- **PaymentBuilder** - 鏈式呼叫 API（類似 PHP PaymentBuilder）
  - `payment()` - 快速建立支付
  - `creditCard()` / `creditInstallment()` / `atm()` / `cvs()` 等
  - `setReturnUrl()` / `setNotifyUrl()` 等 URL 設定
  - `customize()` - 自訂設定回呼
  - `getParams()` - 取得支付參數供前端使用

#### CLI 工具

- `newebpay init` - 初始化環境變數設定檔
- `newebpay express` - 產生 Express 整合範例專案

#### 子路徑匯出

- `@carllee1983/newebpay/express` - Express 整合
- `@carllee1983/newebpay/common` - 共用服務層

#### 環境變數支援

- `loadConfigFromEnv()` - 從環境變數自動載入設定
- 支援 `NEWEBPAY_MERCHANT_ID`、`NEWEBPAY_HASH_KEY` 等

### 測試

- 新增 20 個框架整合測試案例
- 總計 110 個測試案例全部通過

### 文件

- 更新 README.md 新增框架整合說明
- 新增 Express 整合範例
- 新增 PaymentBuilder 使用範例

## [1.0.0] - 2025-01-15

### 新增

#### 支付操作

- `CreditPayment` - 信用卡一次付清
- `CreditInstallment` - 信用卡分期（3/6/12/18/24/30 期）
- `AtmPayment` - ATM 虛擬帳號
- `WebAtmPayment` - WebATM 即時轉帳
- `CvsPayment` - 超商代碼繳費
- `BarcodePayment` - 超商條碼繳費
- `LinePayPayment` - LINE Pay 電子錢包
- `TaiwanPayPayment` - 台灣 Pay
- `EsunWalletPayment` - 玉山 Wallet
- `BitoPayPayment` - BitoPay 加密貨幣
- `TwqrPayment` - TWQR 共通支付
- `FulaPayment` - 付啦（先買後付）
- `CvscomPayment` - 超商取貨付款
- `AllInOnePayment` - 全支付方式

#### 通知處理

- `PaymentNotify` - 支付完成通知
- `AtmNotify` - ATM 取號通知
- `CvsNotify` - 超商取號通知
- `CvscomNotify` - 超商取貨通知

#### 查詢功能

- `QueryOrder` - 交易查詢
- `QueryCreditDetail` - 信用卡明細查詢

#### 退款/取消

- `CreditClose` - 信用卡請款/退款
- `CreditCancel` - 取消授權
- `EWalletRefund` - 電子錢包退款

#### 基礎設施

- `Aes256Encoder` - AES-256-CBC 加解密
- `CheckValueEncoder` - TradeSha 驗證
- `FormBuilder` - HTML 表單產生器
- `NewebPayError` - 自訂例外類別

#### 型別定義

- 完整的 TypeScript 型別定義
- `PaymentType`、`BankType`、`StoreType`、`LgsType` 等列舉

### 技術規格

- 支援 Node.js 18.x、20.x、22.x LTS
- 支援 ESM 和 CommonJS
- 使用 Node.js 原生 crypto 模組
- 完整的單元測試（90 個測試案例）
