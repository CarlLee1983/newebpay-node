import type { Request, Response, NextFunction } from 'express';
import {
  PaymentNotify,
  AtmNotify,
  CvsNotify,
  CvscomNotify,
} from '../../index.js';
import type { NewebPayConfig } from '../common/config.js';

/**
 * 擴充 Express Request 型別
 */
declare global {
  namespace Express {
    interface Request {
      newebpayNotify?: PaymentNotify | AtmNotify | CvsNotify | CvscomNotify;
    }
  }
}

/**
 * 支付完成通知 Middleware
 */
export function paymentNotifyMiddleware(config: NewebPayConfig) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const notify = new PaymentNotify(config.hashKey, config.hashIV);

    if (req.body?.TradeInfo && req.body?.TradeSha) {
      notify.verify(req.body);
    }

    req.newebpayNotify = notify;
    next();
  };
}

/**
 * ATM 取號通知 Middleware
 */
export function atmNotifyMiddleware(config: NewebPayConfig) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const notify = new AtmNotify(config.hashKey, config.hashIV);

    if (req.body?.TradeInfo && req.body?.TradeSha) {
      notify.verify(req.body);
    }

    req.newebpayNotify = notify;
    next();
  };
}

/**
 * 超商取號通知 Middleware
 */
export function cvsNotifyMiddleware(config: NewebPayConfig) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const notify = new CvsNotify(config.hashKey, config.hashIV);

    if (req.body?.TradeInfo && req.body?.TradeSha) {
      notify.verify(req.body);
    }

    req.newebpayNotify = notify;
    next();
  };
}

/**
 * 超商取貨付款通知 Middleware
 */
export function cvscomNotifyMiddleware(config: NewebPayConfig) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const notify = new CvscomNotify(config.hashKey, config.hashIV);

    if (req.body?.TradeInfo && req.body?.TradeSha) {
      notify.verify(req.body);
    }

    req.newebpayNotify = notify;
    next();
  };
}

