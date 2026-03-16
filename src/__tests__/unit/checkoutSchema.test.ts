import { describe, expect, it } from "bun:test";

import { z } from "zod";

// Mirror the checkout schema from subscriptions.ts to test validation
const checkoutWithWorkspaceSchema = z
  .object({
    priceId: z.string().startsWith("price_"),
    successUrl: z.string().url(),
    cancelUrl: z.string().url(),
    workspaceId: z.string().uuid().optional(),
    createWorkspace: z
      .object({
        name: z.string().min(1).max(100),
        slug: z.string().min(1).max(100).optional(),
      })
      .optional(),
    quantity: z.number().int().positive().optional(),
  })
  .refine((data) => data.workspaceId || data.createWorkspace, {
    message: "Either workspaceId or createWorkspace is required",
  });

describe("checkout with workspace schema", () => {
  const validBase = {
    priceId: "price_abc123",
    successUrl: "https://backfeed.omni.dev/workspaces/__SLUG__/settings",
    cancelUrl: "https://backfeed.omni.dev/pricing",
    workspaceId: "550e8400-e29b-41d4-a716-446655440000",
  };

  describe("quantity", () => {
    it("accepts request without quantity", () => {
      const result = checkoutWithWorkspaceSchema.safeParse(validBase);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.quantity).toBeUndefined();
      }
    });

    it("accepts quantity of 1", () => {
      const result = checkoutWithWorkspaceSchema.safeParse({
        ...validBase,
        quantity: 1,
      });
      expect(result.success).toBe(true);
    });

    it("accepts quantity greater than 1 for per-seat pricing", () => {
      const result = checkoutWithWorkspaceSchema.safeParse({
        ...validBase,
        quantity: 10,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.quantity).toBe(10);
      }
    });

    it("rejects quantity of 0", () => {
      const result = checkoutWithWorkspaceSchema.safeParse({
        ...validBase,
        quantity: 0,
      });
      expect(result.success).toBe(false);
    });

    it("rejects negative quantity", () => {
      const result = checkoutWithWorkspaceSchema.safeParse({
        ...validBase,
        quantity: -1,
      });
      expect(result.success).toBe(false);
    });

    it("rejects non-integer quantity", () => {
      const result = checkoutWithWorkspaceSchema.safeParse({
        ...validBase,
        quantity: 2.5,
      });
      expect(result.success).toBe(false);
    });
  });

  describe("workspace requirement", () => {
    it("requires either workspaceId or createWorkspace", () => {
      const { workspaceId, ...noWorkspace } = validBase;
      const result = checkoutWithWorkspaceSchema.safeParse(noWorkspace);
      expect(result.success).toBe(false);
    });

    it("accepts createWorkspace instead of workspaceId", () => {
      const { workspaceId, ...base } = validBase;
      const result = checkoutWithWorkspaceSchema.safeParse({
        ...base,
        createWorkspace: { name: "My Workspace" },
      });
      expect(result.success).toBe(true);
    });
  });
});
