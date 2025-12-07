[**@carllee1983/newebpay**](../../README.md)

---

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / QueryOrder

# Class: QueryOrder

Defined in: [src/queries/query-order.ts:27](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-order.ts#L27)

交易查詢。

查詢藍新金流交易訂單狀態。

## Constructors

### Constructor

> **new QueryOrder**(`merchantId`, `hashKey`, `hashIV`): `QueryOrder`

Defined in: [src/queries/query-order.ts:46](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-order.ts#L46)

建立查詢物件。

#### Parameters

##### merchantId

`string`

##### hashKey

`string`

##### hashIV

`string`

#### Returns

`QueryOrder`

## Properties

### hashIV

> `protected` **hashIV**: `string`

Defined in: [src/queries/query-order.ts:49](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-order.ts#L49)

---

### hashKey

> `protected` **hashKey**: `string`

Defined in: [src/queries/query-order.ts:48](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-order.ts#L48)

---

### isTest

> `protected` **isTest**: `boolean` = `false`

Defined in: [src/queries/query-order.ts:41](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-order.ts#L41)

是否為測試環境。

---

### merchantId

> `protected` **merchantId**: `string`

Defined in: [src/queries/query-order.ts:47](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-order.ts#L47)

---

### requestPath

> `protected` **requestPath**: `string` = `"/API/QueryTradeInfo"`

Defined in: [src/queries/query-order.ts:36](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-order.ts#L36)

API 請求路徑。

---

### version

> `protected` **version**: `string` = `"1.3"`

Defined in: [src/queries/query-order.ts:31](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-order.ts#L31)

API 版本。

## Methods

### buildPayload()

> `protected` **buildPayload**(`merchantOrderNo`, `amt`): `Record`\<`string`, `string`\>

Defined in: [src/queries/query-order.ts:117](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-order.ts#L117)

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

Defined in: [src/queries/query-order.ts:141](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-order.ts#L141)

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

Defined in: [src/queries/query-order.ts:83](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-order.ts#L83)

取得完整 API 網址。

#### Returns

`string`

---

### getBaseUrl()

> **getBaseUrl**(): `string`

Defined in: [src/queries/query-order.ts:74](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-order.ts#L74)

取得 API 基礎網址。

#### Returns

`string`

---

### parseResponse()

> `protected` **parseResponse**(`response`): [`QueryOrderResult`](../interfaces/QueryOrderResult.md)

Defined in: [src/queries/query-order.ts:149](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-order.ts#L149)

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

Defined in: [src/queries/query-order.ts:90](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-order.ts#L90)

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

Defined in: [src/queries/query-order.ts:66](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-order.ts#L66)

設定是否為測試環境。

#### Parameters

##### isTest

`boolean`

#### Returns

`this`

---

### create()

> `static` **create**(`merchantId`, `hashKey`, `hashIV`): `QueryOrder`

Defined in: [src/queries/query-order.ts:55](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/queries/query-order.ts#L55)

從設定建立查詢物件。

#### Parameters

##### merchantId

`string`

##### hashKey

`string`

##### hashIV

`string`

#### Returns

`QueryOrder`
