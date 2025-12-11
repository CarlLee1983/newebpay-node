import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createNewebPayRouter } from '../../../src/frameworks/express/index.js'
import { NewebPayService } from '../../../src/frameworks/common/newebpay-service.js'

const { mockRouter, mockExpress, mockBuilder, mockServiceInstance } = vi.hoisted(() => {
  const mockRouter = {
    post: vi.fn(),
  }
  const mockExpress = {
    Router: vi.fn(() => mockRouter),
    json: vi.fn(() => 'jsonMiddleware'),
    urlencoded: vi.fn(() => 'urlencodedMiddleware'),
  }

  const mockBuilder = {
    creditCard: vi.fn(),
    creditInstallment: vi.fn(),
    webAtm: vi.fn(),
    atm: vi.fn(),
    cvs: vi.fn(),
    barcode: vi.fn(),
    linePay: vi.fn(),
    taiwanPay: vi.fn(),
    allInOne: vi.fn(),
    customize: vi.fn(),
    getParams: vi.fn(() => ({ param: 'value' })),
  }

  const mockServiceInstance = {
    payment: vi.fn(() => mockBuilder),
  }

  return { mockRouter, mockExpress, mockBuilder, mockServiceInstance }
})

vi.mock('express', () => ({
  default: mockExpress,
}))

vi.mock('../../../src/frameworks/common/newebpay-service.js', () => ({
  NewebPayService: vi.fn(() => mockServiceInstance),
}))

vi.mock('../../../src/frameworks/express/middleware.js', () => ({
  paymentNotifyMiddleware: vi.fn(() => 'paymentNotifyMiddleware'),
  atmNotifyMiddleware: vi.fn(() => 'atmNotifyMiddleware'),
  cvsNotifyMiddleware: vi.fn(() => 'cvsNotifyMiddleware'),
  cvscomNotifyMiddleware: vi.fn(() => 'cvscomNotifyMiddleware'),
}))

describe('createNewebPayRouter', () => {
  const config = {
    merchantId: 'TEST',
    hashKey: 'KEY',
    hashIV: 'IV',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('應建立並回傳 Express Router', () => {
    const router = createNewebPayRouter(config)
    expect(mockExpress.Router).toHaveBeenCalled()
    expect(router).toBe(mockRouter)
    expect(NewebPayService).toHaveBeenCalledWith(config)
  })

  describe('POST /payment/create', () => {
    let createHandler: any

    beforeEach(() => {
      createNewebPayRouter(config)
      const call = mockRouter.post.mock.calls.find((c) => c[0] === '/payment/create')!
      createHandler = call[2] // [path, middleware, handler]
    })

    it('應處理缺少必填欄位的錯誤', () => {
      const req = { body: {} }
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      }

      createHandler(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.stringContaining('Missing') }),
      )
    })

    it('應成功建立支付並回傳參數', () => {
      const req = {
        body: {
          orderId: 'ORDER1',
          amount: 100,
          itemDesc: 'Item',
          email: 'test@example.com',
          paymentType: 'credit',
        },
      }
      const res = {
        json: vi.fn(),
      }

      createHandler(req, res)

      expect(mockServiceInstance.payment).toHaveBeenCalledWith(
        'ORDER1',
        100,
        'Item',
        'test@example.com',
      )
      expect(mockBuilder.creditCard).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalledWith({ success: true, data: { param: 'value' } })
    })

    it('應支援 installment 支付方式', () => {
      const req = {
        body: {
          orderId: 'ORDER1',
          amount: 100,
          itemDesc: 'Item',
          paymentType: 'installment',
          installments: 3,
        },
      }
      const res = { json: vi.fn() }

      createHandler(req, res)
      expect(mockBuilder.creditInstallment).toHaveBeenCalledWith(3)
    })

    it('應支援 webatm 支付方式', () => {
      const req = { body: { orderId: '1', amount: 100, itemDesc: 'I', paymentType: 'webatm' } }
      const res = { json: vi.fn() }
      createHandler(req, res)
      expect(mockBuilder.webAtm).toHaveBeenCalled()
    })

    it('應支援 atm 支付方式', () => {
      const req = {
        body: {
          orderId: '1',
          amount: 100,
          itemDesc: 'I',
          paymentType: 'atm',
          expireDate: '20231231',
        },
      }
      const res = { json: vi.fn() }
      createHandler(req, res)
      expect(mockBuilder.atm).toHaveBeenCalledWith('20231231')
    })

    it('應支援 cvs 支付方式', () => {
      const req = {
        body: {
          orderId: '1',
          amount: 100,
          itemDesc: 'I',
          paymentType: 'cvs',
          expireDate: '20231231',
        },
      }
      const res = { json: vi.fn() }
      createHandler(req, res)
      expect(mockBuilder.cvs).toHaveBeenCalledWith('20231231')
    })

    it('應支援 barcode 支付方式', () => {
      const req = {
        body: {
          orderId: '1',
          amount: 100,
          itemDesc: 'I',
          paymentType: 'barcode',
          expireDate: '20231231',
        },
      }
      const res = { json: vi.fn() }
      createHandler(req, res)
      expect(mockBuilder.barcode).toHaveBeenCalledWith('20231231')
    })

    it('應支援 linepay 支付方式', () => {
      const req = { body: { orderId: '1', amount: 100, itemDesc: 'I', paymentType: 'linepay' } }
      const res = { json: vi.fn() }
      createHandler(req, res)
      expect(mockBuilder.linePay).toHaveBeenCalled()
    })

    it('應支援 taiwanpay 支付方式', () => {
      const req = { body: { orderId: '1', amount: 100, itemDesc: 'I', paymentType: 'taiwanpay' } }
      const res = { json: vi.fn() }
      createHandler(req, res)
      expect(mockBuilder.taiwanPay).toHaveBeenCalled()
    })

    it('應支援 allinone 支付方式', () => {
      const req = { body: { orderId: '1', amount: 100, itemDesc: 'I', paymentType: 'allinone' } }
      const res = { json: vi.fn() }
      createHandler(req, res)
      expect(mockBuilder.allInOne).toHaveBeenCalled()
    })

    it('應忽略 JSON body 中的 customize 欄位（因為 JSON 無法包含 function）', () => {
      const req = {
        body: {
          orderId: 'ORDER1',
          amount: 100,
          itemDesc: 'Item',
          customize: 'some-value', // JSON body 中的值，不是 function
        },
      }
      const res = { json: vi.fn() }

      createHandler(req, res)
      // customize 方法不應該被調用，因為 JSON body 無法包含 function
      expect(mockBuilder.customize).not.toHaveBeenCalled()
      expect(res.json).toHaveBeenCalled()
    })

    it('應處理未知的錯誤', () => {
      mockServiceInstance.payment.mockImplementationOnce(() => {
        throw new Error('Test Error')
      })
      const req = {
        body: {
          orderId: 'ORDER1',
          amount: 100,
          itemDesc: 'Item',
        },
      }
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      }

      createHandler(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ error: 'Test Error' })
    })

    it('應處理非 Error 物件的錯誤', () => {
      mockServiceInstance.payment.mockImplementationOnce(() => {
        throw 'String Error'
      })
      const req = { body: { orderId: '1', amount: 1, itemDesc: 'I' } }
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() }
      createHandler(req, res)
      expect(res.json).toHaveBeenCalledWith({ error: 'Unknown error' })
    })
  })

  describe('Notifications', () => {
    let paymentNotifyHandler: any

    beforeEach(() => {
      createNewebPayRouter(config)
      const call = mockRouter.post.mock.calls.find((c) => c[0] === '/payment/notify')!
      paymentNotifyHandler = call[3] // [path, middleware, middleware, handler]
    })

    it('POST /payment/notify 驗證失敗應回傳 400', () => {
      const req = { newebpayNotify: null }
      const res = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
      }

      paymentNotifyHandler(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Verification failed')
    })

    it('POST /payment/notify 驗證成功應回傳 OK', () => {
      const req = {
        newebpayNotify: {
          isVerified: () => true,
          isSuccess: () => true,
        },
      }
      const res = { send: vi.fn() }

      paymentNotifyHandler(req, res)
      expect(res.send).toHaveBeenCalledWith('OK')
    })

    it('POST /atm/notify 驗證成功應回傳 OK', () => {
      const call = mockRouter.post.mock.calls.find((c) => c[0] === '/atm/notify')!
      const handler = call[3]
      const req = { newebpayNotify: { isVerified: () => true } }
      const res = { send: vi.fn() }
      handler(req, res)
      expect(res.send).toHaveBeenCalledWith('OK')
    })

    it('POST /atm/notify 驗證失敗應回傳 400', () => {
      const call = mockRouter.post.mock.calls.find((c) => c[0] === '/atm/notify')!
      const handler = call[3]
      const req = { newebpayNotify: null }
      const res = { status: vi.fn().mockReturnThis(), send: vi.fn() }
      handler(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
    })

    it('POST /cvs/notify 驗證成功應回傳 OK', () => {
      const call = mockRouter.post.mock.calls.find((c) => c[0] === '/cvs/notify')!
      const handler = call[3]
      const req = { newebpayNotify: { isVerified: () => true } }
      const res = { send: vi.fn() }
      handler(req, res)
      expect(res.send).toHaveBeenCalledWith('OK')
    })

    it('POST /cvs/notify 驗證失敗應回傳 400', () => {
      const call = mockRouter.post.mock.calls.find((c) => c[0] === '/cvs/notify')!
      const handler = call[3]
      const req = { newebpayNotify: null }
      const res = { status: vi.fn().mockReturnThis(), send: vi.fn() }
      handler(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
    })

    it('POST /cvscom/notify 驗證成功應回傳 OK', () => {
      const call = mockRouter.post.mock.calls.find((c) => c[0] === '/cvscom/notify')!
      const handler = call[3]
      const req = { newebpayNotify: { isVerified: () => true } }
      const res = { send: vi.fn() }
      handler(req, res)
      expect(res.send).toHaveBeenCalledWith('OK')
    })

    it('POST /cvscom/notify 驗證失敗應回傳 400', () => {
      const call = mockRouter.post.mock.calls.find((c) => c[0] === '/cvscom/notify')!
      const handler = call[3]
      const req = { newebpayNotify: null }
      const res = { status: vi.fn().mockReturnThis(), send: vi.fn() }
      handler(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
    })
  })
})
