import { expect } from "@playwright/test";

import { mswNodeServer, test } from "test/e2e/util";

if (!process.env.TEST_USERNAME || !process.env.TEST_PASSWORD)
  throw new Error("TEST_USERNAME and TEST_PASSWORD must be set");

/**
 * MSW currently does not fully support the Next.js app router (both in browser and server-side contexts), so this test suite is currently skipped. After https://github.com/mswjs/examples/pull/101 is completed, the tests can be enabled with that as a reference. (https://linear.app/omnidev/issue/OMNI-162/enable-e2e-tests-skipped-due-to-msw-app-router-integration-pending)
 */
test.describe
  .skip("authentication", () => {
    // `.listen()` is already called in `src/app/layout.tsx`, just used here for breadcrumbs when tests are enabled again (see note about app router above)
    // test.beforeAll(() => mswNodeServer.listen());
    test.afterEach(() => mswNodeServer.resetHandlers());
    test.afterAll(() => mswNodeServer.close());

    test.beforeEach(async ({ homePage }) => {
      await homePage.goto();
    });

    test("authenticates user (sign in)", async ({ page }) => {
      page.locator("text=Sign In").click();

      await page.waitForURL("https://identity.omni.dev/**");

      await page.locator("#username").fill(process.env.TEST_USERNAME!);
      await page.locator("#password").fill(process.env.TEST_PASSWORD!);
      await page.getByRole("button", { name: "Sign In" }).click();

      expect(page.url()).toBe("https://localhost:3000/");

      // TODO extend test (resolve `JWTSessionError` which might be due to corrupt cookie management in test environment/possible with https://playwright.dev/docs/api/class-browsercontext#browser-context-cookies), test logout, etc. The test is decent for now; it tests that the user can login via IDP and navigates back to the app home page successfully
    });
  });
