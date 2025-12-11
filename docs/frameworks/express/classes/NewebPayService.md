[**@carllee1983/newebpay**](../../../README.md)

***

[@carllee1983/newebpay](../../../modules.md) / [frameworks/express](../README.md) / NewebPayService

# Class: NewebPayService

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:35](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L35)

## Constructors

### Constructor

> **new NewebPayService**(`config`, `httpClient?`): `NewebPayService`

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:38](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L38)

#### Parameters

##### config

[`NewebPayConfig`](../interfaces/NewebPayConfig.md)

##### httpClient?

`HttpClientInterface`

#### Returns

`NewebPayService`

## Methods

### allInOne()

> **allInOne**(): [`AllInOnePayment`](../../../index/classes/AllInOnePayment.md)

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:149](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L149)

建立全支付方式

#### Returns

[`AllInOnePayment`](../../../index/classes/AllInOnePayment.md)

***

### atm()

> **atm**(): [`AtmPayment`](../../../index/classes/AtmPayment.md)

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:79](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L79)

建立 ATM 轉帳支付

#### Returns

[`AtmPayment`](../../../index/classes/AtmPayment.md)

***

### barcode()

> **barcode**(): [`BarcodePayment`](../../../index/classes/BarcodePayment.md)

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:93](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L93)

建立超商條碼繳費支付

#### Returns

[`BarcodePayment`](../../../index/classes/BarcodePayment.md)

***

### bitoPay()

> **bitoPay**(): [`BitoPayPayment`](../../../index/classes/BitoPayPayment.md)

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:121](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L121)

建立 BitoPay 支付

#### Returns

[`BitoPayPayment`](../../../index/classes/BitoPayPayment.md)

***

### credit()

> **credit**(): [`CreditPayment`](../../../index/classes/CreditPayment.md)

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:58](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L58)

建立信用卡一次付清支付

#### Returns

[`CreditPayment`](../../../index/classes/CreditPayment.md)

***

### creditCancel()

> **creditCancel**(): [`CreditCancel`](../../../index/classes/CreditCancel.md)

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:186](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L186)

建立信用卡取消授權

#### Returns

[`CreditCancel`](../../../index/classes/CreditCancel.md)

***

### creditClose()

> **creditClose**(): [`CreditClose`](../../../index/classes/CreditClose.md)

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:197](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L197)

建立信用卡請退款

#### Returns

[`CreditClose`](../../../index/classes/CreditClose.md)

***

### creditInstallment()

> **creditInstallment**(): [`CreditInstallment`](../../../index/classes/CreditInstallment.md)

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:65](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L65)

建立信用卡分期支付

#### Returns

[`CreditInstallment`](../../../index/classes/CreditInstallment.md)

***

### cvs()

> **cvs**(): [`CvsPayment`](../../../index/classes/CvsPayment.md)

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:86](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L86)

建立超商代碼繳費支付

#### Returns

[`CvsPayment`](../../../index/classes/CvsPayment.md)

***

### cvscom()

> **cvscom**(): [`CvscomPayment`](../../../index/classes/CvscomPayment.md)

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:142](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L142)

建立超商取貨付款支付

#### Returns

[`CvscomPayment`](../../../index/classes/CvscomPayment.md)

***

### esunWallet()

> **esunWallet**(): [`EsunWalletPayment`](../../../index/classes/EsunWalletPayment.md)

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:114](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L114)

建立玉山 Wallet 支付

#### Returns

[`EsunWalletPayment`](../../../index/classes/EsunWalletPayment.md)

***

### eWalletRefund()

> **eWalletRefund**(): [`EWalletRefund`](../../../index/classes/EWalletRefund.md)

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:208](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L208)

建立電子錢包退款

#### Returns

[`EWalletRefund`](../../../index/classes/EWalletRefund.md)

***

### form()

> **form**(`payment`): [`FormBuilder`](../../../index/classes/FormBuilder.md)

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:156](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L156)

建立表單產生器

#### Parameters

##### payment

[`PaymentInterface`](../../../index/interfaces/PaymentInterface.md)

#### Returns

[`FormBuilder`](../../../index/classes/FormBuilder.md)

***

### fula()

> **fula**(): [`FulaPayment`](../../../index/classes/FulaPayment.md)

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:135](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L135)

建立付啦支付

#### Returns

[`FulaPayment`](../../../index/classes/FulaPayment.md)

***

### linePay()

> **linePay**(): [`LinePayPayment`](../../../index/classes/LinePayPayment.md)

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:100](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L100)

建立 LINE Pay 支付

#### Returns

[`LinePayPayment`](../../../index/classes/LinePayPayment.md)

***

### payment()

> **payment**(`orderNo`, `amount`, `itemDesc`, `email`): [`PaymentBuilder`](PaymentBuilder.md)

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:51](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L51)

建立快速支付（簡化 API）

#### Parameters

##### orderNo

`string`

##### amount

`number`

##### itemDesc

`string`

##### email

`string` = `''`

#### Returns

[`PaymentBuilder`](PaymentBuilder.md)

***

### queryCreditDetail()

> **queryCreditDetail**(): [`QueryCreditDetail`](../../../index/classes/QueryCreditDetail.md)

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:175](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L175)

建立信用卡明細查詢

#### Returns

[`QueryCreditDetail`](../../../index/classes/QueryCreditDetail.md)

***

### queryOrder()

> **queryOrder**(): [`QueryOrder`](../../../index/classes/QueryOrder.md)

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:163](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L163)

建立交易查詢

#### Returns

[`QueryOrder`](../../../index/classes/QueryOrder.md)

***

### taiwanPay()

> **taiwanPay**(): [`TaiwanPayPayment`](../../../index/classes/TaiwanPayPayment.md)

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:107](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L107)

建立台灣 Pay 支付

#### Returns

[`TaiwanPayPayment`](../../../index/classes/TaiwanPayPayment.md)

***

### twqr()

> **twqr**(): [`TwqrPayment`](../../../index/classes/TwqrPayment.md)

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:128](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L128)

建立 TWQR 支付

#### Returns

[`TwqrPayment`](../../../index/classes/TwqrPayment.md)

***

### webAtm()

> **webAtm**(): [`WebAtmPayment`](../../../index/classes/WebAtmPayment.md)

Defined in: [newebpay-node/src/frameworks/common/newebpay-service.ts:72](https://github.com/CarlLee1983/newebpay-node/blob/d39220fc0a7fc584a6f4d3ff97844a32d96e5850/src/frameworks/common/newebpay-service.ts#L72)

建立 WebATM 支付

#### Returns

[`WebAtmPayment`](../../../index/classes/WebAtmPayment.md)
