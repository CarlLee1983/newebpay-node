import { FastifyInstance, FastifyPluginAsync } from 'fastify'
// In a real project: import { createNewebPayRouter, paymentNotifyMiddleware } from "@carllee1983/newebpay/express";
// But since the current SDK only exports Express-specific helpers in /express,
// for Fastify we have to manually use the core services like NewebPayService or PaymentBuilder.
// Or if we want to adapt Express router? No, better to show native Fastify usage.
import { NewebPayService } from '../src/frameworks/common/newebpay-service.js'
import { PaymentNotify } from '../src/notifications/payment-notify.js'

const config = {
  merchantId: process.env.NEWEBPAY_MERCHANT_ID || '',
  hashKey: process.env.NEWEBPAY_HASH_KEY || '',
  hashIV: process.env.NEWEBPAY_HASH_IV || '',
  notifyUrl: 'https://myshop.com/notify',
  returnUrl: 'https://myshop.com/return',
}

export const newebpayPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = new NewebPayService(config)

  // POST /payment/create
  fastify.post('/payment/create', async (req, reply) => {
    const { orderId, amount, itemDesc, email } = req.body as any

    // Create payment parameters
    const payment = service
      .payment(orderId, amount, itemDesc, email)
      .creditCard() // Or conditional logic
      .build()

    const apiUrl = payment.getApiUrl()
    const content = payment.getContent()

    // Fastify usually returns JSON. Client-side will submit the form.
    return {
      success: true,
      data: {
        action: apiUrl,
        method: 'POST',
        fields: content,
      },
    }
  })

  // POST /payment/notify (Webhook)
  // Need raw body or parsed body? NewebPay sends x-www-form-urlencoded.
  // Fastify handles it if @fastify/form is registered.
  fastify.post('/payment/notify', async (req, reply) => {
    // req.body should be parsed form data
    const notify = new PaymentNotify(config.hashKey, config.hashIV)

    const body = req.body as Record<string, any>

    if (body?.TradeInfo && body?.TradeSha) {
      if (notify.verify(body)) {
        const data = notify.getData()
        // Handle success
        if (notify.isSuccess()) {
          console.log('Payment Success', data.MerchantOrderNo)
        }
        return reply.send('OK')
      }
    }

    return reply.code(400).send('Verification Failed')
  })
}
