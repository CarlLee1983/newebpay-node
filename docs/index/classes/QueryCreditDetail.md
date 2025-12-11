[**@carllee1983/newebpay**](../../README.md)

***

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / QueryCreditDetail

# Class: QueryCreditDetail

Defined in: [newebpay-node/src/queries/query-credit-detail.ts:32](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/queries/query-credit-detail.ts#L32)

信用卡交易明細查詢。

查詢信用卡請退款狀態。

## Constructors

### Constructor

> **new QueryCreditDetail**(`merchantId`, `hashKey`, `hashIV`, `httpClient?`): `QueryCreditDetail`

Defined in: [newebpay-node/src/queries/query-credit-detail.ts:61](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/queries/query-credit-detail.ts#L61)

建立查詢物件。

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

`QueryCreditDetail`

## Properties

### hashIV

> `protected` **hashIV**: `string`

Defined in: [newebpay-node/src/queries/query-credit-detail.ts:64](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/queries/query-credit-detail.ts#L64)

***

### hashKey

> `protected` **hashKey**: `string`

Defined in: [newebpay-node/src/queries/query-credit-detail.ts:63](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/queries/query-credit-detail.ts#L63)

***

### httpClient

> `protected` **httpClient**: `HttpClientInterface`

Defined in: [newebpay-node/src/queries/query-credit-detail.ts:56](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/queries/query-credit-detail.ts#L56)

HTTP 客戶端。

***

### isTest

> `protected` **isTest**: `boolean` = `false`

Defined in: [newebpay-node/src/queries/query-credit-detail.ts:46](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/queries/query-credit-detail.ts#L46)

是否為測試環境。

***

### merchantId

> `protected` **merchantId**: `string`

Defined in: [newebpay-node/src/queries/query-credit-detail.ts:62](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/queries/query-credit-detail.ts#L62)

***

### requestPath

> `protected` **requestPath**: `string` = `'/API/CreditCard/QueryTradeInfo'`

Defined in: [newebpay-node/src/queries/query-credit-detail.ts:41](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/queries/query-credit-detail.ts#L41)

API 請求路徑。

***

### version

> `protected` **version**: `string` = `'1.1'`

Defined in: [newebpay-node/src/queries/query-credit-detail.ts:36](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/queries/query-credit-detail.ts#L36)

API 版本。

## Methods

### buildPayload()

> `protected` **buildPayload**(`merchantOrderNo`, `amt`): `Record`\<`string`, `string`\>

Defined in: [newebpay-node/src/queries/query-credit-detail.ts:122](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/queries/query-credit-detail.ts#L122)

建立請求 Payload。

#### Parameters

##### merchantOrderNo

`string`

##### amt

`number`

#### Returns

`Record`\<`string`, `string`\>

***

### getApiUrl()

> **getApiUrl**(): `string`

Defined in: [newebpay-node/src/queries/query-credit-detail.ts:100](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/queries/query-credit-detail.ts#L100)

取得完整 API 網址。

#### Returns

`string`

***

### getBaseUrl()

> **getBaseUrl**(): `string`

Defined in: [newebpay-node/src/queries/query-credit-detail.ts:93](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/queries/query-credit-detail.ts#L93)

取得 API 基礎網址。

#### Returns

`string`

***

### parseResponse()

> `protected` **parseResponse**(`response`): [`QueryCreditDetailResult`](../interfaces/QueryCreditDetailResult.md)

Defined in: [newebpay-node/src/queries/query-credit-detail.ts:144](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/queries/query-credit-detail.ts#L144)

解析回應。

#### Parameters

##### response

###### Message?

`string`

###### Result?

[`QueryCreditDetailResult`](../interfaces/QueryCreditDetailResult.md)

###### Status?

`string`

#### Returns

[`QueryCreditDetailResult`](../interfaces/QueryCreditDetailResult.md)

***

### query()

> **query**(`merchantOrderNo`, `amt`): `Promise`\<[`QueryCreditDetailResult`](../interfaces/QueryCreditDetailResult.md)\>

Defined in: [newebpay-node/src/queries/query-credit-detail.ts:107](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/queries/query-credit-detail.ts#L107)

執行查詢。

#### Parameters

##### merchantOrderNo

`string`

##### amt

`number`

#### Returns

`Promise`\<[`QueryCreditDetailResult`](../interfaces/QueryCreditDetailResult.md)\>

***

### setTestMode()

> **setTestMode**(`isTest`): `this`

Defined in: [newebpay-node/src/queries/query-credit-detail.ts:85](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/queries/query-credit-detail.ts#L85)

設定是否為測試環境。

#### Parameters

##### isTest

`boolean`

#### Returns

`this`

***

### create()

> `static` **create**(`merchantId`, `hashKey`, `hashIV`, `httpClient?`): `QueryCreditDetail`

Defined in: [newebpay-node/src/queries/query-credit-detail.ts:73](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/queries/query-credit-detail.ts#L73)

從設定建立查詢物件。

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

`QueryCreditDetail`
