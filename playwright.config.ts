import { loadEnvConfig } from "@next/env";
import { defineConfig } from "@playwright/test";
import ms from "ms";

// import type {
// PlaywrightTestOptions,
// PlaywrightWorkerOptions,
// Project,
// } from "@playwright/test";

// TODO use Bun runtime instead of Node.js (pending https://github.com/oven-sh/bun/issues/8222). After this is resolved, consider using Playwright for running all tests including unit tests (see https://pkerschbaum.com/blog/using-playwright-to-run-unit-tests)

// type PlaywrightDevices = Project<
//   PlaywrightTestOptions,
//   PlaywrightWorkerOptions
// >;

// load environment variables (see https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#loading-environment-variables-with-nextenv)
loadEnvConfig(process.cwd());

/**
 * Desktop devices/viewports.
 */
// TODO enable desktop viewports (https://linear.app/omnidev/issue/OMNI-156/enable-more-playwright-devices)
// const desktopDevices: PlaywrightDevices[] = [
//   {
//     name: "🖥️  Chromium",
//     use: {
//       ...devices["Desktop Chrome"],
//     },
//   },
//   {
//     name: "🖥️  Firefox",
//     use: {
//       ...devices["Desktop Firefox"],
//     },
//   },

//   {
//     name: "🖥️  Safari (Webkit)",
//     use: {
//       ...devices["Desktop Safari"],
//     },
//   },
//   {
//     name: "🖥️  Microsoft Edge",
//     use: {
//       channel: "msedge",
//     },
//   },
// ];

/**
 * Mobile devices/viewports.
 */
// TODO enable mobile viewports (https://linear.app/omnidev/issue/OMNI-156/enable-more-playwright-devices)
// const mobileDevices: PlaywrightDevices[] = [
//   {
//     name: "📱  Chrome",
//     use: {
//       ...devices["Pixel 5"],
//     },
//   },
//   {
//     name: "📱  Safari",
//     use: devices["iPhone 12"],
//   },
// ];

/**
 * Playwright configuration.
 * @see https://playwright.dev/docs/test-configuration
 */
const playwrightConfig = defineConfig({
  testDir: "src/__tests__/e2e",
  // maximum single-test timeout
  timeout: ms("3m"),
  expect: {
    timeout: ms("5s"),
  },
  // run tests within the same file in parallel
  fullyParallel: true,
  // TODO enable more devices than default (https://linear.app/omnidev/issue/OMNI-156/enable-more-playwright-devices)
  // projects: [...desktopDevices, ...mobileDevices],
  // test output reporter
  reporter: process.env.CI
    ? // blob is used in CI to merge sharded test results (https://playwright.dev/docs/test-reporters#blob-reporter)
      "blob"
    : [["html", { outputFolder: "src/test/generated/report" }]],
  // fail build in CI if `test.only` is left in source code
  forbidOnly: !!process.env.CI,
  // number of retry attempts on test failure
  retries: process.env.CI ? 2 : undefined,
  // use single worker to mitigate flakiness from parallel tests. Note that this effectively disables parallelization across test files. See https://playwright.dev/docs/test-parallel#worker-processes
  workers: 1,
  // artifact output location (screenshots, videos, traces)
  outputDir: "src/generated/test-artifacts",
  // run dev server before starting the tests
  webServer: {
    // NB: no need to run GraphQL code generation, so just the Next.js server is started here
    command: "bun dev:next",
    port: (process.env.PORT as unknown as number) || 3000,
    timeout: ms("2m"),
    // do not use an existing server on CI
    reuseExistingServer: !process.env.CI,
  },
  use: {
    headless: true,
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "https://localhost:3000",
    // retry a test with tracing if it is failing (allows analysis of DOM, console logs, network traffic, etc.)
    trace: "retry-with-trace",
  },
});

export default playwrightConfig;
