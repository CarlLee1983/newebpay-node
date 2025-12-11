import {
  AllInOnePayment,
  AtmPayment,
  BarcodePayment,
  BitoPayPayment,
  CreditCancel,
  CreditClose,
  CreditInstallment,
  CreditPayment,
  CvsPayment,
  CvscomPayment,
  EWalletRefund,
  EsunWalletPayment,
  FormBuilder,
  FulaPayment,
  LinePayPayment,
  QueryCreditDetail,
  QueryOrder,
  TaiwanPayPayment,
  TwqrPayment,
  WebAtmPayment,
} from '../../index.js';
import type { PaymentInterface } from '../../types/payment.js';
import type { NewebPayConfig } from './config.js';
import { PaymentBuilder } from './payment-builder.js';

import { FetchHttpClient } from '../../infrastructure/http/fetch-http-client.js';
/**
 * 藍新金流服務類別（類似 PHP 的 PaymentCoordinator）
 *
 * 提供統一的服務介面，簡化框架整合
 */
import type { HttpClientInterface } from '../../infrastructure/http/http-client.interface.js';

export class NewebPayService {
  private readonly httpClient: HttpClientInterface;

  constructor(
    private readonly config: NewebPayConfig,
    httpClient?: HttpClientInterface
  ) {
    this.httpClient = httpClient ?? new FetchHttpClient();
  }
  // ... (rest is same, but pass this.httpClient to operations if they support it)
  // Currently operation classes (QueryOrder, etc.) are only Builders. They have "submit()" which returns form URL? No, Query API is Direct POST.
  // Let's check QueryOrder source first.

  /**
   * 建立快速支付（簡化 API）
   */
  payment(orderNo: string, amount: number, itemDesc: string, email = ''): PaymentBuilder {
    return new PaymentBuilder(this.config).setOrder(orderNo, amount, itemDesc, email);
  }

  /**
   * 建立信用卡一次付清支付
   */
  credit(): CreditPayment {
    return this.createPayment(CreditPayment);
  }

  /**
   * 建立信用卡分期支付
   */
  creditInstallment(): CreditInstallment {
    return this.createPayment(CreditInstallment);
  }

  /**
   * 建立 WebATM 支付
   */
  webAtm(): WebAtmPayment {
    return this.createPayment(WebAtmPayment);
  }

  /**
   * 建立 ATM 轉帳支付
   */
  atm(): AtmPayment {
    return this.createPayment(AtmPayment);
  }

  /**
   * 建立超商代碼繳費支付
   */
  cvs(): CvsPayment {
    return this.createPayment(CvsPayment);
  }

  /**
   * 建立超商條碼繳費支付
   */
  barcode(): BarcodePayment {
    return this.createPayment(BarcodePayment);
  }

  /**
   * 建立 LINE Pay 支付
   */
  linePay(): LinePayPayment {
    return this.createPayment(LinePayPayment);
  }

  /**
   * 建立台灣 Pay 支付
   */
  taiwanPay(): TaiwanPayPayment {
    return this.createPayment(TaiwanPayPayment);
  }

  /**
   * 建立玉山 Wallet 支付
   */
  esunWallet(): EsunWalletPayment {
    return this.createPayment(EsunWalletPayment);
  }

  /**
   * 建立 BitoPay 支付
   */
  bitoPay(): BitoPayPayment {
    return this.createPayment(BitoPayPayment);
  }

  /**
   * 建立 TWQR 支付
   */
  twqr(): TwqrPayment {
    return this.createPayment(TwqrPayment);
  }

  /**
   * 建立付啦支付
   */
  fula(): FulaPayment {
    return this.createPayment(FulaPayment);
  }

  /**
   * 建立超商取貨付款支付
   */
  cvscom(): CvscomPayment {
    return this.createPayment(CvscomPayment);
  }

  /**
   * 建立全支付方式
   */
  allInOne(): AllInOnePayment {
    return this.createPayment(AllInOnePayment);
  }

  /**
   * 建立表單產生器
   */
  form(payment: PaymentInterface): FormBuilder {
    return FormBuilder.create(payment);
  }

  /**
   * 建立交易查詢
   */
  queryOrder(): QueryOrder {
    return QueryOrder.create(
      this.config.merchantId,
      this.config.hashKey,
      this.config.hashIV,
      this.httpClient
    ).setTestMode(this.config.testMode ?? false);
  }

  /**
   * 建立信用卡明細查詢
   */
  queryCreditDetail(): QueryCreditDetail {
    return QueryCreditDetail.create(
      this.config.merchantId,
      this.config.hashKey,
      this.config.hashIV
    ).setTestMode(this.config.testMode ?? false);
  }

  /**
   * 建立信用卡取消授權
   */
  creditCancel(): CreditCancel {
    return CreditCancel.create(
      this.config.merchantId,
      this.config.hashKey,
      this.config.hashIV
    ).setTestMode(this.config.testMode ?? false);
  }

  /**
   * 建立信用卡請退款
   */
  creditClose(): CreditClose {
    return CreditClose.create(
      this.config.merchantId,
      this.config.hashKey,
      this.config.hashIV
    ).setTestMode(this.config.testMode ?? false);
  }

  /**
   * 建立電子錢包退款
   */
  eWalletRefund(): EWalletRefund {
    return EWalletRefund.create(
      this.config.merchantId,
      this.config.hashKey,
      this.config.hashIV
    ).setTestMode(this.config.testMode ?? false);
  }

  /**
   * 建立支付操作物件（內部方法）
   */
  private createPayment<T extends PaymentInterface>(
    PaymentClass: new (merchantId: string, hashKey: string, hashIV: string) => T
  ): T {
    const payment = new PaymentClass(
      this.config.merchantId,
      this.config.hashKey,
      this.config.hashIV
    ) as T & {
      setTestMode?: (test: boolean) => T;
      setCustomerURL?: (url: string) => T;
      setClientBackURL?: (url: string) => T;
    };

    if (this.config.testMode !== undefined && payment.setTestMode) {
      payment.setTestMode(this.config.testMode);
    }

    if (this.config.returnUrl) {
      payment.setReturnURL(this.config.returnUrl);
    }

    if (this.config.notifyUrl) {
      payment.setNotifyURL(this.config.notifyUrl);
    }

    if (this.config.customerUrl && payment.setCustomerURL) {
      payment.setCustomerURL(this.config.customerUrl);
    }

    if (this.config.clientBackUrl && payment.setClientBackURL) {
      payment.setClientBackURL(this.config.clientBackUrl);
    }

    return payment as T;
  }
}
