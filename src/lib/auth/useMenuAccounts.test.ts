import { describe, expect, test } from "bun:test";

import { toMenuAccounts } from "./useMenuAccounts";

describe("toMenuAccounts", () => {
  test("keys each account by its handle", () => {
    expect(
      toMenuAccounts([
        {
          handle: "h1",
          name: "Ada",
          email: "ada@example.com",
          image: null,
        },
      ]),
    ).toEqual([
      { id: "h1", name: "Ada", email: "ada@example.com", image: null },
    ]);
  });

  test("is empty without remembered accounts", () => {
    expect(toMenuAccounts([])).toEqual([]);
  });
});
