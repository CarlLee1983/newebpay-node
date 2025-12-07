[**@carllee1983/newebpay**](../../README.md)

---

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / CvscomNotify

# Class: CvscomNotify

Defined in: [src/notifications/cvscom-notify.ts:15](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L15)

超商取貨付款通知處理器。

處理超商取貨付款的通知。

## Implements

- [`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md)

## Constructors

### Constructor

> **new CvscomNotify**(`hashKey`, `hashIV`): `CvscomNotify`

Defined in: [src/notifications/cvscom-notify.ts:37](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L37)

建立通知處理器。

#### Parameters

##### hashKey

`string`

##### hashIV

`string`

#### Returns

`CvscomNotify`

## Methods

### getAmt()

> **getAmt**(): `number`

Defined in: [src/notifications/cvscom-notify.ts:165](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L165)

取得交易金額。

#### Returns

`number`

---

### getCVSCOMName()

> **getCVSCOMName**(): `string`

Defined in: [src/notifications/cvscom-notify.ts:213](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L213)

取得取貨人姓名。

#### Returns

`string`

---

### getCVSCOMPhone()

> **getCVSCOMPhone**(): `string`

Defined in: [src/notifications/cvscom-notify.ts:221](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L221)

取得取貨人電話。

#### Returns

`string`

---

### getData()

> **getData**(): `Record`\<`string`, `unknown`\>

Defined in: [src/notifications/cvscom-notify.ts:114](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L114)

取得解密後的資料。

#### Returns

`Record`\<`string`, `unknown`\>

#### Implementation of

[`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md).[`getData`](../interfaces/NotifyHandlerInterface.md#getdata)

---

### getLgsNo()

> **getLgsNo**(): `string`

Defined in: [src/notifications/cvscom-notify.ts:229](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L229)

取得物流編號。

#### Returns

`string`

---

### getLgsType()

> **getLgsType**(): `string`

Defined in: [src/notifications/cvscom-notify.ts:237](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L237)

取得物流類型。

#### Returns

`string`

---

### getMerchantOrderNo()

> **getMerchantOrderNo**(): `string`

Defined in: [src/notifications/cvscom-notify.ts:149](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L149)

取得特店訂單編號。

#### Returns

`string`

---

### getMessage()

> **getMessage**(): `string`

Defined in: [src/notifications/cvscom-notify.ts:142](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L142)

取得訊息。

#### Returns

`string`

#### Implementation of

[`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md).[`getMessage`](../interfaces/NotifyHandlerInterface.md#getmessage)

---

### getPaymentType()

> **getPaymentType**(): `string`

Defined in: [src/notifications/cvscom-notify.ts:173](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L173)

取得支付方式。

#### Returns

`string`

---

### getRawData()

> **getRawData**(): [`NotifyRawData`](../interfaces/NotifyRawData.md)

Defined in: [src/notifications/cvscom-notify.ts:121](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L121)

取得原始通知資料。

#### Returns

[`NotifyRawData`](../interfaces/NotifyRawData.md)

---

### getResult()

> **getResult**(): [`CvscomResultData`](../interfaces/CvscomResultData.md)

Defined in: [src/notifications/cvscom-notify.ts:245](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L245)

取得交易結果物件。

#### Returns

[`CvscomResultData`](../interfaces/CvscomResultData.md)

---

### getStatus()

> **getStatus**(): `string`

Defined in: [src/notifications/cvscom-notify.ts:135](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L135)

取得狀態。

#### Returns

`string`

#### Implementation of

[`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md).[`getStatus`](../interfaces/NotifyHandlerInterface.md#getstatus)

---

### getStoreAddr()

> **getStoreAddr**(): `string`

Defined in: [src/notifications/cvscom-notify.ts:205](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L205)

取得門市地址。

#### Returns

`string`

---

### getStoreCode()

> **getStoreCode**(): `string`

Defined in: [src/notifications/cvscom-notify.ts:189](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L189)

取得門市代碼。

#### Returns

`string`

---

### getStoreName()

> **getStoreName**(): `string`

Defined in: [src/notifications/cvscom-notify.ts:197](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L197)

取得門市名稱。

#### Returns

`string`

---

### getStoreType()

> **getStoreType**(): `string`

Defined in: [src/notifications/cvscom-notify.ts:181](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L181)

取得超商類型。

#### Returns

`string`

---

### getTradeNo()

> **getTradeNo**(): `string`

Defined in: [src/notifications/cvscom-notify.ts:157](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L157)

取得藍新金流交易序號。

#### Returns

`string`

---

### isSuccess()

> **isSuccess**(): `boolean`

Defined in: [src/notifications/cvscom-notify.ts:128](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L128)

是否成功。

#### Returns

`boolean`

#### Implementation of

[`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md).[`isSuccess`](../interfaces/NotifyHandlerInterface.md#issuccess)

---

### isVerified()

> **isVerified**(): `boolean`

Defined in: [src/notifications/cvscom-notify.ts:252](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L252)

是否已驗證。

#### Returns

`boolean`

---

### verify()

> **verify**(`data`): `boolean`

Defined in: [src/notifications/cvscom-notify.ts:52](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L52)

驗證通知資料。

#### Parameters

##### data

[`NotifyRawData`](../interfaces/NotifyRawData.md)

#### Returns

`boolean`

#### Implementation of

[`NotifyHandlerInterface`](../interfaces/NotifyHandlerInterface.md).[`verify`](../interfaces/NotifyHandlerInterface.md#verify)

---

### verifyOrFail()

> **verifyOrFail**(`data`): `this`

Defined in: [src/notifications/cvscom-notify.ts:81](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L81)

驗證並拋出例外。

#### Parameters

##### data

[`NotifyRawData`](../interfaces/NotifyRawData.md)

#### Returns

`this`

---

### create()

> `static` **create**(`hashKey`, `hashIV`): `CvscomNotify`

Defined in: [src/notifications/cvscom-notify.ts:45](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/notifications/cvscom-notify.ts#L45)

從設定建立通知處理器。

#### Parameters

##### hashKey

`string`

##### hashIV

`string`

#### Returns

`CvscomNotify`
