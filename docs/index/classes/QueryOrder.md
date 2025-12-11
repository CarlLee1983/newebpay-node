[**@carllee1983/newebpay**](../../README.md)

---

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / QueryOrder

# Class: QueryOrder

Defined in: [newebpay-node/src/queries/query-order.ts:30](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/queries/query-order.ts#L30)

交易查詢。

查詢藍新金流交易訂單狀態。

## Constructors

### Constructor

> **new QueryOrder**(`merchantId`, `hashKey`, `hashIV`, `httpClient?`): `QueryOrder`

Defined in: [newebpay-node/src/queries/query-order.ts:51](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/queries/query-order.ts#L51)

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

`QueryOrder`

## Properties

### hashIV

> `protected` **hashIV**: `string`

Defined in: [newebpay-node/src/queries/query-order.ts:54](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/queries/query-order.ts#L54)

---

### hashKey

> `protected` **hashKey**: `string`

Defined in: [newebpay-node/src/queries/query-order.ts:53](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/queries/query-order.ts#L53)

---

### httpClient

> `protected` **httpClient**: `HttpClientInterface`

Defined in: [newebpay-node/src/queries/query-order.ts:46](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/queries/query-order.ts#L46)

---

### isTest

> `protected` **isTest**: `boolean` = `false`

Defined in: [newebpay-node/src/queries/query-order.ts:44](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/queries/query-order.ts#L44)

是否為測試環境。

---

### merchantId

> `protected` **merchantId**: `string`

Defined in: [newebpay-node/src/queries/query-order.ts:52](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/queries/query-order.ts#L52)

---

### requestPath

> `protected` **requestPath**: `string` = `'/API/QueryTradeInfo'`

Defined in: [newebpay-node/src/queries/query-order.ts:39](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/queries/query-order.ts#L39)

API 請求路徑。

---

### version

> `protected` **version**: `string` = `'1.3'`

Defined in: [newebpay-node/src/queries/query-order.ts:34](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/queries/query-order.ts#L34)

API 版本。

## Methods

### buildPayload()

> `protected` **buildPayload**(`merchantOrderNo`, `amt`): `Record`\<`string`, `string`\>

Defined in: [newebpay-node/src/queries/query-order.ts:113](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/queries/query-order.ts#L113)

建立請求 Payload。

#### Parameters

##### merchantOrderNo

`string`

##### amt

`number`

#### Returns

`Record`\<`string`, `string`\>

---

### generateCheckValue()

> `protected` **generateCheckValue**(`merchantOrderNo`, `amt`): `string`

Defined in: [newebpay-node/src/queries/query-order.ts:133](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/queries/query-order.ts#L133)

產生查詢用 CheckValue。

查詢 API 的 CheckValue 計算方式與 MPG 不同：
SHA256(HashIV={HashIV}&Amt={Amt}&MerchantID={MerchantID}&MerchantOrderNo={MerchantOrderNo}&HashKey={HashKey})

#### Parameters

##### merchantOrderNo

`string`

##### amt

`number`

#### Returns

`string`

---

### getApiUrl()

> **getApiUrl**(): `string`

Defined in: [newebpay-node/src/queries/query-order.ts:90](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/queries/query-order.ts#L90)

取得完整 API 網址。

#### Returns

`string`

---

### getBaseUrl()

> **getBaseUrl**(): `string`

Defined in: [newebpay-node/src/queries/query-order.ts:83](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/queries/query-order.ts#L83)

取得 API 基礎網址。

#### Returns

`string`

---

### parseResponse()

> `protected` **parseResponse**(`response`): [`QueryOrderResult`](../interfaces/QueryOrderResult.md)

Defined in: [newebpay-node/src/queries/query-order.ts:141](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/queries/query-order.ts#L141)

解析回應。

#### Parameters

##### response

###### Message?

`string`

###### Result?

[`QueryOrderResult`](../interfaces/QueryOrderResult.md)

###### Status?

`string`

#### Returns

[`QueryOrderResult`](../interfaces/QueryOrderResult.md)

---

### query()

> **query**(`merchantOrderNo`, `amt`): `Promise`\<[`QueryOrderResult`](../interfaces/QueryOrderResult.md)\>

Defined in: [newebpay-node/src/queries/query-order.ts:97](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/queries/query-order.ts#L97)

執行查詢。

#### Parameters

##### merchantOrderNo

`string`

##### amt

`number`

#### Returns

`Promise`\<[`QueryOrderResult`](../interfaces/QueryOrderResult.md)\>

---

### setTestMode()

> **setTestMode**(`isTest`): `this`

Defined in: [newebpay-node/src/queries/query-order.ts:75](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/queries/query-order.ts#L75)

設定是否為測試環境。

#### Parameters

##### isTest

`boolean`

#### Returns

`this`

---

### create()

> `static` **create**(`merchantId`, `hashKey`, `hashIV`, `httpClient?`): `QueryOrder`

Defined in: [newebpay-node/src/queries/query-order.ts:63](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/queries/query-order.ts#L63)

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

`QueryOrder`
