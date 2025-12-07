[**@carllee1983/newebpay**](../../README.md)

---

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / NotifyHandlerInterface

# Interface: NotifyHandlerInterface

Defined in: [src/types/notification.ts:4](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/types/notification.ts#L4)

通知處理器介面。

## Methods

### getData()

> **getData**(): `Record`\<`string`, `unknown`\>

Defined in: [src/types/notification.ts:13](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/types/notification.ts#L13)

取得解密後的資料。

#### Returns

`Record`\<`string`, `unknown`\>

---

### getMessage()

> **getMessage**(): `string`

Defined in: [src/types/notification.ts:28](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/types/notification.ts#L28)

取得訊息。

#### Returns

`string`

---

### getStatus()

> **getStatus**(): `string`

Defined in: [src/types/notification.ts:23](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/types/notification.ts#L23)

取得狀態。

#### Returns

`string`

---

### isSuccess()

> **isSuccess**(): `boolean`

Defined in: [src/types/notification.ts:18](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/types/notification.ts#L18)

是否成功。

#### Returns

`boolean`

---

### verify()

> **verify**(`data`): `boolean`

Defined in: [src/types/notification.ts:8](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/types/notification.ts#L8)

驗證通知資料。

#### Parameters

##### data

[`NotifyRawData`](NotifyRawData.md)

#### Returns

`boolean`
