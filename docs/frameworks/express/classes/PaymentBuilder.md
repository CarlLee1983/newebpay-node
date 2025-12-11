[**@carllee1983/newebpay**](../../../README.md)

***

[@carllee1983/newebpay](../../../modules.md) / [frameworks/express](../README.md) / PaymentBuilder

# Class: PaymentBuilder

Defined in: [newebpay-node/src/frameworks/common/payment-builder.ts:20](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/frameworks/common/payment-builder.ts#L20)

支付建構器（類似 PHP 的 PaymentBuilder）

提供簡化的鏈式 API

## Constructors

### Constructor

> **new PaymentBuilder**(`config`): `PaymentBuilder`

Defined in: [newebpay-node/src/frameworks/common/payment-builder.ts:38](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/frameworks/common/payment-builder.ts#L38)

#### Parameters

##### config

[`NewebPayConfig`](../interfaces/NewebPayConfig.md)

#### Returns

`PaymentBuilder`

## Methods

### allInOne()

> **allInOne**(): `this`

Defined in: [newebpay-node/src/frameworks/common/payment-builder.ts:128](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/frameworks/common/payment-builder.ts#L128)

使用全支付方式

#### Returns

`this`

***

### atm()

> **atm**(`expireDate?`): `this`

Defined in: [newebpay-node/src/frameworks/common/payment-builder.ts:79](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/frameworks/common/payment-builder.ts#L79)

使用 ATM 虛擬帳號

#### Parameters

##### expireDate?

`string`

#### Returns

`this`

***

### barcode()

> **barcode**(`expireDate?`): `this`

Defined in: [newebpay-node/src/frameworks/common/payment-builder.ts:101](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/frameworks/common/payment-builder.ts#L101)

使用超商條碼繳費

#### Parameters

##### expireDate?

`string`

#### Returns

`this`

***

### build()

> **build**(): [`PaymentInterface`](../../../index/interfaces/PaymentInterface.md)

Defined in: [newebpay-node/src/frameworks/common/payment-builder.ts:176](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/frameworks/common/payment-builder.ts#L176)

建立支付物件

#### Returns

[`PaymentInterface`](../../../index/interfaces/PaymentInterface.md)

***

### creditCard()

> **creditCard**(): `this`

Defined in: [newebpay-node/src/frameworks/common/payment-builder.ts:54](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/frameworks/common/payment-builder.ts#L54)

使用信用卡一次付清

#### Returns

`this`

***

### creditInstallment()

> **creditInstallment**(`periods`): `this`

Defined in: [newebpay-node/src/frameworks/common/payment-builder.ts:62](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/frameworks/common/payment-builder.ts#L62)

使用信用卡分期

#### Parameters

##### periods

`number`[] = `...`

#### Returns

`this`

***

### customize()

> **customize**(`callback`): `this`

Defined in: [newebpay-node/src/frameworks/common/payment-builder.ts:168](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/frameworks/common/payment-builder.ts#L168)

自訂支付物件設定

#### Parameters

##### callback

(`payment`) => `void`

#### Returns

`this`

***

### cvs()

> **cvs**(`expireDate?`): `this`

Defined in: [newebpay-node/src/frameworks/common/payment-builder.ts:90](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/frameworks/common/payment-builder.ts#L90)

使用超商代碼繳費

#### Parameters

##### expireDate?

`string`

#### Returns

`this`

***

### getParams()

> **getParams**(): `object`

Defined in: [newebpay-node/src/frameworks/common/payment-builder.ts:246](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/frameworks/common/payment-builder.ts#L246)

取得支付參數（供前端使用）

#### Returns

`object`

##### action

> **action**: `string`

##### fields

> **fields**: `Record`\<`string`, `string`\>

##### method

> **method**: `string`

***

### linePay()

> **linePay**(): `this`

Defined in: [newebpay-node/src/frameworks/common/payment-builder.ts:112](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/frameworks/common/payment-builder.ts#L112)

使用 LINE Pay

#### Returns

`this`

***

### setClientBackUrl()

> **setClientBackUrl**(`url`): `this`

Defined in: [newebpay-node/src/frameworks/common/payment-builder.ts:160](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/frameworks/common/payment-builder.ts#L160)

設定返回商店網址

#### Parameters

##### url

`string`

#### Returns

`this`

***

### setCustomerUrl()

> **setCustomerUrl**(`url`): `this`

Defined in: [newebpay-node/src/frameworks/common/payment-builder.ts:152](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/frameworks/common/payment-builder.ts#L152)

設定取號完成返回網址

#### Parameters

##### url

`string`

#### Returns

`this`

***

### setNotifyUrl()

> **setNotifyUrl**(`url`): `this`

Defined in: [newebpay-node/src/frameworks/common/payment-builder.ts:144](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/frameworks/common/payment-builder.ts#L144)

設定付款結果通知網址

#### Parameters

##### url

`string`

#### Returns

`this`

***

### setOrder()

> **setOrder**(`orderNo`, `amount`, `itemDesc`, `email`): `this`

Defined in: [newebpay-node/src/frameworks/common/payment-builder.ts:43](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/frameworks/common/payment-builder.ts#L43)

設定基本交易資訊

#### Parameters

##### orderNo

`string`

##### amount

`number`

##### itemDesc

`string`

##### email

`string` = `''`

#### Returns

`this`

***

### setReturnUrl()

> **setReturnUrl**(`url`): `this`

Defined in: [newebpay-node/src/frameworks/common/payment-builder.ts:136](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/frameworks/common/payment-builder.ts#L136)

設定付款完成返回網址

#### Parameters

##### url

`string`

#### Returns

`this`

***

### taiwanPay()

> **taiwanPay**(): `this`

Defined in: [newebpay-node/src/frameworks/common/payment-builder.ts:120](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/frameworks/common/payment-builder.ts#L120)

使用台灣 Pay

#### Returns

`this`

***

### webAtm()

> **webAtm**(): `this`

Defined in: [newebpay-node/src/frameworks/common/payment-builder.ts:71](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/frameworks/common/payment-builder.ts#L71)

使用 WebATM

#### Returns

`this`
