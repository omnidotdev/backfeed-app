import { expect } from "@playwright/test";

import { test } from "test/e2e/util";

if (!process.env.TEST_USERNAME || !process.env.TEST_PASSWORD)
  throw new Error("TEST_USERNAME and TEST_PASSWORD must be set");

test.describe("authentication", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test("authenticates user (sign in)", async ({ page }) => {
    page.locator("text=Sign In").click();

    await page.waitForURL("https://hidra.omni.dev/**");

    await page.locator("#username").fill(process.env.TEST_USERNAME!);
    await page.locator("#password").fill(process.env.TEST_PASSWORD!);
    await page.getByRole("button", { name: "Sign In" }).click();

    expect(page.url()).toBe("http://localhost:3000/");
  });
});

// TODO remove all below, just used to test CI
test("fail normal test demo", async ({ page }) => {});
test.fail("fail test demo", async ({ page }) => {});
test.skip("skip test demo", async ({ page }) => {});
test.fixme("fix test demo", async ({ page }) => {});
