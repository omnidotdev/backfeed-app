import { beforeEach, describe, expect, it } from "bun:test";

import { LandingPage } from "components/landing";
import { app } from "lib/config";
import { render } from "test/unit/util";

describe("landing page", () => {
  beforeEach(() => {
    render(<LandingPage />);
  });

  it("renders correctly", () => {
    const heroText = document.querySelector("h1");
    expect(heroText).toHaveTextContent(app.landingPage.hero.title);
  });
});
