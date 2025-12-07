import type { Context, Next } from 'koa'
import type { NewebPayConfig } from '../common/config.js'
import { PaymentNotify, AtmNotify, CvsNotify, CvscomNotify } from '../../index.js'

declare module 'koa' {
  interface DefaultState {
    newebpayNotify?: PaymentNotify | AtmNotify | CvsNotify | CvscomNotify
  }
}

export function paymentNotifyMiddleware(config: NewebPayConfig) {
  return async (ctx: Context, next: Next) => {
    const notify = new PaymentNotify(config.hashKey, config.hashIV)
    const body = (ctx.request as any).body as Record<string, any>

    if (body?.TradeInfo && body?.TradeSha) {
      notify.verify(body)
    }

    ctx.state.newebpayNotify = notify
    await next()
  }
}

export function atmNotifyMiddleware(config: NewebPayConfig) {
  return async (ctx: Context, next: Next) => {
    const notify = new AtmNotify(config.hashKey, config.hashIV)
    const body = (ctx.request as any).body as Record<string, any>

    if (body?.TradeInfo && body?.TradeSha) {
      notify.verify(body)
    }

    ctx.state.newebpayNotify = notify
    await next()
  }
}

export function cvsNotifyMiddleware(config: NewebPayConfig) {
  return async (ctx: Context, next: Next) => {
    const notify = new CvsNotify(config.hashKey, config.hashIV)
    const body = (ctx.request as any).body as Record<string, any>

    if (body?.TradeInfo && body?.TradeSha) {
      notify.verify(body)
    }

    ctx.state.newebpayNotify = notify
    await next()
  }
}

export function cvscomNotifyMiddleware(config: NewebPayConfig) {
  return async (ctx: Context, next: Next) => {
    const notify = new CvscomNotify(config.hashKey, config.hashIV)
    const body = (ctx.request as any).body as Record<string, any>

    if (body?.TradeInfo && body?.TradeSha) {
      notify.verify(body)
    }

    ctx.state.newebpayNotify = notify
    await next()
  }
}
