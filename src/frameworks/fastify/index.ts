import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { AtmNotify, CvsNotify, CvscomNotify, PaymentNotify } from '../../index.js';
import type { NewebPayConfig } from '../common/config.js';

declare module 'fastify' {
  interface FastifyRequest {
    newebpayNotify?: PaymentNotify | AtmNotify | CvsNotify | CvscomNotify;
  }
}

export const newebpayPlugin: FastifyPluginAsync<NewebPayConfig> = async (fastify) => {
  // Payment Notify
  fastify.decorateRequest('newebpayNotify', undefined);
};

export const paymentNotifyPreHandler =
  (config: NewebPayConfig) => async (req: FastifyRequest, _reply: FastifyReply) => {
    const notify = new PaymentNotify(config.hashKey, config.hashIV);
    if (
      req.body &&
      typeof req.body === 'object' &&
      'TradeInfo' in req.body &&
      'TradeSha' in req.body
    ) {
      notify.verify(req.body as { TradeInfo: string; TradeSha: string });
    }
    req.newebpayNotify = notify;
  };

export const atmNotifyPreHandler =
  (config: NewebPayConfig) => async (req: FastifyRequest, _reply: FastifyReply) => {
    const notify = new AtmNotify(config.hashKey, config.hashIV);
    if (
      req.body &&
      typeof req.body === 'object' &&
      'TradeInfo' in req.body &&
      'TradeSha' in req.body
    ) {
      notify.verify(req.body as { TradeInfo: string; TradeSha: string });
    }
    req.newebpayNotify = notify;
  };

export const cvsNotifyPreHandler =
  (config: NewebPayConfig) => async (req: FastifyRequest, _reply: FastifyReply) => {
    const notify = new CvsNotify(config.hashKey, config.hashIV);
    if (
      req.body &&
      typeof req.body === 'object' &&
      'TradeInfo' in req.body &&
      'TradeSha' in req.body
    ) {
      notify.verify(req.body as { TradeInfo: string; TradeSha: string });
    }
    req.newebpayNotify = notify;
  };

export const cvscomNotifyPreHandler =
  (config: NewebPayConfig) => async (req: FastifyRequest, _reply: FastifyReply) => {
    const notify = new CvscomNotify(config.hashKey, config.hashIV);
    if (
      req.body &&
      typeof req.body === 'object' &&
      'TradeInfo' in req.body &&
      'TradeSha' in req.body
    ) {
      notify.verify(req.body as { TradeInfo: string; TradeSha: string });
    }
    req.newebpayNotify = notify;
  };
