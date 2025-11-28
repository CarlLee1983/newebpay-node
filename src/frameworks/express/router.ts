import type { Router } from 'express';
import express from 'express';
import { NewebPayService } from '../common/newebpay-service.js';
import type { NewebPayConfig } from '../common/config.js';
import {
  paymentNotifyMiddleware,
  atmNotifyMiddleware,
  cvsNotifyMiddleware,
  cvscomNotifyMiddleware,
} from './middleware.js';

/**
 * 建立藍新金流 Express Router
 */
export function createNewebPayRouter(config: NewebPayConfig): Router {
  const router = express.Router();
  const newebpay = new NewebPayService(config);

  // POST /payment/create - 建立支付
  router.post('/payment/create', express.json(), (req, res): void => {
    try {
      const { orderId, amount, itemDesc, email, paymentType, expireDate } =
        req.body;

      if (!orderId || !amount || !itemDesc) {
        res.status(400).json({
          error: 'Missing required fields: orderId, amount, itemDesc',
        });
        return;
      }

      const builder = newebpay.payment(orderId, amount, itemDesc, email ?? '');

      // 根據 paymentType 設定支付方式
      switch (paymentType) {
        case 'credit':
          builder.creditCard();
          break;
        case 'installment':
          builder.creditInstallment(req.body.installments);
          break;
        case 'webatm':
          builder.webAtm();
          break;
        case 'atm':
          builder.atm(expireDate);
          break;
        case 'cvs':
          builder.cvs(expireDate);
          break;
        case 'barcode':
          builder.barcode(expireDate);
          break;
        case 'linepay':
          builder.linePay();
          break;
        case 'taiwanpay':
          builder.taiwanPay();
          break;
        case 'allinone':
          builder.allInOne();
          break;
        default:
          builder.creditCard();
      }

      // 自訂設定
      if (req.body.customize && typeof req.body.customize === 'function') {
        builder.customize(req.body.customize);
      }

      const params = builder.getParams();

      res.json({
        success: true,
        data: params,
      });
      return;
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return;
    }
  });

  // POST /payment/notify - 支付完成通知
  router.post(
    '/payment/notify',
    express.urlencoded({ extended: true }),
    paymentNotifyMiddleware(config),
    (req, res): void => {
      const notify = req.newebpayNotify;

      if (!notify || !notify.isVerified()) {
        res.status(400).send('Verification failed');
        return;
      }

      if (notify.isSuccess()) {
        // 觸發事件或處理邏輯
        // 例如：req.app.emit('newebpay:payment:success', notify);
      }

      res.send('OK');
    }
  );

  // POST /atm/notify - ATM 取號通知
  router.post(
    '/atm/notify',
    express.urlencoded({ extended: true }),
    atmNotifyMiddleware(config),
    (req, res): void => {
      const notify = req.newebpayNotify;

      if (!notify || !notify.isVerified()) {
        res.status(400).send('Verification failed');
        return;
      }

      res.send('OK');
    }
  );

  // POST /cvs/notify - 超商取號通知
  router.post(
    '/cvs/notify',
    express.urlencoded({ extended: true }),
    cvsNotifyMiddleware(config),
    (req, res): void => {
      const notify = req.newebpayNotify;

      if (!notify || !notify.isVerified()) {
        res.status(400).send('Verification failed');
        return;
      }

      res.send('OK');
    }
  );

  // POST /cvscom/notify - 超商取貨付款通知
  router.post(
    '/cvscom/notify',
    express.urlencoded({ extended: true }),
    cvscomNotifyMiddleware(config),
    (req, res): void => {
      const notify = req.newebpayNotify;

      if (!notify || !notify.isVerified()) {
        res.status(400).send('Verification failed');
        return;
      }

      res.send('OK');
    }
  );

  return router;
}

