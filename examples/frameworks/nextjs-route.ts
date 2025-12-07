// pages/api/payment/create.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { NewebPayService } from '@carllee1983/newebpay/common'

const config = {
  merchantId: process.env.NEWEBPAY_MERCHANT_ID || '',
  hashKey: process.env.NEWEBPAY_HASH_KEY || '',
  hashIV: process.env.NEWEBPAY_HASH_IV || '',
  returnUrl: 'https://myshop.com/return',
  notifyUrl: 'https://myshop.com/api/payment/notify',
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const { orderId, amount, itemDesc } = req.body
  const service = new NewebPayService(config)

  const builder = service.payment(orderId, amount, itemDesc)

  // Example: simple credit card
  builder.creditCard()

  const params = builder.getParams()

  // Return generated fields to frontend
  res.status(200).json({ success: true, data: params })
}

// pages/api/payment/notify.ts
/*
import type { NextApiRequest, NextApiResponse } from 'next';
import { PaymentNotify } from '@carllee1983/newebpay';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const notify = new PaymentNotify(config.hashKey, config.hashIV);
  // Important: Next.js API Routes parse body by default. NewebPay sends url-encoded.
  // Verify encryption
  if (!notify.verify(req.body)) {
      return res.status(400).send("Verification failed");
  }

  if (notify.isSuccess()) {
      // Process order...
  }

  res.send("OK");
}
*/
