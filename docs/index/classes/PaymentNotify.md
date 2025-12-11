[**@carllee1983/newebpay**](../../README.md)

***

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / PaymentNotify

# Class: PaymentNotify

Defined in: [newebpay-node/src/notifications/payment-notify.ts:15](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L15)

支付完成通知處理器。

處理藍新金流 ReturnURL / NotifyURL 回傳的支付結果通知。

## Implements

- [`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md)

## Constructors

### Constructor

> **new PaymentNotify**(`hashKey`, `hashIV`): `PaymentNotify`

Defined in: [newebpay-node/src/notifications/payment-notify.ts:40](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L40)

建立通知處理器。

#### Parameters

##### hashKey

`string`

HashKey

##### hashIV

`string`

HashIV

#### Returns

`PaymentNotify`

## Methods

### getAmt()

> **getAmt**(): `number`

Defined in: [newebpay-node/src/notifications/payment-notify.ts:175](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L175)

取得交易金額。

#### Returns

`number`

***

### getAuthCode()

> **getAuthCode**(): `string`

Defined in: [newebpay-node/src/notifications/payment-notify.ts:215](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L215)

取得授權碼（信用卡）。

#### Returns

`string`

***

### getCard4No()

> **getCard4No**(): `string`

Defined in: [newebpay-node/src/notifications/payment-notify.ts:223](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L223)

取得卡號末四碼（信用卡）。

#### Returns

`string`

***

### getCard6No()

> **getCard6No**(): `string`

Defined in: [newebpay-node/src/notifications/payment-notify.ts:231](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L231)

取得卡號前六碼（信用卡）。

#### Returns

`string`

***

### getData()

> **getData**(): `Record`\<`string`, `unknown`\>

Defined in: [newebpay-node/src/notifications/payment-notify.ts:117](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L117)

取得解密後的資料。

#### Returns

`Record`\<`string`, `unknown`\>

#### Implementation of

[`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md).[`getData`](../interfaces/NotifyHandlerInterface.md#getdata)

***

### getECI()

> **getECI**(): `string`

Defined in: [newebpay-node/src/notifications/payment-notify.ts:239](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L239)

取得 ECI 值（3D 驗證）。

#### Returns

`string`

***

### getInst()

> **getInst**(): `number`

Defined in: [newebpay-node/src/notifications/payment-notify.ts:247](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L247)

取得分期期數。

#### Returns

`number`

***

### getInstEach()

> **getInstEach**(): `number`

Defined in: [newebpay-node/src/notifications/payment-notify.ts:263](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L263)

取得每期金額。

#### Returns

`number`

***

### getInstFirst()

> **getInstFirst**(): `number`

Defined in: [newebpay-node/src/notifications/payment-notify.ts:255](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L255)

取得首期金額。

#### Returns

`number`

***

### getIP()

> **getIP**(): `string`

Defined in: [newebpay-node/src/notifications/payment-notify.ts:199](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L199)

取得 IP 位址。

#### Returns

`string`

***

### getMerchantID()

> **getMerchantID**(): `string`

Defined in: [newebpay-node/src/notifications/payment-notify.ts:152](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L152)

取得特店編號。

#### Returns

`string`

***

### getMerchantOrderNo()

> **getMerchantOrderNo**(): `string`

Defined in: [newebpay-node/src/notifications/payment-notify.ts:159](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L159)

取得特店訂單編號。

#### Returns

`string`

***

### getMessage()

> **getMessage**(): `string`

Defined in: [newebpay-node/src/notifications/payment-notify.ts:145](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L145)

取得訊息。

#### Returns

`string`

#### Implementation of

[`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md).[`getMessage`](../interfaces/NotifyHandlerInterface.md#getmessage)

***

### getPayBankCode()

> **getPayBankCode**(): `string`

Defined in: [newebpay-node/src/notifications/payment-notify.ts:207](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L207)

取得付款銀行。

#### Returns

`string`

***

### getPaymentType()

> **getPaymentType**(): `string`

Defined in: [newebpay-node/src/notifications/payment-notify.ts:183](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L183)

取得支付方式。

#### Returns

`string`

***

### getPayTime()

> **getPayTime**(): `string`

Defined in: [newebpay-node/src/notifications/payment-notify.ts:191](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L191)

取得交易時間。

#### Returns

`string`

***

### getRawData()

> **getRawData**(): [`NotifyRawData`](../interfaces/NotifyRawData.md)

Defined in: [newebpay-node/src/notifications/payment-notify.ts:124](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L124)

取得原始通知資料。

#### Returns

[`NotifyRawData`](../interfaces/NotifyRawData.md)

***

### getResult()

> **getResult**(): [`PaymentResultData`](../interfaces/PaymentResultData.md)

Defined in: [newebpay-node/src/notifications/payment-notify.ts:271](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L271)

取得交易結果物件。

#### Returns

[`PaymentResultData`](../interfaces/PaymentResultData.md)

***

### getStatus()

> **getStatus**(): `string`

Defined in: [newebpay-node/src/notifications/payment-notify.ts:138](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L138)

取得狀態。

#### Returns

`string`

#### Implementation of

[`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md).[`getStatus`](../interfaces/NotifyHandlerInterface.md#getstatus)

***

### getTradeNo()

> **getTradeNo**(): `string`

Defined in: [newebpay-node/src/notifications/payment-notify.ts:167](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L167)

取得藍新金流交易序號。

#### Returns

`string`

***

### isSuccess()

> **isSuccess**(): `boolean`

Defined in: [newebpay-node/src/notifications/payment-notify.ts:131](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L131)

是否成功。

#### Returns

`boolean`

#### Implementation of

[`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md).[`isSuccess`](../interfaces/NotifyHandlerInterface.md#issuccess)

***

### isVerified()

> **isVerified**(): `boolean`

Defined in: [newebpay-node/src/notifications/payment-notify.ts:278](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L278)

是否已驗證。

#### Returns

`boolean`

***

### verify()

> **verify**(`data`): `boolean`

Defined in: [newebpay-node/src/notifications/payment-notify.ts:55](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L55)

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

Defined in: [newebpay-node/src/notifications/payment-notify.ts:85](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L85)

驗證並拋出例外。

#### Parameters

##### data

[`NotifyRawData`](../interfaces/NotifyRawData.md)

#### Returns

`this`

***

### create()

> `static` **create**(`hashKey`, `hashIV`): `PaymentNotify`

Defined in: [newebpay-node/src/notifications/payment-notify.ts:48](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/notifications/payment-notify.ts#L48)

從設定建立通知處理器。

#### Parameters

##### hashKey

`string`

##### hashIV

`string`

#### Returns

`PaymentNotify`
