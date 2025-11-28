/**
 * 支付方式類型。
 */
export enum PaymentType {
  /** 信用卡 */
  CREDIT = 'CREDIT',
  /** WebATM */
  WEBATM = 'WEBATM',
  /** ATM 轉帳 */
  VACC = 'VACC',
  /** 超商代碼 */
  CVS = 'CVS',
  /** 超商條碼 */
  BARCODE = 'BARCODE',
  /** LINE Pay */
  LINEPAY = 'LINEPAY',
  /** 台灣 Pay */
  TAIWANPAY = 'TAIWANPAY',
  /** 玉山 Wallet */
  ESUNWALLET = 'ESUNWALLET',
  /** BitoPay */
  BITOPAY = 'BITOPAY',
  /** TWQR */
  TWQR = 'TWQR',
  /** 付啦 */
  FULA = 'FULA',
  /** 超商取貨付款 */
  CVSCOM = 'CVSCOM',
}

/**
 * 銀行類型（ATM 轉帳）。
 */
export enum BankType {
  /** 台灣銀行 */
  BOT = 'BOT',
  /** 華南銀行 */
  HNCB = 'HNCB',
  /** 第一銀行 */
  FCB = 'FCB',
}

/**
 * 超商類型。
 */
export enum StoreType {
  /** 全家 */
  FAMI = 'FAMI',
  /** 7-ELEVEN */
  SEVEN = 'SEVEN',
  /** OK */
  OK = 'OK',
  /** 萊爾富 */
  HILIFE = 'HILIFE',
}

/**
 * 物流類型（超商取貨）。
 */
export enum LgsType {
  /** 全家 */
  FAMIC2C = 'FAMIC2C',
  /** 萊爾富 */
  HILIFEC2C = 'HILIFEC2C',
  /** OK */
  OKMARTC2C = 'OKMARTC2C',
  /** 統一 */
  UNIMARTC2C = 'UNIMARTC2C',
}

/**
 * 交易狀態。
 */
export enum TradeStatus {
  /** 交易成功 */
  SUCCESS = 'SUCCESS',
  /** 交易失敗 */
  FAILED = 'FAILED',
  /** 待付款 */
  PENDING = 'PENDING',
}

/**
 * 請退款類型。
 */
export enum CloseType {
  /** 請款 */
  PAY = 1,
  /** 退款 */
  REFUND = 2,
}

/**
 * 依據類型。
 */
export enum IndexType {
  /** 藍新交易序號 */
  TRADE_NO = '1',
  /** 特店訂單編號 */
  MERCHANT_ORDER_NO = '2',
}

