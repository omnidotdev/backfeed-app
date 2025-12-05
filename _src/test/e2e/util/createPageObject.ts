import type { BrowserContext, Page } from "@playwright/test";

export interface PageObjectContext {
  /** Page object's page utility. */
  page: Page;
  /** Page object's context utility. */
  context: BrowserContext;
}

interface Params<D extends object> extends PageObjectContext {
  /** Name of page object. */
  name: string;
  /** URL to navigate to. */
  baseUrl: string;
  /** Additional, per-context data. */
  metadata?: D;
}

interface PageObject<D extends object> extends Params<D> {
  /** Navigate to page object's base URL. */
  goto: () => Promise<void>;
}

/**
 * Create a page object based on the [Page Object Model (POM) Pattern](https://martinfowler.com/bliki/PageObject.html).
 *
 * @see https://playwright.dev/docs/pom
 */
const createPageObject = <D extends object>({
  name,
  page,
  context,
  baseUrl,
  ...rest
}: Params<D>): PageObject<D> => ({
  name,
  page,
  context,
  baseUrl,
  goto: async () => {
    await page.goto(baseUrl);
  },
  ...rest,
});

export default createPageObject;
