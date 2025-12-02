import { mock } from "bun:test";

await mock.module("stripe", () => ({
  default: class MockStripe {
    constructor(_apiKey: string) {}

    customers = {
      create: async () => ({ id: "cus_mocked" }),
    };
  },
}));
