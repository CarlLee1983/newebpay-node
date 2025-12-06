import type { FastifyPluginAsync } from "fastify";
import type { NewebPayConfig } from "../common/config.js";
import {
    PaymentNotify,
    AtmNotify,
    CvsNotify,
    CvscomNotify,
} from "../../index.js";

declare module 'fastify' {
    interface FastifyRequest {
        newebpayNotify?: PaymentNotify | AtmNotify | CvsNotify | CvscomNotify;
    }
}

export const newebpayPlugin: FastifyPluginAsync<NewebPayConfig> = async (fastify) => {
    // Payment Notify
    fastify.decorateRequest('newebpayNotify', undefined);
};

export const paymentNotifyPreHandler = (config: NewebPayConfig) => async (req: any, _reply: any) => {
    const notify = new PaymentNotify(config.hashKey, config.hashIV);
    if (req.body?.TradeInfo && req.body?.TradeSha) notify.verify(req.body);
    req.newebpayNotify = notify;
};

export const atmNotifyPreHandler = (config: NewebPayConfig) => async (req: any, _reply: any) => {
    const notify = new AtmNotify(config.hashKey, config.hashIV);
    if (req.body?.TradeInfo && req.body?.TradeSha) notify.verify(req.body);
    req.newebpayNotify = notify;
};

export const cvsNotifyPreHandler = (config: NewebPayConfig) => async (req: any, _reply: any) => {
    const notify = new CvsNotify(config.hashKey, config.hashIV);
    if (req.body?.TradeInfo && req.body?.TradeSha) notify.verify(req.body);
    req.newebpayNotify = notify;
};

export const cvscomNotifyPreHandler = (config: NewebPayConfig) => async (req: any, _reply: any) => {
    const notify = new CvscomNotify(config.hashKey, config.hashIV);
    if (req.body?.TradeInfo && req.body?.TradeSha) notify.verify(req.body);
    req.newebpayNotify = notify;
};
