/**
 * 通知處理器介面。
 */
export interface NotifyHandlerInterface {
  /**
   * 驗證通知資料。
   */
  verify(data: NotifyRawData): boolean;

  /**
   * 取得解密後的資料。
   */
  getData(): Record<string, unknown>;

  /**
   * 是否成功。
   */
  isSuccess(): boolean;

  /**
   * 取得狀態。
   */
  getStatus(): string;

  /**
   * 取得訊息。
   */
  getMessage(): string;
}

/**
 * 原始通知資料。
 */
export interface NotifyRawData {
  Status?: string;
  MerchantID?: string;
  TradeInfo?: string;
  TradeSha?: string;
  Version?: string;
  [key: string]: unknown;
}

/**
 * 支付通知結果。
 */
export interface PaymentNotifyResult {
  Status: string;
  Message: string;
  MerchantID?: string;
  Result?: PaymentResultData;
}

/**
 * 支付結果資料。
 */
export interface PaymentResultData {
  MerchantID?: string;
  MerchantOrderNo?: string;
  TradeNo?: string;
  Amt?: number;
  PaymentType?: string;
  PayTime?: string;
  IP?: string;
  PayBankCode?: string;
  /** 信用卡授權碼 */
  Auth?: string;
  /** 卡號末四碼 */
  Card4No?: string;
  /** 卡號前六碼 */
  Card6No?: string;
  /** ECI 值 */
  ECI?: string;
  /** 分期期數 */
  Inst?: number;
  /** 首期金額 */
  InstFirst?: number;
  /** 每期金額 */
  InstEach?: number;
  [key: string]: unknown;
}

/**
 * ATM 取號通知結果。
 */
export interface AtmNotifyResult {
  Status: string;
  Message: string;
  Result?: AtmResultData;
}

/**
 * ATM 取號結果資料。
 */
export interface AtmResultData {
  MerchantID?: string;
  MerchantOrderNo?: string;
  TradeNo?: string;
  Amt?: number;
  BankCode?: string;
  CodeNo?: string;
  ExpireDate?: string;
  ExpireTime?: string;
  [key: string]: unknown;
}

/**
 * 超商取號通知結果。
 */
export interface CvsNotifyResult {
  Status: string;
  Message: string;
  Result?: CvsResultData;
}

/**
 * 超商取號結果資料。
 */
export interface CvsResultData {
  MerchantID?: string;
  MerchantOrderNo?: string;
  TradeNo?: string;
  Amt?: number;
  PaymentType?: string;
  CodeNo?: string;
  StoreType?: string;
  ExpireDate?: string;
  ExpireTime?: string;
  /** 條碼第一段 */
  Barcode_1?: string;
  /** 條碼第二段 */
  Barcode_2?: string;
  /** 條碼第三段 */
  Barcode_3?: string;
  [key: string]: unknown;
}

/**
 * 超商取貨付款通知結果。
 */
export interface CvscomNotifyResult {
  Status: string;
  Message: string;
  Result?: CvscomResultData;
}

/**
 * 超商取貨付款結果資料。
 */
export interface CvscomResultData {
  MerchantID?: string;
  MerchantOrderNo?: string;
  TradeNo?: string;
  Amt?: number;
  PaymentType?: string;
  StoreType?: string;
  StoreCode?: string;
  StoreName?: string;
  StoreAddr?: string;
  TradeType?: number;
  CVSCOMName?: string;
  CVSCOMPhone?: string;
  LgsNo?: string;
  LgsType?: string;
  [key: string]: unknown;
}
