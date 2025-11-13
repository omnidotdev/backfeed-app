import { beforeEach, describe, expect, it } from "bun:test";

import dayjs from "dayjs";

import { DashboardPage } from "components/dashboard";
import { app } from "lib/config";
import { render } from "test/unit/util";

// Not sure if this is the best way to do this, but it works after stumbling across this file.
const oneWeekAgo = dayjs().utc().subtract(6, "days").startOf("day").toDate();

describe("dashboard page", () => {
  beforeEach(() => {
    // TODO: add tests for different tier level renders (i.e. disabled create org button, etc)
    render(
      <DashboardPage
        // TODO: mock user
        user={{}}
        canCreateOrganizations
        isSubscribed
        oneWeekAgo={oneWeekAgo}
      />,
    );
  });

  // TODO enable below, blocked by MSW integration (see test setup file for corresponding TODO) which is further blocked by https://github.com/oven-sh/bun/issues/13072
  it.skip("renders correctly", () => {
    const welcomeText = document.querySelector("h1");
    expect(welcomeText).toHaveTextContent(app.dashboardPage.welcomeMessage);
  });
});
