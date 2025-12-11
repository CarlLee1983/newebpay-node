import type { Context, Next } from 'koa';
import { AtmNotify, CvsNotify, CvscomNotify, PaymentNotify } from '../../index.js';
import type { NewebPayConfig } from '../common/config.js';

declare module 'koa' {
  interface DefaultState {
    newebpayNotify?: PaymentNotify | AtmNotify | CvsNotify | CvscomNotify;
  }

  interface Request {
    body?: unknown;
  }
}

interface NotifyBody {
  TradeInfo?: string;
  TradeSha?: string;
  [key: string]: unknown;
}

export function paymentNotifyMiddleware(config: NewebPayConfig) {
  return async (ctx: Context, next: Next) => {
    const notify = new PaymentNotify(config.hashKey, config.hashIV);
    const body = ctx.request.body as NotifyBody | undefined;

    if (body?.TradeInfo && body?.TradeSha) {
      notify.verify(body as { TradeInfo: string; TradeSha: string });
    }

    ctx.state.newebpayNotify = notify;
    await next();
  };
}

export function atmNotifyMiddleware(config: NewebPayConfig) {
  return async (ctx: Context, next: Next) => {
    const notify = new AtmNotify(config.hashKey, config.hashIV);
    const body = ctx.request.body as NotifyBody | undefined;

    if (body?.TradeInfo && body?.TradeSha) {
      notify.verify(body as { TradeInfo: string; TradeSha: string });
    }

    ctx.state.newebpayNotify = notify;
    await next();
  };
}

export function cvsNotifyMiddleware(config: NewebPayConfig) {
  return async (ctx: Context, next: Next) => {
    const notify = new CvsNotify(config.hashKey, config.hashIV);
    const body = ctx.request.body as NotifyBody | undefined;

    if (body?.TradeInfo && body?.TradeSha) {
      notify.verify(body as { TradeInfo: string; TradeSha: string });
    }

    ctx.state.newebpayNotify = notify;
    await next();
  };
}

export function cvscomNotifyMiddleware(config: NewebPayConfig) {
  return async (ctx: Context, next: Next) => {
    const notify = new CvscomNotify(config.hashKey, config.hashIV);
    const body = ctx.request.body as NotifyBody | undefined;

    if (body?.TradeInfo && body?.TradeSha) {
      notify.verify(body as { TradeInfo: string; TradeSha: string });
    }

    ctx.state.newebpayNotify = notify;
    await next();
  };
}
