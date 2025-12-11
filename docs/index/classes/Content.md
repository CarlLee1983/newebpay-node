[**@carllee1983/newebpay**](../../README.md)

***

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / Content

# Abstract Class: Content

Defined in: [newebpay-node/src/content.ts:12](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L12)

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

Defined in: [newebpay-node/src/content.ts:65](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L65)

建立 Content 實例。

#### Parameters

##### merchantId

`string` = `''`

特店編號

##### hashKey

`string` = `''`

HashKey

##### hashIV

`string` = `''`

HashIV

#### Returns

`Content`

## Properties

### content

> `protected` **content**: `Record`\<`string`, `unknown`\> = `{}`

Defined in: [newebpay-node/src/content.ts:46](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L46)

內容資料。

***

### hashIV

> `protected` **hashIV**: `string` = `''`

Defined in: [newebpay-node/src/content.ts:68](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L68)

HashIV

***

### hashKey

> `protected` **hashKey**: `string` = `''`

Defined in: [newebpay-node/src/content.ts:67](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L67)

HashKey

***

### isTest

> `protected` **isTest**: `boolean` = `false`

Defined in: [newebpay-node/src/content.ts:41](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L41)

是否為測試環境。

***

### merchantId

> `protected` **merchantId**: `string` = `''`

Defined in: [newebpay-node/src/content.ts:66](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L66)

特店編號

***

### requestPath

> `protected` **requestPath**: `string` = `'/MPG/mpg_gateway'`

Defined in: [newebpay-node/src/content.ts:36](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L36)

API 請求路徑。

***

### version

> `protected` **version**: `string` = `'2.0'`

Defined in: [newebpay-node/src/content.ts:31](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L31)

MPG API 版本。

***

### EMAIL\_MAX\_LENGTH

> `readonly` `static` **EMAIL\_MAX\_LENGTH**: `50` = `50`

Defined in: [newebpay-node/src/content.ts:26](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L26)

Email 最大長度。

***

### ITEM\_DESC\_MAX\_LENGTH

> `readonly` `static` **ITEM\_DESC\_MAX\_LENGTH**: `50` = `50`

Defined in: [newebpay-node/src/content.ts:21](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L21)

商品資訊最大長度。

***

### MERCHANT\_ORDER\_NO\_MAX\_LENGTH

> `readonly` `static` **MERCHANT\_ORDER\_NO\_MAX\_LENGTH**: `30` = `30`

Defined in: [newebpay-node/src/content.ts:16](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L16)

特店訂單編號最大長度。

## Methods

### get()

> **get**\<`T`\>(`key`, `defaultValue?`): `T` \| `undefined`

Defined in: [newebpay-node/src/content.ts:405](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L405)

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

***

### getAesEncoder()

> **getAesEncoder**(): [`Aes256Encoder`](Aes256Encoder.md)

Defined in: [newebpay-node/src/content.ts:301](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L301)

取得 AES256 編碼器。

#### Returns

[`Aes256Encoder`](Aes256Encoder.md)

***

### getApiUrl()

> **getApiUrl**(): `string`

Defined in: [newebpay-node/src/content.ts:294](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L294)

取得完整 API 網址。

#### Returns

`string`

***

### getBaseUrl()

> **getBaseUrl**(): `string`

Defined in: [newebpay-node/src/content.ts:287](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L287)

取得 API 基礎網址。

#### Returns

`string`

***

### getCheckValueEncoder()

> **getCheckValueEncoder**(): [`CheckValueEncoder`](CheckValueEncoder.md)

Defined in: [newebpay-node/src/content.ts:311](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L311)

取得 CheckValue 編碼器。

#### Returns

[`CheckValueEncoder`](CheckValueEncoder.md)

***

### getContent()

> **getContent**(): [`PaymentContent`](../interfaces/PaymentContent.md)

Defined in: [newebpay-node/src/content.ts:368](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L368)

取得已加密的內容。

#### Returns

[`PaymentContent`](../interfaces/PaymentContent.md)

#### Implementation of

[`PaymentInterface`](../interfaces/PaymentInterface.md).[`getContent`](../interfaces/PaymentInterface.md#getcontent)

***

### getMerchantID()

> **getMerchantID**(): `string`

Defined in: [newebpay-node/src/content.ts:115](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L115)

取得特店編號。

#### Returns

`string`

***

### getPayload()

> **getPayload**(): `Record`\<`string`, `unknown`\>

Defined in: [newebpay-node/src/content.ts:348](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L348)

取得 Payload。

#### Returns

`Record`\<`string`, `unknown`\>

#### Implementation of

[`PaymentInterface`](../interfaces/PaymentInterface.md).[`getPayload`](../interfaces/PaymentInterface.md#getpayload)

***

### getRawContent()

> **getRawContent**(): `Record`\<`string`, `unknown`\>

Defined in: [newebpay-node/src/content.ts:390](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L390)

取得原始內容物件。

#### Returns

`Record`\<`string`, `unknown`\>

***

### getRequestPath()

> **getRequestPath**(): `string`

Defined in: [newebpay-node/src/content.ts:280](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L280)

取得請求路徑。

#### Returns

`string`

#### Implementation of

[`PaymentInterface`](../interfaces/PaymentInterface.md).[`getRequestPath`](../interfaces/PaymentInterface.md#getrequestpath)

***

### initContent()

> `protected` **initContent**(): `void`

Defined in: [newebpay-node/src/content.ts:90](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L90)

初始化內容。

#### Returns

`void`

***

### isTestMode()

> **isTestMode**(): `boolean`

Defined in: [newebpay-node/src/content.ts:146](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L146)

是否為測試環境。

#### Returns

`boolean`

***

### set()

> **set**(`key`, `value`): `this`

Defined in: [newebpay-node/src/content.ts:397](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L397)

設定自訂內容。

#### Parameters

##### key

`string`

##### value

`unknown`

#### Returns

`this`

***

### setAmt()

> **setAmt**(`amount`): `this`

Defined in: [newebpay-node/src/content.ts:172](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L172)

設定訂單金額。

#### Parameters

##### amount

`number`

#### Returns

`this`

#### Implementation of

[`PaymentInterface`](../interfaces/PaymentInterface.md).[`setAmt`](../interfaces/PaymentInterface.md#setamt)

***

### setClientBackURL()

> **setClientBackURL**(`url`): `this`

Defined in: [newebpay-node/src/content.ts:237](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L237)

設定返回商店網址。

#### Parameters

##### url

`string`

#### Returns

`this`

***

### setCustomerURL()

> **setCustomerURL**(`url`): `this`

Defined in: [newebpay-node/src/content.ts:229](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L229)

設定取號完成返回網址。

#### Parameters

##### url

`string`

#### Returns

`this`

***

### setEmail()

> **setEmail**(`email`): `this`

Defined in: [newebpay-node/src/content.ts:245](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L245)

設定付款人電子信箱。

#### Parameters

##### email

`string`

#### Returns

`this`

***

### setEmailModify()

> **setEmailModify**(`modify`): `this`

Defined in: [newebpay-node/src/content.ts:256](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L256)

設定是否開啟付款人資料修改。

#### Parameters

##### modify

`number`

#### Returns

`this`

***

### setExpireDate()

> **setExpireDate**(`expireDate`): `this`

Defined in: [newebpay-node/src/content.ts:205](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L205)

設定繳費有效期限。

#### Parameters

##### expireDate

`string`

#### Returns

`this`

***

### setHashIV()

> **setHashIV**(`iv`): `this`

Defined in: [newebpay-node/src/content.ts:130](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L130)

設定 HashIV。

#### Parameters

##### iv

`string`

#### Returns

`this`

***

### setHashKey()

> **setHashKey**(`key`): `this`

Defined in: [newebpay-node/src/content.ts:122](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L122)

設定 HashKey。

#### Parameters

##### key

`string`

#### Returns

`this`

***

### setItemDesc()

> **setItemDesc**(`desc`): `this`

Defined in: [newebpay-node/src/content.ts:183](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L183)

設定商品資訊。

#### Parameters

##### desc

`string`

#### Returns

`this`

#### Implementation of

[`PaymentInterface`](../interfaces/PaymentInterface.md).[`setItemDesc`](../interfaces/PaymentInterface.md#setitemdesc)

***

### setLangType()

> **setLangType**(`lang`): `this`

Defined in: [newebpay-node/src/content.ts:272](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L272)

設定語系。

#### Parameters

##### lang

`string`

#### Returns

`this`

***

### setMerchantID()

> **setMerchantID**(`id`): `this`

Defined in: [newebpay-node/src/content.ts:106](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L106)

設定特店編號。

#### Parameters

##### id

`string`

#### Returns

`this`

***

### setMerchantOrderNo()

> **setMerchantOrderNo**(`orderNo`): `this`

Defined in: [newebpay-node/src/content.ts:153](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L153)

設定特店訂單編號。

#### Parameters

##### orderNo

`string`

#### Returns

`this`

#### Implementation of

[`PaymentInterface`](../interfaces/PaymentInterface.md).[`setMerchantOrderNo`](../interfaces/PaymentInterface.md#setmerchantorderno)

***

### setNotifyURL()

> **setNotifyURL**(`url`): `this`

Defined in: [newebpay-node/src/content.ts:221](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L221)

設定支付通知網址。

#### Parameters

##### url

`string`

#### Returns

`this`

#### Implementation of

[`PaymentInterface`](../interfaces/PaymentInterface.md).[`setNotifyURL`](../interfaces/PaymentInterface.md#setnotifyurl)

***

### setOrderComment()

> **setOrderComment**(`orderComment`): `this`

Defined in: [newebpay-node/src/content.ts:264](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L264)

設定商店備註。

#### Parameters

##### orderComment

`string`

#### Returns

`this`

***

### setReturnURL()

> **setReturnURL**(`url`): `this`

Defined in: [newebpay-node/src/content.ts:213](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L213)

設定支付完成返回網址。

#### Parameters

##### url

`string`

#### Returns

`this`

#### Implementation of

[`PaymentInterface`](../interfaces/PaymentInterface.md).[`setReturnURL`](../interfaces/PaymentInterface.md#setreturnurl)

***

### setTestMode()

> **setTestMode**(`isTest`): `this`

Defined in: [newebpay-node/src/content.ts:138](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L138)

設定是否為測試環境。

#### Parameters

##### isTest

`boolean`

#### Returns

`this`

***

### setTimeStamp()

> **setTimeStamp**(`timestamp`): `this`

Defined in: [newebpay-node/src/content.ts:164](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L164)

設定時間戳記。

#### Parameters

##### timestamp

`string` | `number`

#### Returns

`this`

***

### setTradeLimit()

> **setTradeLimit**(`seconds`): `this`

Defined in: [newebpay-node/src/content.ts:194](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L194)

設定交易限制秒數。

#### Parameters

##### seconds

`number`

#### Returns

`this`

***

### validateBaseParams()

> `protected` **validateBaseParams**(): `void`

Defined in: [newebpay-node/src/content.ts:326](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L326)

驗證基礎參數。

#### Returns

`void`

***

### validation()

> `abstract` `protected` **validation**(): `void`

Defined in: [newebpay-node/src/content.ts:321](https://github.com/CarlLee1983/newebpay-node/blob/8262249cd7c1eb3b02bfa894c5b1a26477b4b3f5/src/content.ts#L321)

驗證內容資料。

#### Returns

`void`
