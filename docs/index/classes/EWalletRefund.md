[**@carllee1983/newebpay**](../../README.md)

***

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / EWalletRefund

# Class: EWalletRefund

Defined in: [newebpay-node/src/actions/ewallet-refund.ts:29](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/actions/ewallet-refund.ts#L29)

電子錢包退款。

對 LINE Pay、玉山 Wallet、台灣 Pay 等電子錢包交易進行退款。

## Constructors

### Constructor

> **new EWalletRefund**(`merchantId`, `hashKey`, `hashIV`, `httpClient?`): `EWalletRefund`

Defined in: [newebpay-node/src/actions/ewallet-refund.ts:58](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/actions/ewallet-refund.ts#L58)

建立退款物件。

#### Parameters

##### merchantId

`string`

##### hashKey

`string`

##### hashIV

`string`

##### httpClient?

`HttpClientInterface`

#### Returns

`EWalletRefund`

## Properties

### hashIV

> `protected` **hashIV**: `string`

Defined in: [newebpay-node/src/actions/ewallet-refund.ts:61](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/actions/ewallet-refund.ts#L61)

***

### hashKey

> `protected` **hashKey**: `string`

Defined in: [newebpay-node/src/actions/ewallet-refund.ts:60](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/actions/ewallet-refund.ts#L60)

***

### httpClient

> `protected` **httpClient**: `HttpClientInterface`

Defined in: [newebpay-node/src/actions/ewallet-refund.ts:53](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/actions/ewallet-refund.ts#L53)

HTTP 客戶端。

***

### isTest

> `protected` **isTest**: `boolean` = `false`

Defined in: [newebpay-node/src/actions/ewallet-refund.ts:43](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/actions/ewallet-refund.ts#L43)

是否為測試環境。

***

### merchantId

> `protected` **merchantId**: `string`

Defined in: [newebpay-node/src/actions/ewallet-refund.ts:59](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/actions/ewallet-refund.ts#L59)

***

### requestPath

> `protected` **requestPath**: `string` = `'/API/EWallet/Refund'`

Defined in: [newebpay-node/src/actions/ewallet-refund.ts:38](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/actions/ewallet-refund.ts#L38)

API 請求路徑。

***

### version

> `protected` **version**: `string` = `'1.0'`

Defined in: [newebpay-node/src/actions/ewallet-refund.ts:33](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/actions/ewallet-refund.ts#L33)

API 版本。

## Methods

### buildPayload()

> `protected` **buildPayload**(`postData`): `Record`\<`string`, `string`\>

Defined in: [newebpay-node/src/actions/ewallet-refund.ts:136](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/actions/ewallet-refund.ts#L136)

建立請求 Payload。

#### Parameters

##### postData

`Record`\<`string`, `unknown`\>

#### Returns

`Record`\<`string`, `string`\>

***

### getApiUrl()

> **getApiUrl**(): `string`

Defined in: [newebpay-node/src/actions/ewallet-refund.ts:97](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/actions/ewallet-refund.ts#L97)

取得完整 API 網址。

#### Returns

`string`

***

### getBaseUrl()

> **getBaseUrl**(): `string`

Defined in: [newebpay-node/src/actions/ewallet-refund.ts:90](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/actions/ewallet-refund.ts#L90)

取得 API 基礎網址。

#### Returns

`string`

***

### parseResponse()

> `protected` **parseResponse**(`response`): [`EWalletRefundResult`](../interfaces/EWalletRefundResult.md)

Defined in: [newebpay-node/src/actions/ewallet-refund.ts:149](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/actions/ewallet-refund.ts#L149)

解析回應。

#### Parameters

##### response

###### Message?

`string`

###### Result?

[`EWalletRefundResult`](../interfaces/EWalletRefundResult.md)

###### Status?

`string`

#### Returns

[`EWalletRefundResult`](../interfaces/EWalletRefundResult.md)

***

### refund()

> **refund**(`merchantOrderNo`, `amt`, `paymentType`): `Promise`\<[`EWalletRefundResult`](../interfaces/EWalletRefundResult.md)\>

Defined in: [newebpay-node/src/actions/ewallet-refund.ts:108](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/actions/ewallet-refund.ts#L108)

執行退款。

#### Parameters

##### merchantOrderNo

`string`

特店訂單編號

##### amt

`number`

退款金額

##### paymentType

[`EWalletType`](../type-aliases/EWalletType.md)

電子錢包類型

#### Returns

`Promise`\<[`EWalletRefundResult`](../interfaces/EWalletRefundResult.md)\>

***

### setTestMode()

> **setTestMode**(`isTest`): `this`

Defined in: [newebpay-node/src/actions/ewallet-refund.ts:82](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/actions/ewallet-refund.ts#L82)

設定是否為測試環境。

#### Parameters

##### isTest

`boolean`

#### Returns

`this`

***

### create()

> `static` **create**(`merchantId`, `hashKey`, `hashIV`, `httpClient?`): `EWalletRefund`

Defined in: [newebpay-node/src/actions/ewallet-refund.ts:70](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/actions/ewallet-refund.ts#L70)

從設定建立退款物件。

#### Parameters

##### merchantId

`string`

##### hashKey

`string`

##### hashIV

`string`

##### httpClient?

`HttpClientInterface`

#### Returns

`EWalletRefund`
