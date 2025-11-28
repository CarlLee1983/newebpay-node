# 變更日誌

所有重要的變更都會記錄在此檔案中。

本專案遵循 [語意化版本](https://semver.org/lang/zh-TW/) 規範。

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

