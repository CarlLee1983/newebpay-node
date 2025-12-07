[**@carllee1983/newebpay**](../../../README.md)

---

[@carllee1983/newebpay](../../../modules.md) / [frameworks/express](../README.md) / NewebPayService

# Class: NewebPayService

Defined in: [src/frameworks/common/newebpay-service.ts:32](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L32)

藍新金流服務類別（類似 PHP 的 PaymentCoordinator）

提供統一的服務介面，簡化框架整合

## Constructors

### Constructor

> **new NewebPayService**(`config`): `NewebPayService`

Defined in: [src/frameworks/common/newebpay-service.ts:33](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L33)

#### Parameters

##### config

[`NewebPayConfig`](../interfaces/NewebPayConfig.md)

#### Returns

`NewebPayService`

## Methods

### allInOne()

> **allInOne**(): [`AllInOnePayment`](../../../index/classes/AllInOnePayment.md)

Defined in: [src/frameworks/common/newebpay-service.ts:146](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L146)

建立全支付方式

#### Returns

[`AllInOnePayment`](../../../index/classes/AllInOnePayment.md)

---

### atm()

> **atm**(): [`AtmPayment`](../../../index/classes/AtmPayment.md)

Defined in: [src/frameworks/common/newebpay-service.ts:76](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L76)

建立 ATM 轉帳支付

#### Returns

[`AtmPayment`](../../../index/classes/AtmPayment.md)

---

### barcode()

> **barcode**(): [`BarcodePayment`](../../../index/classes/BarcodePayment.md)

Defined in: [src/frameworks/common/newebpay-service.ts:90](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L90)

建立超商條碼繳費支付

#### Returns

[`BarcodePayment`](../../../index/classes/BarcodePayment.md)

---

### bitoPay()

> **bitoPay**(): [`BitoPayPayment`](../../../index/classes/BitoPayPayment.md)

Defined in: [src/frameworks/common/newebpay-service.ts:118](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L118)

建立 BitoPay 支付

#### Returns

[`BitoPayPayment`](../../../index/classes/BitoPayPayment.md)

---

### credit()

> **credit**(): [`CreditPayment`](../../../index/classes/CreditPayment.md)

Defined in: [src/frameworks/common/newebpay-service.ts:55](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L55)

建立信用卡一次付清支付

#### Returns

[`CreditPayment`](../../../index/classes/CreditPayment.md)

---

### creditCancel()

> **creditCancel**(): [`CreditCancel`](../../../index/classes/CreditCancel.md)

Defined in: [src/frameworks/common/newebpay-service.ts:182](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L182)

建立信用卡取消授權

#### Returns

[`CreditCancel`](../../../index/classes/CreditCancel.md)

---

### creditClose()

> **creditClose**(): [`CreditClose`](../../../index/classes/CreditClose.md)

Defined in: [src/frameworks/common/newebpay-service.ts:193](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L193)

建立信用卡請退款

#### Returns

[`CreditClose`](../../../index/classes/CreditClose.md)

---

### creditInstallment()

> **creditInstallment**(): [`CreditInstallment`](../../../index/classes/CreditInstallment.md)

Defined in: [src/frameworks/common/newebpay-service.ts:62](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L62)

建立信用卡分期支付

#### Returns

[`CreditInstallment`](../../../index/classes/CreditInstallment.md)

---

### cvs()

> **cvs**(): [`CvsPayment`](../../../index/classes/CvsPayment.md)

Defined in: [src/frameworks/common/newebpay-service.ts:83](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L83)

建立超商代碼繳費支付

#### Returns

[`CvsPayment`](../../../index/classes/CvsPayment.md)

---

### cvscom()

> **cvscom**(): [`CvscomPayment`](../../../index/classes/CvscomPayment.md)

Defined in: [src/frameworks/common/newebpay-service.ts:139](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L139)

建立超商取貨付款支付

#### Returns

[`CvscomPayment`](../../../index/classes/CvscomPayment.md)

---

### esunWallet()

> **esunWallet**(): [`EsunWalletPayment`](../../../index/classes/EsunWalletPayment.md)

Defined in: [src/frameworks/common/newebpay-service.ts:111](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L111)

建立玉山 Wallet 支付

#### Returns

[`EsunWalletPayment`](../../../index/classes/EsunWalletPayment.md)

---

### eWalletRefund()

> **eWalletRefund**(): [`EWalletRefund`](../../../index/classes/EWalletRefund.md)

Defined in: [src/frameworks/common/newebpay-service.ts:204](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L204)

建立電子錢包退款

#### Returns

[`EWalletRefund`](../../../index/classes/EWalletRefund.md)

---

### form()

> **form**(`payment`): [`FormBuilder`](../../../index/classes/FormBuilder.md)

Defined in: [src/frameworks/common/newebpay-service.ts:153](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L153)

建立表單產生器

#### Parameters

##### payment

[`PaymentInterface`](../../../index/interfaces/PaymentInterface.md)

#### Returns

[`FormBuilder`](../../../index/classes/FormBuilder.md)

---

### fula()

> **fula**(): [`FulaPayment`](../../../index/classes/FulaPayment.md)

Defined in: [src/frameworks/common/newebpay-service.ts:132](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L132)

建立付啦支付

#### Returns

[`FulaPayment`](../../../index/classes/FulaPayment.md)

---

### linePay()

> **linePay**(): [`LinePayPayment`](../../../index/classes/LinePayPayment.md)

Defined in: [src/frameworks/common/newebpay-service.ts:97](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L97)

建立 LINE Pay 支付

#### Returns

[`LinePayPayment`](../../../index/classes/LinePayPayment.md)

---

### payment()

> **payment**(`orderNo`, `amount`, `itemDesc`, `email`): [`PaymentBuilder`](PaymentBuilder.md)

Defined in: [src/frameworks/common/newebpay-service.ts:38](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L38)

建立快速支付（簡化 API）

#### Parameters

##### orderNo

`string`

##### amount

`number`

##### itemDesc

`string`

##### email

`string` = `""`

#### Returns

[`PaymentBuilder`](PaymentBuilder.md)

---

### queryCreditDetail()

> **queryCreditDetail**(): [`QueryCreditDetail`](../../../index/classes/QueryCreditDetail.md)

Defined in: [src/frameworks/common/newebpay-service.ts:171](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L171)

建立信用卡明細查詢

#### Returns

[`QueryCreditDetail`](../../../index/classes/QueryCreditDetail.md)

---

### queryOrder()

> **queryOrder**(): [`QueryOrder`](../../../index/classes/QueryOrder.md)

Defined in: [src/frameworks/common/newebpay-service.ts:160](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L160)

建立交易查詢

#### Returns

[`QueryOrder`](../../../index/classes/QueryOrder.md)

---

### taiwanPay()

> **taiwanPay**(): [`TaiwanPayPayment`](../../../index/classes/TaiwanPayPayment.md)

Defined in: [src/frameworks/common/newebpay-service.ts:104](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L104)

建立台灣 Pay 支付

#### Returns

[`TaiwanPayPayment`](../../../index/classes/TaiwanPayPayment.md)

---

### twqr()

> **twqr**(): [`TwqrPayment`](../../../index/classes/TwqrPayment.md)

Defined in: [src/frameworks/common/newebpay-service.ts:125](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L125)

建立 TWQR 支付

#### Returns

[`TwqrPayment`](../../../index/classes/TwqrPayment.md)

---

### webAtm()

> **webAtm**(): [`WebAtmPayment`](../../../index/classes/WebAtmPayment.md)

Defined in: [src/frameworks/common/newebpay-service.ts:69](https://github.com/CarlLee1983/newebpay-node/blob/d8e55b9e8bd24262d946550a460a91116911fa5b/src/frameworks/common/newebpay-service.ts#L69)

建立 WebATM 支付

#### Returns

[`WebAtmPayment`](../../../index/classes/WebAtmPayment.md)
