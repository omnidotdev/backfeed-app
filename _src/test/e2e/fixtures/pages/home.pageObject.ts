import { createPageObject } from "test/e2e/util";

import type { PageObjectContext } from "test/e2e/util";

/**
 * Home page object.
 */
const createHomePageObject = ({ page, context }: PageObjectContext) =>
  createPageObject({
    page,
    context,
    name: "Home",
    baseUrl: "/",
  });

export type HomePageObject = ReturnType<typeof createHomePageObject>;

export default createHomePageObject;
