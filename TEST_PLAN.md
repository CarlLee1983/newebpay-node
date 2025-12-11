# 單元測試規劃文件

## 測試目標
- 達到 90% 以上的程式碼覆蓋率
- 確保所有核心功能都有完整的測試
- 涵蓋正常流程、邊界條件和錯誤處理

## 測試框架
- **測試執行器**: Bun Test
- **測試覆蓋率**: Bun 內建覆蓋率工具

## 測試模組規劃

### 1. Infrastructure 模組 (優先級: 高)
#### 1.1 AES256Encoder (`src/infrastructure/aes256-encoder.ts`)
- [x] 加密功能測試
- [x] 解密功能測試
- [x] 無效輸入處理測試
- [x] 錯誤處理測試

#### 1.2 CheckValueEncoder (`src/infrastructure/check-value-encoder.ts`)
- [x] CheckValue 產生測試
- [x] CheckValue 驗證測試
- [x] verifyOrFail 測試

#### 1.3 FetchHttpClient (`src/infrastructure/http/fetch-http-client.ts`)
- [x] POST 請求成功測試
- [x] 超時處理測試
- [x] 重試機制測試
- [x] 錯誤處理測試
- [x] HTTP 錯誤狀態碼處理

### 2. Utils 模組 (優先級: 高)
#### 2.1 Timestamp (`src/utils/timestamp.ts`)
- [x] getTimestamp 測試
- [x] getTimestampNumber 測試

### 3. Errors 模組 (優先級: 高)
#### 3.1 NewebPayError (`src/errors/newebpay-error.ts`)
- [x] 基本錯誤建立測試
- [x] 靜態工廠方法測試
- [x] toJSON 方法測試
- [x] 錯誤屬性測試

### 4. Content 基礎類別 (優先級: 高)
#### 4.1 Content (`src/content.ts`)
- [x] 初始化測試
- [x] 憑證驗證測試
- [x] 參數設定測試
- [x] 驗證邏輯測試
- [x] 加密內容產生測試
- [x] 邊界條件測試

### 5. FormBuilder (優先級: 中)
#### 5.1 FormBuilder (`src/form-builder.ts`)
- [x] HTML 表單產生測試
- [x] 自動送出功能測試
- [x] HTML 跳脫測試
- [x] getFormData 測試

### 6. Operations 模組 (優先級: 中)
#### 6.1 CreditPayment (`src/operations/credit-payment.ts`)
- [x] 基本功能測試
- [x] 選項設定測試

#### 6.2 其他 Payment 類別
- [x] CreditInstallment
- [x] AtmPayment
- [x] WebAtmPayment
- [x] CvsPayment
- [x] BarcodePayment
- [x] LinePayPayment
- [x] TaiwanPayPayment
- [x] EsunWalletPayment
- [x] BitoPayPayment
- [x] TwqrPayment
- [x] FulaPayment
- [x] CvscomPayment
- [x] AllInOnePayment

### 7. Notifications 模組 (優先級: 中)
#### 7.1 PaymentNotify (`src/notifications/payment-notify.ts`)
- [x] 驗證功能測試
- [x] 解密功能測試
- [x] 資料解析測試
- [x] 錯誤處理測試

#### 7.2 其他 Notify 類別
- [x] AtmNotify
- [x] CvsNotify
- [x] CvscomNotify

### 8. Queries 模組 (優先級: 中)
#### 8.1 QueryOrder (`src/queries/query-order.ts`)
- [x] 查詢功能測試
- [x] 參數驗證測試

#### 8.2 QueryCreditDetail (`src/queries/query-credit-detail.ts`)
- [x] 查詢功能測試
- [x] 參數驗證測試

### 9. Actions 模組 (優先級: 中)
#### 9.1 CreditClose (`src/actions/credit-close.ts`)
- [x] 關閉功能測試

#### 9.2 CreditCancel (`src/actions/credit-cancel.ts`)
- [x] 取消功能測試

#### 9.3 EWalletRefund (`src/actions/ewallet-refund.ts`)
- [x] 退款功能測試

### 10. Frameworks 模組 (優先級: 低)
#### 10.1 Express Integration
- [ ] Middleware 測試
- [ ] Router 測試

#### 10.2 Fastify Integration
- [ ] Plugin 測試

#### 10.3 Koa Integration
- [ ] Middleware 測試

## 測試檔案結構
```
tests/
├── unit/
│   ├── infrastructure/
│   │   ├── aes256-encoder.test.ts
│   │   ├── check-value-encoder.test.ts
│   │   └── http/
│   │       └── fetch-http-client.test.ts
│   ├── utils/
│   │   └── timestamp.test.ts
│   ├── errors/
│   │   └── newebpay-error.test.ts
│   ├── content.test.ts
│   ├── form-builder.test.ts
│   ├── operations/
│   │   ├── credit-payment.test.ts
│   │   ├── credit-installment.test.ts
│   │   └── ...
│   ├── notifications/
│   │   ├── payment-notify.test.ts
│   │   └── ...
│   ├── queries/
│   │   ├── query-order.test.ts
│   │   └── query-credit-detail.test.ts
│   └── actions/
│       ├── credit-close.test.ts
│       ├── credit-cancel.test.ts
│       └── ewallet-refund.test.ts
└── e2e/
    └── ...
```

## 測試執行指令
```bash
# 執行所有測試
bun test

# 執行測試並顯示覆蓋率
bun test --coverage

# 監聽模式
bun test --watch
```

## 覆蓋率目標
- **整體覆蓋率**: ≥ 90%
- **核心模組覆蓋率**: ≥ 95%
- **Infrastructure 覆蓋率**: 100%
- **Utils 覆蓋率**: 100%

