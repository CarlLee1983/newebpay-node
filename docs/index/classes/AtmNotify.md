[**@carllee1983/newebpay**](../../README.md)

***

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / AtmNotify

# Class: AtmNotify

Defined in: [src/notifications/atm-notify.ts:15](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/atm-notify.ts#L15)

ATM 取號通知處理器。

處理 ATM 虛擬帳號取號完成的通知。

## Implements

- [`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md)

## Constructors

### Constructor

> **new AtmNotify**(`hashKey`, `hashIV`): `AtmNotify`

Defined in: [src/notifications/atm-notify.ts:37](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/atm-notify.ts#L37)

建立通知處理器。

#### Parameters

##### hashKey

`string`

##### hashIV

`string`

#### Returns

`AtmNotify`

## Methods

### getAmt()

> **getAmt**(): `number`

Defined in: [src/notifications/atm-notify.ts:165](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/atm-notify.ts#L165)

取得交易金額。

#### Returns

`number`

***

### getBankCode()

> **getBankCode**(): `string`

Defined in: [src/notifications/atm-notify.ts:173](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/atm-notify.ts#L173)

取得銀行代碼。

#### Returns

`string`

***

### getCodeNo()

> **getCodeNo**(): `string`

Defined in: [src/notifications/atm-notify.ts:181](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/atm-notify.ts#L181)

取得虛擬帳號。

#### Returns

`string`

***

### getData()

> **getData**(): `Record`\<`string`, `unknown`\>

Defined in: [src/notifications/atm-notify.ts:114](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/atm-notify.ts#L114)

取得解密後的資料。

#### Returns

`Record`\<`string`, `unknown`\>

#### Implementation of

[`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md).[`getData`](../interfaces/NotifyHandlerInterface.md#getdata)

***

### getExpireDate()

> **getExpireDate**(): `string`

Defined in: [src/notifications/atm-notify.ts:189](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/atm-notify.ts#L189)

取得繳費截止日。

#### Returns

`string`

***

### getExpireTime()

> **getExpireTime**(): `string`

Defined in: [src/notifications/atm-notify.ts:197](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/atm-notify.ts#L197)

取得繳費截止時間。

#### Returns

`string`

***

### getMerchantOrderNo()

> **getMerchantOrderNo**(): `string`

Defined in: [src/notifications/atm-notify.ts:149](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/atm-notify.ts#L149)

取得特店訂單編號。

#### Returns

`string`

***

### getMessage()

> **getMessage**(): `string`

Defined in: [src/notifications/atm-notify.ts:142](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/atm-notify.ts#L142)

取得訊息。

#### Returns

`string`

#### Implementation of

[`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md).[`getMessage`](../interfaces/NotifyHandlerInterface.md#getmessage)

***

### getRawData()

> **getRawData**(): [`NotifyRawData`](../interfaces/NotifyRawData.md)

Defined in: [src/notifications/atm-notify.ts:121](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/atm-notify.ts#L121)

取得原始通知資料。

#### Returns

[`NotifyRawData`](../interfaces/NotifyRawData.md)

***

### getResult()

> **getResult**(): [`AtmResultData`](../interfaces/AtmResultData.md)

Defined in: [src/notifications/atm-notify.ts:205](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/atm-notify.ts#L205)

取得交易結果物件。

#### Returns

[`AtmResultData`](../interfaces/AtmResultData.md)

***

### getStatus()

> **getStatus**(): `string`

Defined in: [src/notifications/atm-notify.ts:135](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/atm-notify.ts#L135)

取得狀態。

#### Returns

`string`

#### Implementation of

[`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md).[`getStatus`](../interfaces/NotifyHandlerInterface.md#getstatus)

***

### getTradeNo()

> **getTradeNo**(): `string`

Defined in: [src/notifications/atm-notify.ts:157](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/atm-notify.ts#L157)

取得藍新金流交易序號。

#### Returns

`string`

***

### isSuccess()

> **isSuccess**(): `boolean`

Defined in: [src/notifications/atm-notify.ts:128](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/atm-notify.ts#L128)

是否成功。

#### Returns

`boolean`

#### Implementation of

[`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md).[`isSuccess`](../interfaces/NotifyHandlerInterface.md#issuccess)

***

### isVerified()

> **isVerified**(): `boolean`

Defined in: [src/notifications/atm-notify.ts:212](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/atm-notify.ts#L212)

是否已驗證。

#### Returns

`boolean`

***

### verify()

> **verify**(`data`): `boolean`

Defined in: [src/notifications/atm-notify.ts:52](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/atm-notify.ts#L52)

驗證通知資料。

#### Parameters

##### data

[`NotifyRawData`](../interfaces/NotifyRawData.md)

#### Returns

`boolean`

#### Implementation of

[`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md).[`verify`](../interfaces/NotifyHandlerInterface.md#verify)

***

### verifyOrFail()

> **verifyOrFail**(`data`): `this`

Defined in: [src/notifications/atm-notify.ts:81](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/atm-notify.ts#L81)

驗證並拋出例外。

#### Parameters

##### data

[`NotifyRawData`](../interfaces/NotifyRawData.md)

#### Returns

`this`

***

### create()

> `static` **create**(`hashKey`, `hashIV`): `AtmNotify`

Defined in: [src/notifications/atm-notify.ts:45](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/atm-notify.ts#L45)

從設定建立通知處理器。

#### Parameters

##### hashKey

`string`

##### hashIV

`string`

#### Returns

`AtmNotify`
