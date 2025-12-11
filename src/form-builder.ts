import type { PaymentInterface } from './types/payment.js';

/**
 * HTML 表單產生器選項。
 */
export interface FormBuilderOptions {
  /**
   * 是否自動送出表單。
   */
  autoSubmit?: boolean;

  /**
   * 表單 ID。
   */
  formId?: string;

  /**
   * 送出按鈕文字。
   */
  submitButtonText?: string;
}

/**
 * HTML 表單產生器。
 *
 * 用於產生自動送出或手動送出的支付表單。
 *
 * ## 使用情境
 *
 * ### 1. 傳統 HTML 表單（自動送出）
 * ```typescript
 * const builder = FormBuilder.create(payment);
 * const html = builder.build(); // 產生包含自動送出腳本的 HTML
 * ```
 *
 * ### 2. 前端自訂表單
 * 當你需要在前端框架（React、Vue 等）中自訂表單 UI 時，可以使用以下方法：
 *
 * - `getFormData()` 或 `getData()`: 取得完整的表單資料（包含 action、method、fields）
 * - `getFields()`: 只取得表單欄位資料
 *
 * ```typescript
 * const builder = FormBuilder.create(payment);
 * const { action, method, fields } = builder.getData();
 * // 或只取得欄位
 * const fields = builder.getFields();
 * ```
 *
 * 這樣你就可以在前端使用 Fetch API、Axios 或其他 HTTP 客戶端來提交表單資料。
 */
export class FormBuilder {
  private readonly payment: PaymentInterface;
  private readonly options: Required<FormBuilderOptions>;

  /**
   * 建立表單產生器。
   *
   * @param payment 支付操作物件
   * @param options 選項
   */
  constructor(payment: PaymentInterface, options: FormBuilderOptions = {}) {
    this.payment = payment;
    this.options = {
      autoSubmit: options.autoSubmit ?? true,
      formId: options.formId ?? 'newebpay-form',
      submitButtonText: options.submitButtonText ?? '前往付款',
    };
  }

  /**
   * 從支付操作物件建立表單產生器。
   *
   * @param payment 支付操作物件
   * @param options 選項
   */
  static create(payment: PaymentInterface, options?: FormBuilderOptions): FormBuilder {
    return new FormBuilder(payment, options);
  }

  /**
   * 設定是否自動送出。
   */
  setAutoSubmit(autoSubmit: boolean): this {
    (this.options as { autoSubmit: boolean }).autoSubmit = autoSubmit;
    return this;
  }

  /**
   * 設定表單 ID。
   */
  setFormId(formId: string): this {
    (this.options as { formId: string }).formId = formId;
    return this;
  }

  /**
   * 設定送出按鈕文字。
   */
  setSubmitButtonText(text: string): this {
    (this.options as { submitButtonText: string }).submitButtonText = text;
    return this;
  }

  /**
   * 產生 HTML 表單。
   */
  build(): string {
    const content = this.payment.getContent();
    const apiUrl = this.getApiUrl();

    const hiddenFields = Object.entries(content)
      .map(
        ([name, value]) =>
          `<input type="hidden" name="${this.escapeHtml(name)}" value="${this.escapeHtml(String(value))}">`
      )
      .join('\n    ');

    const autoSubmitScript = this.options.autoSubmit
      ? `<script>document.getElementById('${this.escapeHtml(this.options.formId)}').submit();</script>`
      : '';

    const submitButton = this.options.autoSubmit
      ? ''
      : `<button type="submit">${this.escapeHtml(this.options.submitButtonText)}</button>`;

    return `<form id="${this.escapeHtml(this.options.formId)}" method="POST" action="${this.escapeHtml(apiUrl)}">
    ${hiddenFields}
    ${submitButton}
</form>
${autoSubmitScript}`;
  }

  /**
   * 取得表單資料（不含 HTML）。
   *
   * 返回包含 action、method 和 fields 的完整表單資料物件。
   * 適用於前端自訂表單的情境，可以使用 Fetch API 或其他 HTTP 客戶端提交。
   *
   * @returns 表單資料物件，包含 action（API 端點）、method（HTTP 方法）和 fields（表單欄位）
   *
   * @example
   * ```typescript
   * const builder = FormBuilder.create(payment);
   * const { action, method, fields } = builder.getFormData();
   *
   * // 使用 Fetch API 提交
   * const formData = new FormData();
   * Object.entries(fields).forEach(([key, value]) => {
   *   formData.append(key, value);
   * });
   * await fetch(action, { method, body: formData });
   * ```
   */
  getFormData(): {
    action: string;
    method: string;
    fields: Record<string, string>;
  } {
    const content = this.payment.getContent();

    return {
      action: this.getApiUrl(),
      method: 'POST',
      fields: {
        MerchantID: content.MerchantID,
        TradeInfo: content.TradeInfo,
        TradeSha: content.TradeSha,
        Version: content.Version,
      },
    };
  }

  /**
   * 取得表單資料（不含 HTML）。
   *
   * 這是 `getFormData()` 的別名方法，提供更簡潔的命名。
   * 適用於前端自訂表單的情境。
   *
   * @returns 表單資料物件，包含 action（API 端點）、method（HTTP 方法）和 fields（表單欄位）
   *
   * @example
   * ```typescript
   * const builder = FormBuilder.create(payment);
   * const { action, method, fields } = builder.getData();
   * ```
   */
  getData(): {
    action: string;
    method: string;
    fields: Record<string, string>;
  } {
    return this.getFormData();
  }

  /**
   * 取得表單欄位資料。
   *
   * 只返回表單欄位物件，不包含 action 和 method。
   * 適用於只需要欄位資料的情境，例如在 React/Vue 中動態建立表單元素。
   *
   * @returns 表單欄位物件，包含 MerchantID、TradeInfo、TradeSha、Version
   *
   * @example
   * ```typescript
   * const builder = FormBuilder.create(payment);
   * const fields = builder.getFields();
   *
   * // 在 React 中使用
   * Object.entries(fields).map(([name, value]) => (
   *   <input key={name} type="hidden" name={name} value={value} />
   * ));
   * ```
   */
  getFields(): Record<string, string> {
    return this.getFormData().fields;
  }

  /**
   * 取得 API 網址。
   */
  private getApiUrl(): string {
    // 檢查 payment 是否有 getApiUrl 方法
    if ('getApiUrl' in this.payment && typeof this.payment.getApiUrl === 'function') {
      return (this.payment as { getApiUrl: () => string }).getApiUrl();
    }

    // 檢查 payment 是否有 getBaseUrl 和 getRequestPath 方法
    if ('getBaseUrl' in this.payment && typeof this.payment.getBaseUrl === 'function') {
      const baseUrl = (this.payment as { getBaseUrl: () => string }).getBaseUrl();
      return baseUrl + this.payment.getRequestPath();
    }

    // 檢查是否為測試模式
    const isTest =
      'isTestMode' in this.payment && typeof this.payment.isTestMode === 'function'
        ? (this.payment as { isTestMode: () => boolean }).isTestMode()
        : false;

    const baseUrl = isTest ? 'https://ccore.newebpay.com' : 'https://core.newebpay.com';
    return baseUrl + this.payment.getRequestPath();
  }

  /**
   * HTML 跳脫。
   */
  private escapeHtml(str: string): string {
    const htmlEscapes: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return str.replace(/[&<>"']/g, (char) => htmlEscapes[char] ?? char);
  }
}
