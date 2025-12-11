import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  paymentNotifyMiddleware,
  atmNotifyMiddleware,
  cvsNotifyMiddleware,
  cvscomNotifyMiddleware,
} from '../../../src/frameworks/express/index.js'
import { PaymentNotify, AtmNotify, CvsNotify, CvscomNotify } from '../../../src/index.js'

// Mock dependencies
vi.mock('express', () => ({ default: {} }))
vi.mock('../../../src/index.js', async () => {
  const actual = await vi.importActual('../../../src/index.js')
  return {
    ...actual,
    PaymentNotify: vi.fn(),
    AtmNotify: vi.fn(),
    CvsNotify: vi.fn(),
    CvscomNotify: vi.fn(),
  }
})

describe('Express Middleware', () => {
  const config = {
    merchantId: 'MS12345678',
    hashKey: 'key',
    hashIV: 'iv',
  }

  const req: any = {
    body: {
      TradeInfo: 'encrypted',
      TradeSha: 'hash',
    },
  }
  const res: any = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  }
  const next = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('paymentNotifyMiddleware', () => {
    it('should create PaymentNotify and verify successfully', () => {
      const mockVerify = vi.fn().mockReturnValue(true)
      ;(PaymentNotify as any).mockImplementation(() => ({
        verify: mockVerify,
      }))

      const middleware = paymentNotifyMiddleware(config)
      middleware(req, res, next)

      expect(PaymentNotify).toHaveBeenCalledWith(config.hashKey, config.hashIV)
      expect(mockVerify).toHaveBeenCalledWith(req.body)
      expect(req.newebpayNotify).toBeDefined()
      expect(next).toHaveBeenCalled()
      expect(res.status).not.toHaveBeenCalled()
    })

    it('should return 400 if verification fails', () => {
      const mockVerify = vi.fn().mockReturnValue(false)
      ;(PaymentNotify as any).mockImplementation(() => ({
        verify: mockVerify,
      }))

      const middleware = paymentNotifyMiddleware(config)
      middleware(req, res, next)

      expect(mockVerify).toHaveBeenCalledWith(req.body)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        error: 'TradeSha verification failed',
        code: 'CHECK_VALUE_FAILED',
      })
      expect(next).not.toHaveBeenCalled()
    })

    it('should skip verify if body is missing', () => {
      const mockVerify = vi.fn()
      ;(PaymentNotify as any).mockImplementation(() => ({
        verify: mockVerify,
      }))

      const emptyReq: any = { body: {} }
      const middleware = paymentNotifyMiddleware(config)
      middleware(emptyReq, res, next)

      expect(mockVerify).not.toHaveBeenCalled()
      expect(emptyReq.newebpayNotify).toBeDefined()
      expect(next).toHaveBeenCalled()
      expect(res.status).not.toHaveBeenCalled()
    })
  })

  describe('atmNotifyMiddleware', () => {
    it('should create AtmNotify and verify successfully', () => {
      const mockVerify = vi.fn().mockReturnValue(true)
      ;(AtmNotify as any).mockImplementation(() => ({
        verify: mockVerify,
      }))

      const middleware = atmNotifyMiddleware(config)
      middleware(req, res, next)

      expect(AtmNotify).toHaveBeenCalledWith(config.hashKey, config.hashIV)
      expect(mockVerify).toHaveBeenCalledWith(req.body)
      expect(req.newebpayNotify).toBeDefined()
      expect(next).toHaveBeenCalled()
      expect(res.status).not.toHaveBeenCalled()
    })

    it('should return 400 if verification fails', () => {
      const mockVerify = vi.fn().mockReturnValue(false)
      ;(AtmNotify as any).mockImplementation(() => ({
        verify: mockVerify,
      }))

      const middleware = atmNotifyMiddleware(config)
      middleware(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        error: 'TradeSha verification failed',
        code: 'CHECK_VALUE_FAILED',
      })
      expect(next).not.toHaveBeenCalled()
    })
  })

  describe('cvsNotifyMiddleware', () => {
    it('should create CvsNotify and verify successfully', () => {
      const mockVerify = vi.fn().mockReturnValue(true)
      ;(CvsNotify as any).mockImplementation(() => ({
        verify: mockVerify,
      }))

      const middleware = cvsNotifyMiddleware(config)
      middleware(req, res, next)

      expect(CvsNotify).toHaveBeenCalledWith(config.hashKey, config.hashIV)
      expect(mockVerify).toHaveBeenCalledWith(req.body)
      expect(req.newebpayNotify).toBeDefined()
      expect(next).toHaveBeenCalled()
      expect(res.status).not.toHaveBeenCalled()
    })

    it('should return 400 if verification fails', () => {
      const mockVerify = vi.fn().mockReturnValue(false)
      ;(CvsNotify as any).mockImplementation(() => ({
        verify: mockVerify,
      }))

      const middleware = cvsNotifyMiddleware(config)
      middleware(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        error: 'TradeSha verification failed',
        code: 'CHECK_VALUE_FAILED',
      })
      expect(next).not.toHaveBeenCalled()
    })
  })

  describe('cvscomNotifyMiddleware', () => {
    it('should create CvscomNotify and verify successfully', () => {
      const mockVerify = vi.fn().mockReturnValue(true)
      ;(CvscomNotify as any).mockImplementation(() => ({
        verify: mockVerify,
      }))

      const middleware = cvscomNotifyMiddleware(config)
      middleware(req, res, next)

      expect(CvscomNotify).toHaveBeenCalledWith(config.hashKey, config.hashIV)
      expect(mockVerify).toHaveBeenCalledWith(req.body)
      expect(req.newebpayNotify).toBeDefined()
      expect(next).toHaveBeenCalled()
      expect(res.status).not.toHaveBeenCalled()
    })

    it('should return 400 if verification fails', () => {
      const mockVerify = vi.fn().mockReturnValue(false)
      ;(CvscomNotify as any).mockImplementation(() => ({
        verify: mockVerify,
      }))

      const middleware = cvscomNotifyMiddleware(config)
      middleware(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        error: 'TradeSha verification failed',
        code: 'CHECK_VALUE_FAILED',
      })
      expect(next).not.toHaveBeenCalled()
    })
  })
})
