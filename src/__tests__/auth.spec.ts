import { test, expect } from "@playwright/test";

if (!process.env.TEST_USERNAME || !process.env.TEST_PASSWORD)
  throw new Error("TEST_USERNAME and TEST_PASSWORD must be set");

test("authenticates user (sign in)", async ({ page }) => {
  await page.goto("/");

  page.locator("text=Sign In").click();

  await page.waitForURL("https://hidra.omni.dev/**");

  await page.locator("#username").fill(process.env.TEST_USERNAME!);
  await page.locator("#password").fill(process.env.TEST_PASSWORD!);
  await page.getByRole("button", { name: "Sign In" }).click();

  expect(page.url()).toBe("http://localhost:3000/");
});
