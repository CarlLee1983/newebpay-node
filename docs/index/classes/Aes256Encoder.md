[**@carllee1983/newebpay**](../../README.md)

---

[@carllee1983/newebpay](../../modules.md) / [index](../README.md) / Aes256Encoder

# Class: Aes256Encoder

Defined in: [newebpay-node/src/infrastructure/aes256-encoder.ts:9](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/infrastructure/aes256-encoder.ts#L9)

AES-256-CBC 加解密器。

依據藍新金流技術文件 4.1.1 AES256 加密規範實作。

## Constructors

### Constructor

> **new Aes256Encoder**(`hashKey`, `hashIV`): `Aes256Encoder`

Defined in: [newebpay-node/src/infrastructure/aes256-encoder.ts:21](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/infrastructure/aes256-encoder.ts#L21)

建立加解密器。

#### Parameters

##### hashKey

`string`

HashKey

##### hashIV

`string`

HashIV

#### Returns

`Aes256Encoder`

## Methods

### decrypt()

> **decrypt**(`tradeInfo`): `Record`\<`string`, `string`\>

Defined in: [newebpay-node/src/infrastructure/aes256-encoder.ts:66](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/infrastructure/aes256-encoder.ts#L66)

解密資料。

將十六進位加密字串解密為資料物件。

#### Parameters

##### tradeInfo

`string`

加密的 TradeInfo 字串

#### Returns

`Record`\<`string`, `string`\>

解密後的資料物件

#### Throws

NewebPayError 當解密失敗時

---

### encrypt()

> **encrypt**(`data`): `string`

Defined in: [newebpay-node/src/infrastructure/aes256-encoder.ts:44](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/infrastructure/aes256-encoder.ts#L44)

加密資料。

將資料物件轉換為 URL 編碼查詢字串後進行 AES-256-CBC 加密。

#### Parameters

##### data

`Record`\<`string`, `unknown`\>

原始資料

#### Returns

`string`

加密後的十六進位字串

---

### create()

> `static` **create**(`hashKey`, `hashIV`): `Aes256Encoder`

Defined in: [newebpay-node/src/infrastructure/aes256-encoder.ts:32](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/infrastructure/aes256-encoder.ts#L32)

從設定建立加解密器。

#### Parameters

##### hashKey

`string`

HashKey

##### hashIV

`string`

HashIV

#### Returns

`Aes256Encoder`
