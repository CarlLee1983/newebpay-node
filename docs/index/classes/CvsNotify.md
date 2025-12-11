[**@carllee1983/newebpay**](../../README.md)

***

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / CvsNotify

# Class: CvsNotify

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:15](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L15)

超商取號通知處理器。

處理超商代碼/條碼繳費取號完成的通知。

## Implements

- [`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md)

## Constructors

### Constructor

> **new CvsNotify**(`hashKey`, `hashIV`): `CvsNotify`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:37](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L37)

建立通知處理器。

#### Parameters

##### hashKey

`string`

##### hashIV

`string`

#### Returns

`CvsNotify`

## Methods

### getAmt()

> **getAmt**(): `number`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:158](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L158)

取得交易金額。

#### Returns

`number`

***

### getBarcode1()

> **getBarcode1**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:206](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L206)

取得條碼第一段。

#### Returns

`string`

***

### getBarcode2()

> **getBarcode2**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:214](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L214)

取得條碼第二段。

#### Returns

`string`

***

### getBarcode3()

> **getBarcode3**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:222](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L222)

取得條碼第三段。

#### Returns

`string`

***

### getCodeNo()

> **getCodeNo**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:174](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L174)

取得繳費代碼。

#### Returns

`string`

***

### getData()

> **getData**(): `Record`\<`string`, `unknown`\>

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:107](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L107)

取得解密後的資料。

#### Returns

`Record`\<`string`, `unknown`\>

#### Implementation of

[`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md).[`getData`](../interfaces/NotifyHandlerInterface.md#getdata)

***

### getExpireDate()

> **getExpireDate**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:190](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L190)

取得繳費截止日。

#### Returns

`string`

***

### getExpireTime()

> **getExpireTime**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:198](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L198)

取得繳費截止時間。

#### Returns

`string`

***

### getMerchantOrderNo()

> **getMerchantOrderNo**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:142](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L142)

取得特店訂單編號。

#### Returns

`string`

***

### getMessage()

> **getMessage**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:135](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L135)

取得訊息。

#### Returns

`string`

#### Implementation of

[`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md).[`getMessage`](../interfaces/NotifyHandlerInterface.md#getmessage)

***

### getPaymentType()

> **getPaymentType**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:166](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L166)

取得支付方式。

#### Returns

`string`

***

### getRawData()

> **getRawData**(): [`NotifyRawData`](../interfaces/NotifyRawData.md)

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:114](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L114)

取得原始通知資料。

#### Returns

[`NotifyRawData`](../interfaces/NotifyRawData.md)

***

### getResult()

> **getResult**(): [`CvsResultData`](../interfaces/CvsResultData.md)

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:230](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L230)

取得交易結果物件。

#### Returns

[`CvsResultData`](../interfaces/CvsResultData.md)

***

### getStatus()

> **getStatus**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:128](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L128)

取得狀態。

#### Returns

`string`

#### Implementation of

[`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md).[`getStatus`](../interfaces/NotifyHandlerInterface.md#getstatus)

***

### getStoreType()

> **getStoreType**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:182](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L182)

取得超商類型。

#### Returns

`string`

***

### getTradeNo()

> **getTradeNo**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:150](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L150)

取得藍新金流交易序號。

#### Returns

`string`

***

### isSuccess()

> **isSuccess**(): `boolean`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:121](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L121)

是否成功。

#### Returns

`boolean`

#### Implementation of

[`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md).[`isSuccess`](../interfaces/NotifyHandlerInterface.md#issuccess)

***

### isVerified()

> **isVerified**(): `boolean`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:237](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L237)

是否已驗證。

#### Returns

`boolean`

***

### verify()

> **verify**(`data`): `boolean`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:52](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L52)

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

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:76](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L76)

驗證並拋出例外。

#### Parameters

##### data

[`NotifyRawData`](../interfaces/NotifyRawData.md)

#### Returns

`this`

***

### create()

> `static` **create**(`hashKey`, `hashIV`): `CvsNotify`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:45](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/notifications/cvs-notify.ts#L45)

從設定建立通知處理器。

#### Parameters

##### hashKey

`string`

##### hashIV

`string`

#### Returns

`CvsNotify`
