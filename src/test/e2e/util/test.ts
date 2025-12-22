import { test as testBase } from "@playwright/test";

import createHomePageObject from "@/test/e2e/fixtures/pages/home.pageObject";

import type { HomePageObject } from "@/test/e2e/fixtures/pages/home.pageObject";

interface PageObjects {
  homePage: HomePageObject;
}

/**
 * Augmented version of Playwright's `test` function that provides, for example, [page objects](https://martinfowler.com/bliki/PageObject.html) as fixtures. Mock Service Worker (MSW) is also included.
 *
 * @see https://playwright.dev/docs/test-fixtures
 */
// TODO extend with request interceptors to allow per-test mocking of network requests (see https://github.com/mswjs/examples/pull/101/files#r1823792691) (https://linear.app/omnidev/issue/OMNI-161/inject-request-interceptor-for-per-test-network-request-handling)
const test = testBase.extend<PageObjects>({
  homePage: async ({ page, context }, use) =>
    use(createHomePageObject({ page, context })),
});

export default test;
