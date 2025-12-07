[**@carllee1983/newebpay**](../../README.md)

---

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / Content

# Abstract Class: Content

Defined in: [src/content.ts:11](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L11)

藍新金流 Content 基礎類別。

所有 MPG 支付操作類別的基類。

## Extended by

- [`CreditPayment`](CreditPayment.md)
- [`CreditInstallment`](CreditInstallment.md)
- [`AtmPayment`](AtmPayment.md)
- [`WebAtmPayment`](WebAtmPayment.md)
- [`CvsPayment`](CvsPayment.md)
- [`BarcodePayment`](BarcodePayment.md)
- [`LinePayPayment`](LinePayPayment.md)
- [`TaiwanPayPayment`](TaiwanPayPayment.md)
- [`EsunWalletPayment`](EsunWalletPayment.md)
- [`BitoPayPayment`](BitoPayPayment.md)
- [`TwqrPayment`](TwqrPayment.md)
- [`FulaPayment`](FulaPayment.md)
- [`CvscomPayment`](CvscomPayment.md)
- [`AllInOnePayment`](AllInOnePayment.md)

## Implements

- [`PaymentInterface`](../interfaces/PaymentInterface.md)

## Constructors

### Constructor

> **new Content**(`merchantId`, `hashKey`, `hashIV`): `Content`

Defined in: [src/content.ts:64](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L64)

建立 Content 實例。

#### Parameters

##### merchantId

`string` = `""`

特店編號

##### hashKey

`string` = `""`

HashKey

##### hashIV

`string` = `""`

HashIV

#### Returns

`Content`

## Properties

### content

> `protected` **content**: `Record`\<`string`, `unknown`\> = `{}`

Defined in: [src/content.ts:45](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L45)

內容資料。

---

### hashIV

> `protected` **hashIV**: `string` = `""`

Defined in: [src/content.ts:67](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L67)

HashIV

---

### hashKey

> `protected` **hashKey**: `string` = `""`

Defined in: [src/content.ts:66](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L66)

HashKey

---

### isTest

> `protected` **isTest**: `boolean` = `false`

Defined in: [src/content.ts:40](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L40)

是否為測試環境。

---

### merchantId

> `protected` **merchantId**: `string` = `""`

Defined in: [src/content.ts:65](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L65)

特店編號

---

### requestPath

> `protected` **requestPath**: `string` = `"/MPG/mpg_gateway"`

Defined in: [src/content.ts:35](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L35)

API 請求路徑。

---

### version

> `protected` **version**: `string` = `"2.0"`

Defined in: [src/content.ts:30](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L30)

MPG API 版本。

---

### EMAIL_MAX_LENGTH

> `readonly` `static` **EMAIL_MAX_LENGTH**: `50` = `50`

Defined in: [src/content.ts:25](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L25)

Email 最大長度。

---

### ITEM_DESC_MAX_LENGTH

> `readonly` `static` **ITEM_DESC_MAX_LENGTH**: `50` = `50`

Defined in: [src/content.ts:20](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L20)

商品資訊最大長度。

---

### MERCHANT_ORDER_NO_MAX_LENGTH

> `readonly` `static` **MERCHANT_ORDER_NO_MAX_LENGTH**: `30` = `30`

Defined in: [src/content.ts:15](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L15)

特店訂單編號最大長度。

## Methods

### get()

> **get**\<`T`\>(`key`, `defaultValue?`): `T` \| `undefined`

Defined in: [src/content.ts:395](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L395)

取得內容值。

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### key

`string`

##### defaultValue?

`T`

#### Returns

`T` \| `undefined`

---

### getAesEncoder()

> **getAesEncoder**(): [`Aes256Encoder`](Aes256Encoder.md)

Defined in: [src/content.ts:291](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L291)

取得 AES256 編碼器。

#### Returns

[`Aes256Encoder`](Aes256Encoder.md)

---

### getApiUrl()

> **getApiUrl**(): `string`

Defined in: [src/content.ts:284](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L284)

取得完整 API 網址。

#### Returns

`string`

---

### getBaseUrl()

> **getBaseUrl**(): `string`

Defined in: [src/content.ts:275](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L275)

取得 API 基礎網址。

#### Returns

`string`

---

### getCheckValueEncoder()

> **getCheckValueEncoder**(): [`CheckValueEncoder`](CheckValueEncoder.md)

Defined in: [src/content.ts:301](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L301)

取得 CheckValue 編碼器。

#### Returns

[`CheckValueEncoder`](CheckValueEncoder.md)

---

### getContent()

> **getContent**(): [`PaymentContent`](../interfaces/PaymentContent.md)

Defined in: [src/content.ts:358](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L358)

取得已加密的內容。

#### Returns

[`PaymentContent`](../interfaces/PaymentContent.md)

#### Implementation of

[`PaymentInterface`](../interfaces/PaymentInterface.md).[`getContent`](../interfaces/PaymentInterface.md#getcontent)

---

### getMerchantID()

> **getMerchantID**(): `string`

Defined in: [src/content.ts:100](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L100)

取得特店編號。

#### Returns

`string`

---

### getPayload()

> **getPayload**(): `Record`\<`string`, `unknown`\>

Defined in: [src/content.ts:338](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L338)

取得 Payload。

#### Returns

`Record`\<`string`, `unknown`\>

#### Implementation of

[`PaymentInterface`](../interfaces/PaymentInterface.md).[`getPayload`](../interfaces/PaymentInterface.md#getpayload)

---

### getRawContent()

> **getRawContent**(): `Record`\<`string`, `unknown`\>

Defined in: [src/content.ts:380](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L380)

取得原始內容物件。

#### Returns

`Record`\<`string`, `unknown`\>

---

### getRequestPath()

> **getRequestPath**(): `string`

Defined in: [src/content.ts:268](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L268)

取得請求路徑。

#### Returns

`string`

#### Implementation of

[`PaymentInterface`](../interfaces/PaymentInterface.md).[`getRequestPath`](../interfaces/PaymentInterface.md#getrequestpath)

---

### initContent()

> `protected` **initContent**(): `void`

Defined in: [src/content.ts:75](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L75)

初始化內容。

#### Returns

`void`

---

### isTestMode()

> **isTestMode**(): `boolean`

Defined in: [src/content.ts:131](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L131)

是否為測試環境。

#### Returns

`boolean`

---

### set()

> **set**(`key`, `value`): `this`

Defined in: [src/content.ts:387](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L387)

設定自訂內容。

#### Parameters

##### key

`string`

##### value

`unknown`

#### Returns

`this`

---

### setAmt()

> **setAmt**(`amount`): `this`

Defined in: [src/content.ts:160](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L160)

設定訂單金額。

#### Parameters

##### amount

`number`

#### Returns

`this`

#### Implementation of

[`PaymentInterface`](../interfaces/PaymentInterface.md).[`setAmt`](../interfaces/PaymentInterface.md#setamt)

---

### setClientBackURL()

> **setClientBackURL**(`url`): `this`

Defined in: [src/content.ts:225](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L225)

設定返回商店網址。

#### Parameters

##### url

`string`

#### Returns

`this`

---

### setCustomerURL()

> **setCustomerURL**(`url`): `this`

Defined in: [src/content.ts:217](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L217)

設定取號完成返回網址。

#### Parameters

##### url

`string`

#### Returns

`this`

---

### setEmail()

> **setEmail**(`email`): `this`

Defined in: [src/content.ts:233](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L233)

設定付款人電子信箱。

#### Parameters

##### email

`string`

#### Returns

`this`

---

### setEmailModify()

> **setEmailModify**(`modify`): `this`

Defined in: [src/content.ts:244](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L244)

設定是否開啟付款人資料修改。

#### Parameters

##### modify

`number`

#### Returns

`this`

---

### setExpireDate()

> **setExpireDate**(`expireDate`): `this`

Defined in: [src/content.ts:193](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L193)

設定繳費有效期限。

#### Parameters

##### expireDate

`string`

#### Returns

`this`

---

### setHashIV()

> **setHashIV**(`iv`): `this`

Defined in: [src/content.ts:115](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L115)

設定 HashIV。

#### Parameters

##### iv

`string`

#### Returns

`this`

---

### setHashKey()

> **setHashKey**(`key`): `this`

Defined in: [src/content.ts:107](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L107)

設定 HashKey。

#### Parameters

##### key

`string`

#### Returns

`this`

---

### setItemDesc()

> **setItemDesc**(`desc`): `this`

Defined in: [src/content.ts:171](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L171)

設定商品資訊。

#### Parameters

##### desc

`string`

#### Returns

`this`

#### Implementation of

[`PaymentInterface`](../interfaces/PaymentInterface.md).[`setItemDesc`](../interfaces/PaymentInterface.md#setitemdesc)

---

### setLangType()

> **setLangType**(`lang`): `this`

Defined in: [src/content.ts:260](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L260)

設定語系。

#### Parameters

##### lang

`string`

#### Returns

`this`

---

### setMerchantID()

> **setMerchantID**(`id`): `this`

Defined in: [src/content.ts:91](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L91)

設定特店編號。

#### Parameters

##### id

`string`

#### Returns

`this`

---

### setMerchantOrderNo()

> **setMerchantOrderNo**(`orderNo`): `this`

Defined in: [src/content.ts:138](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L138)

設定特店訂單編號。

#### Parameters

##### orderNo

`string`

#### Returns

`this`

#### Implementation of

[`PaymentInterface`](../interfaces/PaymentInterface.md).[`setMerchantOrderNo`](../interfaces/PaymentInterface.md#setmerchantorderno)

---

### setNotifyURL()

> **setNotifyURL**(`url`): `this`

Defined in: [src/content.ts:209](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L209)

設定支付通知網址。

#### Parameters

##### url

`string`

#### Returns

`this`

#### Implementation of

[`PaymentInterface`](../interfaces/PaymentInterface.md).[`setNotifyURL`](../interfaces/PaymentInterface.md#setnotifyurl)

---

### setOrderComment()

> **setOrderComment**(`orderComment`): `this`

Defined in: [src/content.ts:252](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L252)

設定商店備註。

#### Parameters

##### orderComment

`string`

#### Returns

`this`

---

### setReturnURL()

> **setReturnURL**(`url`): `this`

Defined in: [src/content.ts:201](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L201)

設定支付完成返回網址。

#### Parameters

##### url

`string`

#### Returns

`this`

#### Implementation of

[`PaymentInterface`](../interfaces/PaymentInterface.md).[`setReturnURL`](../interfaces/PaymentInterface.md#setreturnurl)

---

### setTestMode()

> **setTestMode**(`isTest`): `this`

Defined in: [src/content.ts:123](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L123)

設定是否為測試環境。

#### Parameters

##### isTest

`boolean`

#### Returns

`this`

---

### setTimeStamp()

> **setTimeStamp**(`timestamp`): `this`

Defined in: [src/content.ts:152](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L152)

設定時間戳記。

#### Parameters

##### timestamp

`string` | `number`

#### Returns

`this`

---

### setTradeLimit()

> **setTradeLimit**(`seconds`): `this`

Defined in: [src/content.ts:182](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L182)

設定交易限制秒數。

#### Parameters

##### seconds

`number`

#### Returns

`this`

---

### validateBaseParams()

> `protected` **validateBaseParams**(): `void`

Defined in: [src/content.ts:316](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L316)

驗證基礎參數。

#### Returns

`void`

---

### validation()

> `abstract` `protected` **validation**(): `void`

Defined in: [src/content.ts:311](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/content.ts#L311)

驗證內容資料。

#### Returns

`void`
