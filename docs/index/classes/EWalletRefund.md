[**@carllee1983/newebpay**](../../README.md)

***

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / EWalletRefund

# Class: EWalletRefund

Defined in: [src/actions/ewallet-refund.ts:26](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/ewallet-refund.ts#L26)

電子錢包退款。

對 LINE Pay、玉山 Wallet、台灣 Pay 等電子錢包交易進行退款。

## Constructors

### Constructor

> **new EWalletRefund**(`merchantId`, `hashKey`, `hashIV`): `EWalletRefund`

Defined in: [src/actions/ewallet-refund.ts:50](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/ewallet-refund.ts#L50)

建立退款物件。

#### Parameters

##### merchantId

`string`

##### hashKey

`string`

##### hashIV

`string`

#### Returns

`EWalletRefund`

## Properties

### hashIV

> `protected` **hashIV**: `string`

Defined in: [src/actions/ewallet-refund.ts:53](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/ewallet-refund.ts#L53)

***

### hashKey

> `protected` **hashKey**: `string`

Defined in: [src/actions/ewallet-refund.ts:52](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/ewallet-refund.ts#L52)

***

### isTest

> `protected` **isTest**: `boolean` = `false`

Defined in: [src/actions/ewallet-refund.ts:40](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/ewallet-refund.ts#L40)

是否為測試環境。

***

### merchantId

> `protected` **merchantId**: `string`

Defined in: [src/actions/ewallet-refund.ts:51](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/ewallet-refund.ts#L51)

***

### requestPath

> `protected` **requestPath**: `string` = `"/API/EWallet/Refund"`

Defined in: [src/actions/ewallet-refund.ts:35](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/ewallet-refund.ts#L35)

API 請求路徑。

***

### version

> `protected` **version**: `string` = `"1.0"`

Defined in: [src/actions/ewallet-refund.ts:30](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/ewallet-refund.ts#L30)

API 版本。

## Methods

### buildPayload()

> `protected` **buildPayload**(`postData`): `Record`\<`string`, `string`\>

Defined in: [src/actions/ewallet-refund.ts:138](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/ewallet-refund.ts#L138)

建立請求 Payload。

#### Parameters

##### postData

`Record`\<`string`, `unknown`\>

#### Returns

`Record`\<`string`, `string`\>

***

### getApiUrl()

> **getApiUrl**(): `string`

Defined in: [src/actions/ewallet-refund.ts:87](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/ewallet-refund.ts#L87)

取得完整 API 網址。

#### Returns

`string`

***

### getBaseUrl()

> **getBaseUrl**(): `string`

Defined in: [src/actions/ewallet-refund.ts:78](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/ewallet-refund.ts#L78)

取得 API 基礎網址。

#### Returns

`string`

***

### parseResponse()

> `protected` **parseResponse**(`response`): [`EWalletRefundResult`](../interfaces/EWalletRefundResult.md)

Defined in: [src/actions/ewallet-refund.ts:153](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/ewallet-refund.ts#L153)

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

Defined in: [src/actions/ewallet-refund.ts:98](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/ewallet-refund.ts#L98)

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

Defined in: [src/actions/ewallet-refund.ts:70](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/ewallet-refund.ts#L70)

設定是否為測試環境。

#### Parameters

##### isTest

`boolean`

#### Returns

`this`

***

### create()

> `static` **create**(`merchantId`, `hashKey`, `hashIV`): `EWalletRefund`

Defined in: [src/actions/ewallet-refund.ts:59](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/ewallet-refund.ts#L59)

從設定建立退款物件。

#### Parameters

##### merchantId

`string`

##### hashKey

`string`

##### hashIV

`string`

#### Returns

`EWalletRefund`
