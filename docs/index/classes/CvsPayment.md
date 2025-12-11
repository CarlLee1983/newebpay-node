[**@carllee1983/newebpay**](../../README.md)

---

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / CvsPayment

# Class: CvsPayment

Defined in: [newebpay-node/src/operations/cvs-payment.ts:9](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/operations/cvs-payment.ts#L9)

超商代碼繳費支付。

金額限制 30~20,000 元。

## Extends

- [`Content`](Content.md)

## Constructors

### Constructor

> **new CvsPayment**(`merchantId`, `hashKey`, `hashIV`): `CvsPayment`

Defined in: [newebpay-node/src/content.ts:65](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L65)

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

`CvsPayment`

#### Inherited from

[`Content`](Content.md).[`constructor`](Content.md#constructor)

## Properties

### content

> `protected` **content**: `Record`\<`string`, `unknown`\> = `{}`

Defined in: [newebpay-node/src/content.ts:46](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L46)

內容資料。

#### Inherited from

[`Content`](Content.md).[`content`](Content.md#content)

---

### hashIV

> `protected` **hashIV**: `string` = `''`

Defined in: [newebpay-node/src/content.ts:68](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L68)

HashIV

#### Inherited from

[`Content`](Content.md).[`hashIV`](Content.md#hashiv)

---

### hashKey

> `protected` **hashKey**: `string` = `''`

Defined in: [newebpay-node/src/content.ts:67](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L67)

HashKey

#### Inherited from

[`Content`](Content.md).[`hashKey`](Content.md#hashkey)

---

### isTest

> `protected` **isTest**: `boolean` = `false`

Defined in: [newebpay-node/src/content.ts:41](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L41)

是否為測試環境。

#### Inherited from

[`Content`](Content.md).[`isTest`](Content.md#istest)

---

### merchantId

> `protected` **merchantId**: `string` = `''`

Defined in: [newebpay-node/src/content.ts:66](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L66)

特店編號

#### Inherited from

[`Content`](Content.md).[`merchantId`](Content.md#merchantid)

---

### requestPath

> `protected` **requestPath**: `string` = `'/MPG/mpg_gateway'`

Defined in: [newebpay-node/src/content.ts:36](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L36)

API 請求路徑。

#### Inherited from

[`Content`](Content.md).[`requestPath`](Content.md#requestpath)

---

### version

> `protected` **version**: `string` = `'2.0'`

Defined in: [newebpay-node/src/content.ts:31](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L31)

MPG API 版本。

#### Inherited from

[`Content`](Content.md).[`version`](Content.md#version)

---

### EMAIL_MAX_LENGTH

> `readonly` `static` **EMAIL_MAX_LENGTH**: `50` = `50`

Defined in: [newebpay-node/src/content.ts:26](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L26)

Email 最大長度。

#### Inherited from

[`Content`](Content.md).[`EMAIL_MAX_LENGTH`](Content.md#email_max_length)

---

### ITEM_DESC_MAX_LENGTH

> `readonly` `static` **ITEM_DESC_MAX_LENGTH**: `50` = `50`

Defined in: [newebpay-node/src/content.ts:21](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L21)

商品資訊最大長度。

#### Inherited from

[`Content`](Content.md).[`ITEM_DESC_MAX_LENGTH`](Content.md#item_desc_max_length)

---

### MAX_AMT

> `readonly` `static` **MAX_AMT**: `20000` = `20000`

Defined in: [newebpay-node/src/operations/cvs-payment.ts:18](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/operations/cvs-payment.ts#L18)

最大金額。

---

### MERCHANT_ORDER_NO_MAX_LENGTH

> `readonly` `static` **MERCHANT_ORDER_NO_MAX_LENGTH**: `30` = `30`

Defined in: [newebpay-node/src/content.ts:16](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L16)

特店訂單編號最大長度。

#### Inherited from

[`Content`](Content.md).[`MERCHANT_ORDER_NO_MAX_LENGTH`](Content.md#merchant_order_no_max_length)

---

### MIN_AMT

> `readonly` `static` **MIN_AMT**: `30` = `30`

Defined in: [newebpay-node/src/operations/cvs-payment.ts:13](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/operations/cvs-payment.ts#L13)

最小金額。

## Methods

### get()

> **get**\<`T`\>(`key`, `defaultValue?`): `T` \| `undefined`

Defined in: [newebpay-node/src/content.ts:405](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L405)

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

#### Inherited from

[`Content`](Content.md).[`get`](Content.md#get)

---

### getAesEncoder()

> **getAesEncoder**(): [`Aes256Encoder`](Aes256Encoder.md)

Defined in: [newebpay-node/src/content.ts:301](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L301)

取得 AES256 編碼器。

#### Returns

[`Aes256Encoder`](Aes256Encoder.md)

#### Inherited from

[`Content`](Content.md).[`getAesEncoder`](Content.md#getaesencoder)

---

### getApiUrl()

> **getApiUrl**(): `string`

Defined in: [newebpay-node/src/content.ts:294](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L294)

取得完整 API 網址。

#### Returns

`string`

#### Inherited from

[`Content`](Content.md).[`getApiUrl`](Content.md#getapiurl)

---

### getBaseUrl()

> **getBaseUrl**(): `string`

Defined in: [newebpay-node/src/content.ts:287](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L287)

取得 API 基礎網址。

#### Returns

`string`

#### Inherited from

[`Content`](Content.md).[`getBaseUrl`](Content.md#getbaseurl)

---

### getCheckValueEncoder()

> **getCheckValueEncoder**(): [`CheckValueEncoder`](CheckValueEncoder.md)

Defined in: [newebpay-node/src/content.ts:311](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L311)

取得 CheckValue 編碼器。

#### Returns

[`CheckValueEncoder`](CheckValueEncoder.md)

#### Inherited from

[`Content`](Content.md).[`getCheckValueEncoder`](Content.md#getcheckvalueencoder)

---

### getContent()

> **getContent**(): [`PaymentContent`](../interfaces/PaymentContent.md)

Defined in: [newebpay-node/src/content.ts:368](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L368)

取得已加密的內容。

#### Returns

[`PaymentContent`](../interfaces/PaymentContent.md)

#### Inherited from

[`Content`](Content.md).[`getContent`](Content.md#getcontent)

---

### getMerchantID()

> **getMerchantID**(): `string`

Defined in: [newebpay-node/src/content.ts:115](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L115)

取得特店編號。

#### Returns

`string`

#### Inherited from

[`Content`](Content.md).[`getMerchantID`](Content.md#getmerchantid)

---

### getPayload()

> **getPayload**(): `Record`\<`string`, `unknown`\>

Defined in: [newebpay-node/src/content.ts:348](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L348)

取得 Payload。

#### Returns

`Record`\<`string`, `unknown`\>

#### Inherited from

[`Content`](Content.md).[`getPayload`](Content.md#getpayload)

---

### getRawContent()

> **getRawContent**(): `Record`\<`string`, `unknown`\>

Defined in: [newebpay-node/src/content.ts:390](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L390)

取得原始內容物件。

#### Returns

`Record`\<`string`, `unknown`\>

#### Inherited from

[`Content`](Content.md).[`getRawContent`](Content.md#getrawcontent)

---

### getRequestPath()

> **getRequestPath**(): `string`

Defined in: [newebpay-node/src/content.ts:280](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L280)

取得請求路徑。

#### Returns

`string`

#### Inherited from

[`Content`](Content.md).[`getRequestPath`](Content.md#getrequestpath)

---

### initContent()

> `protected` **initContent**(): `void`

Defined in: [newebpay-node/src/operations/cvs-payment.ts:23](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/operations/cvs-payment.ts#L23)

初始化內容。

#### Returns

`void`

#### Overrides

[`Content`](Content.md).[`initContent`](Content.md#initcontent)

---

### isTestMode()

> **isTestMode**(): `boolean`

Defined in: [newebpay-node/src/content.ts:146](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L146)

是否為測試環境。

#### Returns

`boolean`

#### Inherited from

[`Content`](Content.md).[`isTestMode`](Content.md#istestmode)

---

### set()

> **set**(`key`, `value`): `this`

Defined in: [newebpay-node/src/content.ts:397](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L397)

設定自訂內容。

#### Parameters

##### key

`string`

##### value

`unknown`

#### Returns

`this`

#### Inherited from

[`Content`](Content.md).[`set`](Content.md#set)

---

### setAmt()

> **setAmt**(`amount`): `this`

Defined in: [newebpay-node/src/content.ts:172](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L172)

設定訂單金額。

#### Parameters

##### amount

`number`

#### Returns

`this`

#### Inherited from

[`Content`](Content.md).[`setAmt`](Content.md#setamt)

---

### setClientBackURL()

> **setClientBackURL**(`url`): `this`

Defined in: [newebpay-node/src/content.ts:237](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L237)

設定返回商店網址。

#### Parameters

##### url

`string`

#### Returns

`this`

#### Inherited from

[`Content`](Content.md).[`setClientBackURL`](Content.md#setclientbackurl)

---

### setCustomerURL()

> **setCustomerURL**(`url`): `this`

Defined in: [newebpay-node/src/content.ts:229](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L229)

設定取號完成返回網址。

#### Parameters

##### url

`string`

#### Returns

`this`

#### Inherited from

[`Content`](Content.md).[`setCustomerURL`](Content.md#setcustomerurl)

---

### setEmail()

> **setEmail**(`email`): `this`

Defined in: [newebpay-node/src/content.ts:245](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L245)

設定付款人電子信箱。

#### Parameters

##### email

`string`

#### Returns

`this`

#### Inherited from

[`Content`](Content.md).[`setEmail`](Content.md#setemail)

---

### setEmailModify()

> **setEmailModify**(`modify`): `this`

Defined in: [newebpay-node/src/content.ts:256](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L256)

設定是否開啟付款人資料修改。

#### Parameters

##### modify

`number`

#### Returns

`this`

#### Inherited from

[`Content`](Content.md).[`setEmailModify`](Content.md#setemailmodify)

---

### setExpireDate()

> **setExpireDate**(`expireDate`): `this`

Defined in: [newebpay-node/src/content.ts:205](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L205)

設定繳費有效期限。

#### Parameters

##### expireDate

`string`

#### Returns

`this`

#### Inherited from

[`Content`](Content.md).[`setExpireDate`](Content.md#setexpiredate)

---

### setHashIV()

> **setHashIV**(`iv`): `this`

Defined in: [newebpay-node/src/content.ts:130](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L130)

設定 HashIV。

#### Parameters

##### iv

`string`

#### Returns

`this`

#### Inherited from

[`Content`](Content.md).[`setHashIV`](Content.md#sethashiv)

---

### setHashKey()

> **setHashKey**(`key`): `this`

Defined in: [newebpay-node/src/content.ts:122](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L122)

設定 HashKey。

#### Parameters

##### key

`string`

#### Returns

`this`

#### Inherited from

[`Content`](Content.md).[`setHashKey`](Content.md#sethashkey)

---

### setItemDesc()

> **setItemDesc**(`desc`): `this`

Defined in: [newebpay-node/src/content.ts:183](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L183)

設定商品資訊。

#### Parameters

##### desc

`string`

#### Returns

`this`

#### Inherited from

[`Content`](Content.md).[`setItemDesc`](Content.md#setitemdesc)

---

### setLangType()

> **setLangType**(`lang`): `this`

Defined in: [newebpay-node/src/content.ts:272](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L272)

設定語系。

#### Parameters

##### lang

`string`

#### Returns

`this`

#### Inherited from

[`Content`](Content.md).[`setLangType`](Content.md#setlangtype)

---

### setMerchantID()

> **setMerchantID**(`id`): `this`

Defined in: [newebpay-node/src/content.ts:106](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L106)

設定特店編號。

#### Parameters

##### id

`string`

#### Returns

`this`

#### Inherited from

[`Content`](Content.md).[`setMerchantID`](Content.md#setmerchantid)

---

### setMerchantOrderNo()

> **setMerchantOrderNo**(`orderNo`): `this`

Defined in: [newebpay-node/src/content.ts:153](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L153)

設定特店訂單編號。

#### Parameters

##### orderNo

`string`

#### Returns

`this`

#### Inherited from

[`Content`](Content.md).[`setMerchantOrderNo`](Content.md#setmerchantorderno)

---

### setNotifyURL()

> **setNotifyURL**(`url`): `this`

Defined in: [newebpay-node/src/content.ts:221](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L221)

設定支付通知網址。

#### Parameters

##### url

`string`

#### Returns

`this`

#### Inherited from

[`Content`](Content.md).[`setNotifyURL`](Content.md#setnotifyurl)

---

### setOrderComment()

> **setOrderComment**(`orderComment`): `this`

Defined in: [newebpay-node/src/content.ts:264](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L264)

設定商店備註。

#### Parameters

##### orderComment

`string`

#### Returns

`this`

#### Inherited from

[`Content`](Content.md).[`setOrderComment`](Content.md#setordercomment)

---

### setReturnURL()

> **setReturnURL**(`url`): `this`

Defined in: [newebpay-node/src/content.ts:213](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L213)

設定支付完成返回網址。

#### Parameters

##### url

`string`

#### Returns

`this`

#### Inherited from

[`Content`](Content.md).[`setReturnURL`](Content.md#setreturnurl)

---

### setTestMode()

> **setTestMode**(`isTest`): `this`

Defined in: [newebpay-node/src/content.ts:138](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L138)

設定是否為測試環境。

#### Parameters

##### isTest

`boolean`

#### Returns

`this`

#### Inherited from

[`Content`](Content.md).[`setTestMode`](Content.md#settestmode)

---

### setTimeStamp()

> **setTimeStamp**(`timestamp`): `this`

Defined in: [newebpay-node/src/content.ts:164](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L164)

設定時間戳記。

#### Parameters

##### timestamp

`string` | `number`

#### Returns

`this`

#### Inherited from

[`Content`](Content.md).[`setTimeStamp`](Content.md#settimestamp)

---

### setTradeLimit()

> **setTradeLimit**(`seconds`): `this`

Defined in: [newebpay-node/src/content.ts:194](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L194)

設定交易限制秒數。

#### Parameters

##### seconds

`number`

#### Returns

`this`

#### Inherited from

[`Content`](Content.md).[`setTradeLimit`](Content.md#settradelimit)

---

### validateBaseParams()

> `protected` **validateBaseParams**(): `void`

Defined in: [newebpay-node/src/content.ts:326](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/content.ts#L326)

驗證基礎參數。

#### Returns

`void`

#### Inherited from

[`Content`](Content.md).[`validateBaseParams`](Content.md#validatebaseparams)

---

### validation()

> `protected` **validation**(): `void`

Defined in: [newebpay-node/src/operations/cvs-payment.ts:32](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/operations/cvs-payment.ts#L32)

驗證內容資料。

#### Returns

`void`

#### Overrides

[`Content`](Content.md).[`validation`](Content.md#validation)
