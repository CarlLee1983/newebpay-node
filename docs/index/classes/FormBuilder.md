[**@carllee1983/newebpay**](../../README.md)

---

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / FormBuilder

# Class: FormBuilder

Defined in: [src/form-builder.ts:28](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/form-builder.ts#L28)

HTML 表單產生器。

用於產生自動送出或手動送出的支付表單。

## Constructors

### Constructor

> **new FormBuilder**(`payment`, `options`): `FormBuilder`

Defined in: [src/form-builder.ts:38](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/form-builder.ts#L38)

建立表單產生器。

#### Parameters

##### payment

[`PaymentInterface`](../interfaces/PaymentInterface.md)

支付操作物件

##### options

[`FormBuilderOptions`](../interfaces/FormBuilderOptions.md) = `{}`

選項

#### Returns

`FormBuilder`

## Methods

### build()

> **build**(): `string`

Defined in: [src/form-builder.ts:87](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/form-builder.ts#L87)

產生 HTML 表單。

#### Returns

`string`

---

### getFormData()

> **getFormData**(): `object`

Defined in: [src/form-builder.ts:116](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/form-builder.ts#L116)

取得表單資料（不含 HTML）。

#### Returns

`object`

##### action

> **action**: `string`

##### fields

> **fields**: `Record`\<`string`, `string`\>

##### method

> **method**: `string`

---

### setAutoSubmit()

> **setAutoSubmit**(`autoSubmit`): `this`

Defined in: [src/form-builder.ts:63](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/form-builder.ts#L63)

設定是否自動送出。

#### Parameters

##### autoSubmit

`boolean`

#### Returns

`this`

---

### setFormId()

> **setFormId**(`formId`): `this`

Defined in: [src/form-builder.ts:71](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/form-builder.ts#L71)

設定表單 ID。

#### Parameters

##### formId

`string`

#### Returns

`this`

---

### setSubmitButtonText()

> **setSubmitButtonText**(`text`): `this`

Defined in: [src/form-builder.ts:79](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/form-builder.ts#L79)

設定送出按鈕文字。

#### Parameters

##### text

`string`

#### Returns

`this`

---

### create()

> `static` **create**(`payment`, `options?`): `FormBuilder`

Defined in: [src/form-builder.ts:53](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/form-builder.ts#L53)

從支付操作物件建立表單產生器。

#### Parameters

##### payment

[`PaymentInterface`](../interfaces/PaymentInterface.md)

支付操作物件

##### options?

[`FormBuilderOptions`](../interfaces/FormBuilderOptions.md)

選項

#### Returns

`FormBuilder`
