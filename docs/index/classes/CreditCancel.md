[**@carllee1983/newebpay**](../../README.md)

***

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / CreditCancel

# Class: CreditCancel

Defined in: [newebpay-node/src/actions/credit-cancel.ts:24](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-cancel.ts#L24)

信用卡取消授權。

取消尚未請款的信用卡授權交易。

## Constructors

### Constructor

> **new CreditCancel**(`merchantId`, `hashKey`, `hashIV`, `httpClient?`): `CreditCancel`

Defined in: [newebpay-node/src/actions/credit-cancel.ts:53](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-cancel.ts#L53)

建立取消授權物件。

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

`CreditCancel`

## Properties

### hashIV

> `protected` **hashIV**: `string`

Defined in: [newebpay-node/src/actions/credit-cancel.ts:56](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-cancel.ts#L56)

***

### hashKey

> `protected` **hashKey**: `string`

Defined in: [newebpay-node/src/actions/credit-cancel.ts:55](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-cancel.ts#L55)

***

### httpClient

> `protected` **httpClient**: `HttpClientInterface`

Defined in: [newebpay-node/src/actions/credit-cancel.ts:48](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-cancel.ts#L48)

HTTP 客戶端。

***

### isTest

> `protected` **isTest**: `boolean` = `false`

Defined in: [newebpay-node/src/actions/credit-cancel.ts:38](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-cancel.ts#L38)

是否為測試環境。

***

### merchantId

> `protected` **merchantId**: `string`

Defined in: [newebpay-node/src/actions/credit-cancel.ts:54](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-cancel.ts#L54)

***

### requestPath

> `protected` **requestPath**: `string` = `'/API/CreditCard/Cancel'`

Defined in: [newebpay-node/src/actions/credit-cancel.ts:33](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-cancel.ts#L33)

API 請求路徑。

***

### version

> `protected` **version**: `string` = `'1.0'`

Defined in: [newebpay-node/src/actions/credit-cancel.ts:28](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-cancel.ts#L28)

API 版本。

## Methods

### buildPayload()

> `protected` **buildPayload**(`postData`): `Record`\<`string`, `string`\>

Defined in: [newebpay-node/src/actions/credit-cancel.ts:132](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-cancel.ts#L132)

建立請求 Payload。

#### Parameters

##### postData

`Record`\<`string`, `unknown`\>

#### Returns

`Record`\<`string`, `string`\>

***

### cancel()

> **cancel**(`merchantOrderNo`, `amt`, `indexType`, `tradeNo?`): `Promise`\<[`CreditCancelResult`](../interfaces/CreditCancelResult.md)\>

Defined in: [newebpay-node/src/actions/credit-cancel.ts:99](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-cancel.ts#L99)

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

Defined in: [newebpay-node/src/actions/credit-cancel.ts:92](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-cancel.ts#L92)

取得完整 API 網址。

#### Returns

`string`

***

### getBaseUrl()

> **getBaseUrl**(): `string`

Defined in: [newebpay-node/src/actions/credit-cancel.ts:85](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-cancel.ts#L85)

取得 API 基礎網址。

#### Returns

`string`

***

### parseResponse()

> `protected` **parseResponse**(`response`): [`CreditCancelResult`](../interfaces/CreditCancelResult.md)

Defined in: [newebpay-node/src/actions/credit-cancel.ts:145](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-cancel.ts#L145)

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

Defined in: [newebpay-node/src/actions/credit-cancel.ts:77](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-cancel.ts#L77)

設定是否為測試環境。

#### Parameters

##### isTest

`boolean`

#### Returns

`this`

***

### create()

> `static` **create**(`merchantId`, `hashKey`, `hashIV`, `httpClient?`): `CreditCancel`

Defined in: [newebpay-node/src/actions/credit-cancel.ts:65](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-cancel.ts#L65)

從設定建立取消授權物件。

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

`CreditCancel`
