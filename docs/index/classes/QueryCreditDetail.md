[**@carllee1983/newebpay**](../../README.md)

***

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / QueryCreditDetail

# Class: QueryCreditDetail

Defined in: [src/queries/query-credit-detail.ts:29](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-credit-detail.ts#L29)

信用卡交易明細查詢。

查詢信用卡請退款狀態。

## Constructors

### Constructor

> **new QueryCreditDetail**(`merchantId`, `hashKey`, `hashIV`): `QueryCreditDetail`

Defined in: [src/queries/query-credit-detail.ts:53](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-credit-detail.ts#L53)

建立查詢物件。

#### Parameters

##### merchantId

`string`

##### hashKey

`string`

##### hashIV

`string`

#### Returns

`QueryCreditDetail`

## Properties

### hashIV

> `protected` **hashIV**: `string`

Defined in: [src/queries/query-credit-detail.ts:56](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-credit-detail.ts#L56)

***

### hashKey

> `protected` **hashKey**: `string`

Defined in: [src/queries/query-credit-detail.ts:55](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-credit-detail.ts#L55)

***

### isTest

> `protected` **isTest**: `boolean` = `false`

Defined in: [src/queries/query-credit-detail.ts:43](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-credit-detail.ts#L43)

是否為測試環境。

***

### merchantId

> `protected` **merchantId**: `string`

Defined in: [src/queries/query-credit-detail.ts:54](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-credit-detail.ts#L54)

***

### requestPath

> `protected` **requestPath**: `string` = `"/API/CreditCard/QueryTradeInfo"`

Defined in: [src/queries/query-credit-detail.ts:38](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-credit-detail.ts#L38)

API 請求路徑。

***

### version

> `protected` **version**: `string` = `"1.1"`

Defined in: [src/queries/query-credit-detail.ts:33](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-credit-detail.ts#L33)

API 版本。

## Methods

### buildPayload()

> `protected` **buildPayload**(`merchantOrderNo`, `amt`): `Record`\<`string`, `string`\>

Defined in: [src/queries/query-credit-detail.ts:127](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-credit-detail.ts#L127)

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

Defined in: [src/queries/query-credit-detail.ts:90](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-credit-detail.ts#L90)

取得完整 API 網址。

#### Returns

`string`

***

### getBaseUrl()

> **getBaseUrl**(): `string`

Defined in: [src/queries/query-credit-detail.ts:81](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-credit-detail.ts#L81)

取得 API 基礎網址。

#### Returns

`string`

***

### parseResponse()

> `protected` **parseResponse**(`response`): [`QueryCreditDetailResult`](../interfaces/QueryCreditDetailResult.md)

Defined in: [src/queries/query-credit-detail.ts:152](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-credit-detail.ts#L152)

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

Defined in: [src/queries/query-credit-detail.ts:97](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-credit-detail.ts#L97)

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

Defined in: [src/queries/query-credit-detail.ts:73](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-credit-detail.ts#L73)

設定是否為測試環境。

#### Parameters

##### isTest

`boolean`

#### Returns

`this`

***

### create()

> `static` **create**(`merchantId`, `hashKey`, `hashIV`): `QueryCreditDetail`

Defined in: [src/queries/query-credit-detail.ts:62](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-credit-detail.ts#L62)

從設定建立查詢物件。

#### Parameters

##### merchantId

`string`

##### hashKey

`string`

##### hashIV

`string`

#### Returns

`QueryCreditDetail`
