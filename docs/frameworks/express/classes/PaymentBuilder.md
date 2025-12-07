[**@carllee1983/newebpay**](../../../README.md)

---

[@carllee1983/newebpay](../../../modules.md) / [frameworks/express](../README.md) / PaymentBuilder

# Class: PaymentBuilder

Defined in: [src/frameworks/common/payment-builder.ts:20](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/payment-builder.ts#L20)

支付建構器（類似 PHP 的 PaymentBuilder）

提供簡化的鏈式 API

## Constructors

### Constructor

> **new PaymentBuilder**(`config`): `PaymentBuilder`

Defined in: [src/frameworks/common/payment-builder.ts:38](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/payment-builder.ts#L38)

#### Parameters

##### config

[`NewebPayConfig`](../interfaces/NewebPayConfig.md)

#### Returns

`PaymentBuilder`

## Methods

### allInOne()

> **allInOne**(): `this`

Defined in: [src/frameworks/common/payment-builder.ts:133](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/payment-builder.ts#L133)

使用全支付方式

#### Returns

`this`

---

### atm()

> **atm**(`expireDate?`): `this`

Defined in: [src/frameworks/common/payment-builder.ts:84](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/payment-builder.ts#L84)

使用 ATM 虛擬帳號

#### Parameters

##### expireDate?

`string`

#### Returns

`this`

---

### barcode()

> **barcode**(`expireDate?`): `this`

Defined in: [src/frameworks/common/payment-builder.ts:106](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/payment-builder.ts#L106)

使用超商條碼繳費

#### Parameters

##### expireDate?

`string`

#### Returns

`this`

---

### build()

> **build**(): [`PaymentInterface`](../../../index/interfaces/PaymentInterface.md)

Defined in: [src/frameworks/common/payment-builder.ts:181](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/payment-builder.ts#L181)

建立支付物件

#### Returns

[`PaymentInterface`](../../../index/interfaces/PaymentInterface.md)

---

### creditCard()

> **creditCard**(): `this`

Defined in: [src/frameworks/common/payment-builder.ts:59](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/payment-builder.ts#L59)

使用信用卡一次付清

#### Returns

`this`

---

### creditInstallment()

> **creditInstallment**(`periods`): `this`

Defined in: [src/frameworks/common/payment-builder.ts:67](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/payment-builder.ts#L67)

使用信用卡分期

#### Parameters

##### periods

`number`[] = `...`

#### Returns

`this`

---

### customize()

> **customize**(`callback`): `this`

Defined in: [src/frameworks/common/payment-builder.ts:173](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/payment-builder.ts#L173)

自訂支付物件設定

#### Parameters

##### callback

(`payment`) => `void`

#### Returns

`this`

---

### cvs()

> **cvs**(`expireDate?`): `this`

Defined in: [src/frameworks/common/payment-builder.ts:95](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/payment-builder.ts#L95)

使用超商代碼繳費

#### Parameters

##### expireDate?

`string`

#### Returns

`this`

---

### getParams()

> **getParams**(): `object`

Defined in: [src/frameworks/common/payment-builder.ts:253](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/payment-builder.ts#L253)

取得支付參數（供前端使用）

#### Returns

`object`

##### action

> **action**: `string`

##### fields

> **fields**: `Record`\<`string`, `string`\>

##### method

> **method**: `string`

---

### linePay()

> **linePay**(): `this`

Defined in: [src/frameworks/common/payment-builder.ts:117](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/payment-builder.ts#L117)

使用 LINE Pay

#### Returns

`this`

---

### setClientBackUrl()

> **setClientBackUrl**(`url`): `this`

Defined in: [src/frameworks/common/payment-builder.ts:165](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/payment-builder.ts#L165)

設定返回商店網址

#### Parameters

##### url

`string`

#### Returns

`this`

---

### setCustomerUrl()

> **setCustomerUrl**(`url`): `this`

Defined in: [src/frameworks/common/payment-builder.ts:157](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/payment-builder.ts#L157)

設定取號完成返回網址

#### Parameters

##### url

`string`

#### Returns

`this`

---

### setNotifyUrl()

> **setNotifyUrl**(`url`): `this`

Defined in: [src/frameworks/common/payment-builder.ts:149](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/payment-builder.ts#L149)

設定付款結果通知網址

#### Parameters

##### url

`string`

#### Returns

`this`

---

### setOrder()

> **setOrder**(`orderNo`, `amount`, `itemDesc`, `email`): `this`

Defined in: [src/frameworks/common/payment-builder.ts:43](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/payment-builder.ts#L43)

設定基本交易資訊

#### Parameters

##### orderNo

`string`

##### amount

`number`

##### itemDesc

`string`

##### email

`string` = `""`

#### Returns

`this`

---

### setReturnUrl()

> **setReturnUrl**(`url`): `this`

Defined in: [src/frameworks/common/payment-builder.ts:141](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/payment-builder.ts#L141)

設定付款完成返回網址

#### Parameters

##### url

`string`

#### Returns

`this`

---

### taiwanPay()

> **taiwanPay**(): `this`

Defined in: [src/frameworks/common/payment-builder.ts:125](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/payment-builder.ts#L125)

使用台灣 Pay

#### Returns

`this`

---

### webAtm()

> **webAtm**(): `this`

Defined in: [src/frameworks/common/payment-builder.ts:76](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/payment-builder.ts#L76)

使用 WebATM

#### Returns

`this`
