import { describe, it, expect } from "vitest";
import * as Main from "../../src/index.js";
import * as ExpressFramework from "../../src/frameworks/express/index.js";
import * as CommonFramework from "../../src/frameworks/common/index.js";

describe("Package Exports Contract", () => {
    describe("Main Entry Point (.)", () => {
        it("should export core error classes", () => {
            expect(Main).toHaveProperty("NewebPayError");
        });

        // Check if other core components are exported
        // Based on src/index.ts content (I saw it earlier, briefly)
    });

    describe("Express Entry Point (./express)", () => {
        it("should export createNewebPayRouter", () => {
            expect(ExpressFramework).toHaveProperty("createNewebPayRouter");
            expect(typeof ExpressFramework.createNewebPayRouter).toBe("function");
        });

        it("should export middleware factories", () => {
            expect(ExpressFramework).toHaveProperty("paymentNotifyMiddleware");
            expect(ExpressFramework).toHaveProperty("atmNotifyMiddleware");
            expect(ExpressFramework).toHaveProperty("cvsNotifyMiddleware");
            expect(ExpressFramework).toHaveProperty("cvscomNotifyMiddleware");
        });
    });

    describe("Common Entry Point (./common)", () => {
        it("should export NewebPayService", () => {
            expect(CommonFramework).toHaveProperty("NewebPayService");
        });

        // Check Config types or similar if exported (runtime check only works for values, not types)
    });
});
