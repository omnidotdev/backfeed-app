import { mock } from "bun:test";

await mock.module("stripe", () => ({
  default: class MockStripe {
    constructor(apiKey: string) {
      // You can ignore apiKey or log it for debugging
    }

    // can add methods here
    customers = {
      create: async () => ({ id: "cus_mocked" }),
    };
  },
}));
