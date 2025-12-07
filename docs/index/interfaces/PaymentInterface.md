[**@carllee1983/newebpay**](../../README.md)

---

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / PaymentInterface

# Interface: PaymentInterface

Defined in: [src/types/payment.ts:4](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/types/payment.ts#L4)

支付操作介面。

## Methods

### getContent()

> **getContent**(): [`PaymentContent`](PaymentContent.md)

Defined in: [src/types/payment.ts:43](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/types/payment.ts#L43)

取得已加密的內容。

#### Returns

[`PaymentContent`](PaymentContent.md)

---

### getPayload()

> **getPayload**(): `Record`\<`string`, `unknown`\>

Defined in: [src/types/payment.ts:38](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/types/payment.ts#L38)

取得 Payload。

#### Returns

`Record`\<`string`, `unknown`\>

---

### getRequestPath()

> **getRequestPath**(): `string`

Defined in: [src/types/payment.ts:33](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/types/payment.ts#L33)

取得請求路徑。

#### Returns

`string`

---

### setAmt()

> **setAmt**(`amount`): `this`

Defined in: [src/types/payment.ts:13](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/types/payment.ts#L13)

設定訂單金額。

#### Parameters

##### amount

`number`

#### Returns

`this`

---

### setItemDesc()

> **setItemDesc**(`desc`): `this`

Defined in: [src/types/payment.ts:18](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/types/payment.ts#L18)

設定商品資訊。

#### Parameters

##### desc

`string`

#### Returns

`this`

---

### setMerchantOrderNo()

> **setMerchantOrderNo**(`orderNo`): `this`

Defined in: [src/types/payment.ts:8](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/types/payment.ts#L8)

設定特店訂單編號。

#### Parameters

##### orderNo

`string`

#### Returns

`this`

---

### setNotifyURL()

> **setNotifyURL**(`url`): `this`

Defined in: [src/types/payment.ts:28](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/types/payment.ts#L28)

設定支付通知網址。

#### Parameters

##### url

`string`

#### Returns

`this`

---

### setReturnURL()

> **setReturnURL**(`url`): `this`

Defined in: [src/types/payment.ts:23](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/types/payment.ts#L23)

設定支付完成返回網址。

#### Parameters

##### url

`string`

#### Returns

`this`
