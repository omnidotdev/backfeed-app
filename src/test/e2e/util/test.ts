import { test as testBase } from "@playwright/test";

import { createHomePageObject } from "test/e2e/fixtures/pages";

import type { HomePageObject } from "test/e2e/fixtures/pages";

interface PageObjects {
  homePage: HomePageObject;
}

/**
 * Augmented version of Playwright's `test` function that provides, for example, [page objects](https://martinfowler.com/bliki/PageObject.html) as fixtures.
 *
 * @see https://playwright.dev/docs/test-fixtures
 */
const test = testBase.extend<PageObjects>({
  homePage: async ({ page, context }, use) =>
    use(createHomePageObject({ page, context })),
});

export default test;
