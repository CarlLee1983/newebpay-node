import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import { createNewebPayRouter, paymentNotifyMiddleware } from "../../src/frameworks/express/index.js";
import { TEST_CONFIG, createMockCallbackPayload, MOCK_PAYMENT_DATA } from "../fixtures/index.js";

// E2E Test: Express Framework
// Tests the full flow from an Express application perspective, using Supertest to simulate HTTP requests.
describe("E2E: Express Framework", () => {
    const app = express();

    // 1. Setup global middleware if any (e.g. body-parser is handling in router, but let's see)
    // The createNewebPayRouter handles body parsing for its own routes.

    // 2. Mount the NewebPay router
    const router = createNewebPayRouter({
        merchantId: TEST_CONFIG.merchantId,
        hashKey: TEST_CONFIG.hashKey,
        hashIV: TEST_CONFIG.hashIV,
        notifyUrl: "https://myshop.com/notify",
        returnUrl: "https://myshop.com/return",
    });
    app.use("/api/payment", router);

    // 3. Setup a custom route using the middleware directly (for manual integration testing)
    app.post(
        "/custom/notify",
        express.urlencoded({ extended: true }),
        paymentNotifyMiddleware({
            merchantId: TEST_CONFIG.merchantId,
            hashKey: TEST_CONFIG.hashKey,
            hashIV: TEST_CONFIG.hashIV,
        }),
        (req, res) => {
            const notify = req.newebpayNotify;
            if (!notify || !notify.isVerified()) {
                return res.status(400).send("Bad Signature");
            }
            res.json(notify.getData());
        }
    );

    describe("Payment Creation Flow", () => {
        it("should generate valid payment form parameters", async () => {
            const response = await request(app)
                .post("/api/payment/payment/create") // Router mounted at /api/payment, internal route is /payment/create. So /api/payment/payment/create
                .send({
                    orderId: "E2E-ORDER-001",
                    amount: 2000,
                    itemDesc: "E2E Test Item",
                    email: "e2e@example.com",
                    paymentType: "credit"
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);

            const fields = response.body.data.fields;
            expect(fields.MerchantID).toBe(TEST_CONFIG.merchantId);
            expect(fields.TradeInfo).toBeDefined();
            expect(fields.TradeSha).toBeDefined();
            expect(fields.Version).toBe("2.0");
        });
    });

    describe("Callback Notification Flow (Webhook)", () => {
        it("should verify and process a valid notification via Router", async () => {
            const payload = createMockCallbackPayload(MOCK_PAYMENT_DATA);

            const response = await request(app)
                .post("/api/payment/payment/notify")
                .type("form")
                .send(payload);

            expect(response.status).toBe(200);
            expect(response.text).toBe("OK");
        });

        it("should reject invalid signatures via Router", async () => {
            const payload = createMockCallbackPayload(MOCK_PAYMENT_DATA);
            payload.TradeSha = "BAD_HASH";

            const response = await request(app)
                .post("/api/payment/payment/notify")
                .type("form")
                .send(payload);

            expect(response.status).toBe(400);
        });
    });

    describe("Middleware Direct Usage", () => {
        it("should decrypt and verify payload via standalone middleware", async () => {
            const payload = createMockCallbackPayload(MOCK_PAYMENT_DATA);

            const response = await request(app)
                .post("/custom/notify")
                .type("form")
                .send(payload);

            expect(response.status).toBe(200);

            // Verification: The response should contain the decrypted info
            expect(response.body.MerchantID).toBe(TEST_CONFIG.merchantId);
            expect(response.body.Amt).toBe("100"); // Decrypted values are usually strings from QueryString parsing
            expect(response.body.Status).toBe("SUCCESS");
        });
    });
});
