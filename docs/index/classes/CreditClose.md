[**@carllee1983/newebpay**](../../README.md)

---

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / CreditClose

# Class: CreditClose

Defined in: [newebpay-node/src/actions/credit-close.ts:25](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-close.ts#L25)

信用卡請退款。

對已授權的信用卡交易進行請款或退款操作。

## Constructors

### Constructor

> **new CreditClose**(`merchantId`, `hashKey`, `hashIV`, `httpClient?`): `CreditClose`

Defined in: [newebpay-node/src/actions/credit-close.ts:64](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-close.ts#L64)

建立請退款物件。

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

`CreditClose`

## Properties

### hashIV

> `protected` **hashIV**: `string`

Defined in: [newebpay-node/src/actions/credit-close.ts:67](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-close.ts#L67)

---

### hashKey

> `protected` **hashKey**: `string`

Defined in: [newebpay-node/src/actions/credit-close.ts:66](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-close.ts#L66)

---

### httpClient

> `protected` **httpClient**: `HttpClientInterface`

Defined in: [newebpay-node/src/actions/credit-close.ts:59](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-close.ts#L59)

HTTP 客戶端。

---

### isTest

> `protected` **isTest**: `boolean` = `false`

Defined in: [newebpay-node/src/actions/credit-close.ts:49](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-close.ts#L49)

是否為測試環境。

---

### merchantId

> `protected` **merchantId**: `string`

Defined in: [newebpay-node/src/actions/credit-close.ts:65](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-close.ts#L65)

---

### requestPath

> `protected` **requestPath**: `string` = `'/API/CreditCard/Close'`

Defined in: [newebpay-node/src/actions/credit-close.ts:44](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-close.ts#L44)

API 請求路徑。

---

### version

> `protected` **version**: `string` = `'1.1'`

Defined in: [newebpay-node/src/actions/credit-close.ts:39](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-close.ts#L39)

API 版本。

---

### CLOSE_TYPE_PAY

> `readonly` `static` **CLOSE_TYPE_PAY**: [`PAY`](../enumerations/CloseType.md#pay) = `CloseType.PAY`

Defined in: [newebpay-node/src/actions/credit-close.ts:29](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-close.ts#L29)

請款類型：請款。

---

### CLOSE_TYPE_REFUND

> `readonly` `static` **CLOSE_TYPE_REFUND**: [`REFUND`](../enumerations/CloseType.md#refund) = `CloseType.REFUND`

Defined in: [newebpay-node/src/actions/credit-close.ts:34](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-close.ts#L34)

請款類型：退款。

## Methods

### buildPayload()

> `protected` **buildPayload**(`postData`): `Record`\<`string`, `string`\>

Defined in: [newebpay-node/src/actions/credit-close.ts:187](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-close.ts#L187)

建立請求 Payload。

#### Parameters

##### postData

`Record`\<`string`, `unknown`\>

#### Returns

`Record`\<`string`, `string`\>

---

### cancelClose()

> **cancelClose**(`merchantOrderNo`, `amt`, `closeType`, `indexType`, `tradeNo?`): `Promise`\<[`CreditCloseResult`](../interfaces/CreditCloseResult.md)\>

Defined in: [newebpay-node/src/actions/credit-close.ts:134](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-close.ts#L134)

取消請退款。

#### Parameters

##### merchantOrderNo

`string`

##### amt

`number`

##### closeType

`number`

##### indexType

`string` = `IndexType.MERCHANT_ORDER_NO`

##### tradeNo?

`string`

#### Returns

`Promise`\<[`CreditCloseResult`](../interfaces/CreditCloseResult.md)\>

---

### execute()

> `protected` **execute**(`merchantOrderNo`, `amt`, `closeType`, `indexType`, `tradeNo?`, `cancel?`): `Promise`\<[`CreditCloseResult`](../interfaces/CreditCloseResult.md)\>

Defined in: [newebpay-node/src/actions/credit-close.ts:147](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-close.ts#L147)

執行請退款操作。

#### Parameters

##### merchantOrderNo

`string`

##### amt

`number`

##### closeType

`number`

##### indexType

`string` = `IndexType.MERCHANT_ORDER_NO`

##### tradeNo?

`string`

##### cancel?

`boolean` = `false`

#### Returns

`Promise`\<[`CreditCloseResult`](../interfaces/CreditCloseResult.md)\>

---

### getApiUrl()

> **getApiUrl**(): `string`

Defined in: [newebpay-node/src/actions/credit-close.ts:103](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-close.ts#L103)

取得完整 API 網址。

#### Returns

`string`

---

### getBaseUrl()

> **getBaseUrl**(): `string`

Defined in: [newebpay-node/src/actions/credit-close.ts:96](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-close.ts#L96)

取得 API 基礎網址。

#### Returns

`string`

---

### parseResponse()

> `protected` **parseResponse**(`response`): [`CreditCloseResult`](../interfaces/CreditCloseResult.md)

Defined in: [newebpay-node/src/actions/credit-close.ts:200](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-close.ts#L200)

解析回應。

#### Parameters

##### response

###### Message?

`string`

###### Result?

[`CreditCloseResult`](../interfaces/CreditCloseResult.md)

###### Status?

`string`

#### Returns

[`CreditCloseResult`](../interfaces/CreditCloseResult.md)

---

### pay()

> **pay**(`merchantOrderNo`, `amt`, `indexType`, `tradeNo?`): `Promise`\<[`CreditCloseResult`](../interfaces/CreditCloseResult.md)\>

Defined in: [newebpay-node/src/actions/credit-close.ts:110](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-close.ts#L110)

執行請款。

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

`Promise`\<[`CreditCloseResult`](../interfaces/CreditCloseResult.md)\>

---

### refund()

> **refund**(`merchantOrderNo`, `amt`, `indexType`, `tradeNo?`): `Promise`\<[`CreditCloseResult`](../interfaces/CreditCloseResult.md)\>

Defined in: [newebpay-node/src/actions/credit-close.ts:122](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-close.ts#L122)

執行退款。

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

`Promise`\<[`CreditCloseResult`](../interfaces/CreditCloseResult.md)\>

---

### setTestMode()

> **setTestMode**(`isTest`): `this`

Defined in: [newebpay-node/src/actions/credit-close.ts:88](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-close.ts#L88)

設定是否為測試環境。

#### Parameters

##### isTest

`boolean`

#### Returns

`this`

---

### create()

> `static` **create**(`merchantId`, `hashKey`, `hashIV`, `httpClient?`): `CreditClose`

Defined in: [newebpay-node/src/actions/credit-close.ts:76](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/actions/credit-close.ts#L76)

從設定建立請退款物件。

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

`CreditClose`
