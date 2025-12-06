[**@carllee1983/newebpay**](../../README.md)

***

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / CreditCancel

# Class: CreditCancel

Defined in: [src/actions/credit-cancel.ts:21](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-cancel.ts#L21)

信用卡取消授權。

取消尚未請款的信用卡授權交易。

## Constructors

### Constructor

> **new CreditCancel**(`merchantId`, `hashKey`, `hashIV`): `CreditCancel`

Defined in: [src/actions/credit-cancel.ts:45](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-cancel.ts#L45)

建立取消授權物件。

#### Parameters

##### merchantId

`string`

##### hashKey

`string`

##### hashIV

`string`

#### Returns

`CreditCancel`

## Properties

### hashIV

> `protected` **hashIV**: `string`

Defined in: [src/actions/credit-cancel.ts:48](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-cancel.ts#L48)

***

### hashKey

> `protected` **hashKey**: `string`

Defined in: [src/actions/credit-cancel.ts:47](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-cancel.ts#L47)

***

### isTest

> `protected` **isTest**: `boolean` = `false`

Defined in: [src/actions/credit-cancel.ts:35](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-cancel.ts#L35)

是否為測試環境。

***

### merchantId

> `protected` **merchantId**: `string`

Defined in: [src/actions/credit-cancel.ts:46](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-cancel.ts#L46)

***

### requestPath

> `protected` **requestPath**: `string` = `"/API/CreditCard/Cancel"`

Defined in: [src/actions/credit-cancel.ts:30](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-cancel.ts#L30)

API 請求路徑。

***

### version

> `protected` **version**: `string` = `"1.0"`

Defined in: [src/actions/credit-cancel.ts:25](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-cancel.ts#L25)

API 版本。

## Methods

### buildPayload()

> `protected` **buildPayload**(`postData`): `Record`\<`string`, `string`\>

Defined in: [src/actions/credit-cancel.ts:134](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-cancel.ts#L134)

建立請求 Payload。

#### Parameters

##### postData

`Record`\<`string`, `unknown`\>

#### Returns

`Record`\<`string`, `string`\>

***

### cancel()

> **cancel**(`merchantOrderNo`, `amt`, `indexType`, `tradeNo?`): `Promise`\<[`CreditCancelResult`](../interfaces/CreditCancelResult.md)\>

Defined in: [src/actions/credit-cancel.ts:89](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-cancel.ts#L89)

執行取消授權。

#### Parameters

##### merchantOrderNo

`string`

##### amt

`number`

##### indexType

`string` = `IndexType.MERCHANT_ORDER_NO`

##### tradeNo?

`string`

#### Returns

`Promise`\<[`CreditCancelResult`](../interfaces/CreditCancelResult.md)\>

***

### getApiUrl()

> **getApiUrl**(): `string`

Defined in: [src/actions/credit-cancel.ts:82](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-cancel.ts#L82)

取得完整 API 網址。

#### Returns

`string`

***

### getBaseUrl()

> **getBaseUrl**(): `string`

Defined in: [src/actions/credit-cancel.ts:73](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-cancel.ts#L73)

取得 API 基礎網址。

#### Returns

`string`

***

### parseResponse()

> `protected` **parseResponse**(`response`): [`CreditCancelResult`](../interfaces/CreditCancelResult.md)

Defined in: [src/actions/credit-cancel.ts:149](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-cancel.ts#L149)

解析回應。

#### Parameters

##### response

###### Message?

`string`

###### Result?

[`CreditCancelResult`](../interfaces/CreditCancelResult.md)

###### Status?

`string`

#### Returns

[`CreditCancelResult`](../interfaces/CreditCancelResult.md)

***

### setTestMode()

> **setTestMode**(`isTest`): `this`

Defined in: [src/actions/credit-cancel.ts:65](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-cancel.ts#L65)

設定是否為測試環境。

#### Parameters

##### isTest

`boolean`

#### Returns

`this`

***

### create()

> `static` **create**(`merchantId`, `hashKey`, `hashIV`): `CreditCancel`

Defined in: [src/actions/credit-cancel.ts:54](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-cancel.ts#L54)

從設定建立取消授權物件。

#### Parameters

##### merchantId

`string`

##### hashKey

`string`

##### hashIV

`string`

#### Returns

`CreditCancel`
