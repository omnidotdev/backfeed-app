import { beforeEach, describe, expect, it } from "bun:test";

import { DashboardPage } from "components/dashboard";
import { app } from "lib/config";
import { render } from "test/unit/util";

describe("dashboard page", () => {
  beforeEach(() => {
    render(<DashboardPage />);
  });

  // TODO enable below, blocked by MSW integration (see test setup file for corresponding TODO) which is further blocked by https://github.com/oven-sh/bun/issues/13072
  it.skip("renders correctly", () => {
    const welcomeText = document.querySelector("h1");
    expect(welcomeText).toHaveTextContent(app.dashboardPage.welcomeMessage);
  });
});
