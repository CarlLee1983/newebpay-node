[**@carllee1983/newebpay**](../../README.md)

***

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / CvsNotify

# Class: CvsNotify

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:11](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L11)

超商取號通知處理器。

處理超商代碼/條碼繳費取號完成的通知。

## Implements

- [`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md)

## Constructors

### Constructor

> **new CvsNotify**(`hashKey`, `hashIV`): `CvsNotify`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:33](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L33)

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

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:154](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L154)

取得交易金額。

#### Returns

`number`

***

### getBarcode1()

> **getBarcode1**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:202](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L202)

取得條碼第一段。

#### Returns

`string`

***

### getBarcode2()

> **getBarcode2**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:210](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L210)

取得條碼第二段。

#### Returns

`string`

***

### getBarcode3()

> **getBarcode3**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:218](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L218)

取得條碼第三段。

#### Returns

`string`

***

### getCodeNo()

> **getCodeNo**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:170](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L170)

取得繳費代碼。

#### Returns

`string`

***

### getData()

> **getData**(): `Record`\<`string`, `unknown`\>

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:103](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L103)

取得解密後的資料。

#### Returns

`Record`\<`string`, `unknown`\>

#### Implementation of

[`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md).[`getData`](../interfaces/NotifyHandlerInterface.md#getdata)

***

### getExpireDate()

> **getExpireDate**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:186](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L186)

取得繳費截止日。

#### Returns

`string`

***

### getExpireTime()

> **getExpireTime**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:194](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L194)

取得繳費截止時間。

#### Returns

`string`

***

### getMerchantOrderNo()

> **getMerchantOrderNo**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:138](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L138)

取得特店訂單編號。

#### Returns

`string`

***

### getMessage()

> **getMessage**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:131](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L131)

取得訊息。

#### Returns

`string`

#### Implementation of

[`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md).[`getMessage`](../interfaces/NotifyHandlerInterface.md#getmessage)

***

### getPaymentType()

> **getPaymentType**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:162](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L162)

取得支付方式。

#### Returns

`string`

***

### getRawData()

> **getRawData**(): [`NotifyRawData`](../interfaces/NotifyRawData.md)

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:110](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L110)

取得原始通知資料。

#### Returns

[`NotifyRawData`](../interfaces/NotifyRawData.md)

***

### getResult()

> **getResult**(): [`CvsResultData`](../interfaces/CvsResultData.md)

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:226](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L226)

取得交易結果物件。

#### Returns

[`CvsResultData`](../interfaces/CvsResultData.md)

***

### getStatus()

> **getStatus**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:124](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L124)

取得狀態。

#### Returns

`string`

#### Implementation of

[`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md).[`getStatus`](../interfaces/NotifyHandlerInterface.md#getstatus)

***

### getStoreType()

> **getStoreType**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:178](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L178)

取得超商類型。

#### Returns

`string`

***

### getTradeNo()

> **getTradeNo**(): `string`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:146](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L146)

取得藍新金流交易序號。

#### Returns

`string`

***

### isSuccess()

> **isSuccess**(): `boolean`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:117](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L117)

是否成功。

#### Returns

`boolean`

#### Implementation of

[`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md).[`isSuccess`](../interfaces/NotifyHandlerInterface.md#issuccess)

***

### isVerified()

> **isVerified**(): `boolean`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:233](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L233)

是否已驗證。

#### Returns

`boolean`

***

### verify()

> **verify**(`data`): `boolean`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:48](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L48)

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

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:72](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L72)

驗證並拋出例外。

#### Parameters

##### data

[`NotifyRawData`](../interfaces/NotifyRawData.md)

#### Returns

`this`

***

### create()

> `static` **create**(`hashKey`, `hashIV`): `CvsNotify`

Defined in: [newebpay-node/src/notifications/cvs-notify.ts:41](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/cvs-notify.ts#L41)

從設定建立通知處理器。

#### Parameters

##### hashKey

`string`

##### hashIV

`string`

#### Returns

`CvsNotify`
