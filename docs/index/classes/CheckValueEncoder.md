[**@carllee1983/newebpay**](../../README.md)

---

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / CheckValueEncoder

# Class: CheckValueEncoder

Defined in: [newebpay-node/src/infrastructure/check-value-encoder.ts:10](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/infrastructure/check-value-encoder.ts#L10)

CheckValue (TradeSha) 編碼器。

依據藍新金流技術文件 4.1.5 CheckValue 規範實作。
用於驗證交易資料的完整性。

## Constructors

### Constructor

> **new CheckValueEncoder**(`hashKey`, `hashIV`): `CheckValueEncoder`

Defined in: [newebpay-node/src/infrastructure/check-value-encoder.ts:17](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/infrastructure/check-value-encoder.ts#L17)

建立編碼器。

#### Parameters

##### hashKey

`string`

HashKey

##### hashIV

`string`

HashIV

#### Returns

`CheckValueEncoder`

## Methods

### generate()

> **generate**(`tradeInfo`): `string`

Defined in: [newebpay-node/src/infrastructure/check-value-encoder.ts:40](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/infrastructure/check-value-encoder.ts#L40)

產生 CheckValue (TradeSha)。

計算方式：SHA256(HashKey={HashKey}&{TradeInfo}&HashIV={HashIV})

#### Parameters

##### tradeInfo

`string`

加密後的 TradeInfo 字串

#### Returns

`string`

大寫的 SHA256 雜湊值

---

### verify()

> **verify**(`tradeInfo`, `tradeSha`): `boolean`

Defined in: [newebpay-node/src/infrastructure/check-value-encoder.ts:51](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/infrastructure/check-value-encoder.ts#L51)

驗證 CheckValue (TradeSha)。

#### Parameters

##### tradeInfo

`string`

加密後的 TradeInfo 字串

##### tradeSha

`string`

收到的 TradeSha 值

#### Returns

`boolean`

---

### verifyOrFail()

> **verifyOrFail**(`tradeInfo`, `tradeSha`): `void`

Defined in: [newebpay-node/src/infrastructure/check-value-encoder.ts:63](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/infrastructure/check-value-encoder.ts#L63)

驗證並拋出例外。

#### Parameters

##### tradeInfo

`string`

加密後的 TradeInfo 字串

##### tradeSha

`string`

收到的 TradeSha 值

#### Returns

`void`

#### Throws

NewebPayError 當驗證失敗時

---

### create()

> `static` **create**(`hashKey`, `hashIV`): `CheckValueEncoder`

Defined in: [newebpay-node/src/infrastructure/check-value-encoder.ts:28](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/infrastructure/check-value-encoder.ts#L28)

從設定建立編碼器。

#### Parameters

##### hashKey

`string`

HashKey

##### hashIV

`string`

HashIV

#### Returns

`CheckValueEncoder`
