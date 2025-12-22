import createPageObject from "@/test/e2e/util/createPageObject";

import type { PageObjectContext } from "@/test/e2e/util/createPageObject";

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
