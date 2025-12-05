import { describe, it, expect, vi, beforeEach } from "vitest";
import {
    paymentNotifyMiddleware,
    atmNotifyMiddleware,
    cvsNotifyMiddleware,
    cvscomNotifyMiddleware,
} from "../../../src/frameworks/express/index.js";
import { PaymentNotify, AtmNotify, CvsNotify, CvscomNotify } from "../../../src/index.js";

// Mock dependencies
vi.mock("express", () => ({ default: {} }));
vi.mock("../../../src/index.js", async () => {
    const actual = await vi.importActual("../../../src/index.js");
    return {
        ...actual,
        PaymentNotify: vi.fn(),
        AtmNotify: vi.fn(),
        CvsNotify: vi.fn(),
        CvscomNotify: vi.fn(),
    };
});

describe("Express Middleware", () => {
    const config = {
        merchantId: "MS12345678",
        hashKey: "key",
        hashIV: "iv",
    };

    const req: any = {
        body: {
            TradeInfo: "encrypted",
            TradeSha: "hash",
        },
    };
    const res: any = {};
    const next = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("paymentNotifyMiddleware", () => {
        it("should create PaymentNotify and verify", () => {
            const mockVerify = vi.fn();
            (PaymentNotify as any).mockImplementation(() => ({
                verify: mockVerify,
            }));

            const middleware = paymentNotifyMiddleware(config);
            middleware(req, res, next);

            expect(PaymentNotify).toHaveBeenCalledWith(config.hashKey, config.hashIV);
            expect(mockVerify).toHaveBeenCalledWith(req.body);
            expect(req.newebpayNotify).toBeDefined();
            expect(next).toHaveBeenCalled();
        });

        it("should skip verify if body is missing", () => {
            const mockVerify = vi.fn();
            (PaymentNotify as any).mockImplementation(() => ({
                verify: mockVerify,
            }));

            const emptyReq: any = { body: {} };
            const middleware = paymentNotifyMiddleware(config);
            middleware(emptyReq, res, next);

            expect(mockVerify).not.toHaveBeenCalled();
            expect(req.newebpayNotify).toBeDefined();
            expect(next).toHaveBeenCalled();
        });
    });

    describe("atmNotifyMiddleware", () => {
        it("should create AtmNotify and verify", () => {
            const mockVerify = vi.fn();
            (AtmNotify as any).mockImplementation(() => ({
                verify: mockVerify,
            }));

            const middleware = atmNotifyMiddleware(config);
            middleware(req, res, next);

            expect(AtmNotify).toHaveBeenCalledWith(config.hashKey, config.hashIV);
            expect(mockVerify).toHaveBeenCalledWith(req.body);
            expect(req.newebpayNotify).toBeDefined();
            expect(next).toHaveBeenCalled();
        });
    });

    describe("cvsNotifyMiddleware", () => {
        it("should create CvsNotify and verify", () => {
            const mockVerify = vi.fn();
            (CvsNotify as any).mockImplementation(() => ({
                verify: mockVerify,
            }));

            const middleware = cvsNotifyMiddleware(config);
            middleware(req, res, next);

            expect(CvsNotify).toHaveBeenCalledWith(config.hashKey, config.hashIV);
            expect(mockVerify).toHaveBeenCalledWith(req.body);
            expect(req.newebpayNotify).toBeDefined();
            expect(next).toHaveBeenCalled();
        });
    });

    describe("cvscomNotifyMiddleware", () => {
        it("should create CvscomNotify and verify", () => {
            const mockVerify = vi.fn();
            (CvscomNotify as any).mockImplementation(() => ({
                verify: mockVerify,
            }));

            const middleware = cvscomNotifyMiddleware(config);
            middleware(req, res, next);

            expect(CvscomNotify).toHaveBeenCalledWith(config.hashKey, config.hashIV);
            expect(mockVerify).toHaveBeenCalledWith(req.body);
            expect(req.newebpayNotify).toBeDefined();
            expect(next).toHaveBeenCalled();
        });
    });
});
