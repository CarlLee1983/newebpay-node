[**@carllee1983/newebpay**](../../README.md)

***

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / CreditClose

# Class: CreditClose

Defined in: [src/actions/credit-close.ts:22](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-close.ts#L22)

信用卡請退款。

對已授權的信用卡交易進行請款或退款操作。

## Constructors

### Constructor

> **new CreditClose**(`merchantId`, `hashKey`, `hashIV`): `CreditClose`

Defined in: [src/actions/credit-close.ts:56](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-close.ts#L56)

建立請退款物件。

#### Parameters

##### merchantId

`string`

##### hashKey

`string`

##### hashIV

`string`

#### Returns

`CreditClose`

## Properties

### hashIV

> `protected` **hashIV**: `string`

Defined in: [src/actions/credit-close.ts:59](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-close.ts#L59)

***

### hashKey

> `protected` **hashKey**: `string`

Defined in: [src/actions/credit-close.ts:58](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-close.ts#L58)

***

### isTest

> `protected` **isTest**: `boolean` = `false`

Defined in: [src/actions/credit-close.ts:46](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-close.ts#L46)

是否為測試環境。

***

### merchantId

> `protected` **merchantId**: `string`

Defined in: [src/actions/credit-close.ts:57](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-close.ts#L57)

***

### requestPath

> `protected` **requestPath**: `string` = `"/API/CreditCard/Close"`

Defined in: [src/actions/credit-close.ts:41](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-close.ts#L41)

API 請求路徑。

***

### version

> `protected` **version**: `string` = `"1.1"`

Defined in: [src/actions/credit-close.ts:36](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-close.ts#L36)

API 版本。

***

### CLOSE\_TYPE\_PAY

> `readonly` `static` **CLOSE\_TYPE\_PAY**: [`PAY`](../enumerations/CloseType.md#pay) = `CloseType.PAY`

Defined in: [src/actions/credit-close.ts:26](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-close.ts#L26)

請款類型：請款。

***

### CLOSE\_TYPE\_REFUND

> `readonly` `static` **CLOSE\_TYPE\_REFUND**: [`REFUND`](../enumerations/CloseType.md#refund) = `CloseType.REFUND`

Defined in: [src/actions/credit-close.ts:31](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-close.ts#L31)

請款類型：退款。

## Methods

### buildPayload()

> `protected` **buildPayload**(`postData`): `Record`\<`string`, `string`\>

Defined in: [src/actions/credit-close.ts:208](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-close.ts#L208)

建立請求 Payload。

#### Parameters

##### postData

`Record`\<`string`, `unknown`\>

#### Returns

`Record`\<`string`, `string`\>

***

### cancelClose()

> **cancelClose**(`merchantOrderNo`, `amt`, `closeType`, `indexType`, `tradeNo?`): `Promise`\<[`CreditCloseResult`](../interfaces/CreditCloseResult.md)\>

Defined in: [src/actions/credit-close.ts:136](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-close.ts#L136)

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

***

### execute()

> `protected` **execute**(`merchantOrderNo`, `amt`, `closeType`, `indexType`, `tradeNo?`, `cancel?`): `Promise`\<[`CreditCloseResult`](../interfaces/CreditCloseResult.md)\>

Defined in: [src/actions/credit-close.ts:156](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-close.ts#L156)

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

***

### getApiUrl()

> **getApiUrl**(): `string`

Defined in: [src/actions/credit-close.ts:93](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-close.ts#L93)

取得完整 API 網址。

#### Returns

`string`

***

### getBaseUrl()

> **getBaseUrl**(): `string`

Defined in: [src/actions/credit-close.ts:84](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-close.ts#L84)

取得 API 基礎網址。

#### Returns

`string`

***

### parseResponse()

> `protected` **parseResponse**(`response`): [`CreditCloseResult`](../interfaces/CreditCloseResult.md)

Defined in: [src/actions/credit-close.ts:223](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-close.ts#L223)

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

***

### pay()

> **pay**(`merchantOrderNo`, `amt`, `indexType`, `tradeNo?`): `Promise`\<[`CreditCloseResult`](../interfaces/CreditCloseResult.md)\>

Defined in: [src/actions/credit-close.ts:100](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-close.ts#L100)

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

***

### refund()

> **refund**(`merchantOrderNo`, `amt`, `indexType`, `tradeNo?`): `Promise`\<[`CreditCloseResult`](../interfaces/CreditCloseResult.md)\>

Defined in: [src/actions/credit-close.ts:118](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-close.ts#L118)

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

***

### setTestMode()

> **setTestMode**(`isTest`): `this`

Defined in: [src/actions/credit-close.ts:76](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-close.ts#L76)

設定是否為測試環境。

#### Parameters

##### isTest

`boolean`

#### Returns

`this`

***

### create()

> `static` **create**(`merchantId`, `hashKey`, `hashIV`): `CreditClose`

Defined in: [src/actions/credit-close.ts:65](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/actions/credit-close.ts#L65)

從設定建立請退款物件。

#### Parameters

##### merchantId

`string`

##### hashKey

`string`

##### hashIV

`string`

#### Returns

`CreditClose`
