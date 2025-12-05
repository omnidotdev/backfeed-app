/**
 * @file Test setup configuration. Anything included in here is injected into tests.
 */

import { expect } from "bun:test";

import { GlobalRegistrator } from "@happy-dom/global-registrator";
import * as rtlDomMatchers from "@testing-library/jest-dom/matchers";

import "__mocks__/nextImage.mock";
import "__mocks__/nextRouter.mock";
import "__mocks__/payments.mock";

// import { mswNodeServer } from "test/e2e/util";

import type { ExpectExtendMatchers } from "bun:test";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "bun:test" {
  // augment Bun `expect` with RTL DOM matchers
  interface Matchers<T> extends TestingLibraryMatchers<typeof expect, T> {}
}

// extend `expect` with RTL DOM matchers
expect.extend(rtlDomMatchers as unknown as ExpectExtendMatchers<typeof expect>);

/**
 * Inject mocked browser APIs into the global scope.
 * @see https://bun.sh/guides/test/happy-dom
 */
GlobalRegistrator.register();

// TODO enable below, blocked by https://github.com/oven-sh/bun/issues/13072. Good reference for MSW integration: https://kentcdodds.com/blog/stop-mocking-fetch
// beforeAll(() => mswNodeServer.listen());
// reset handlers after each test (particularly useful if a handler is added in a specific test)
// afterEach(() => mswNodeServer.resetHandlers());
// afterAll(() => mswNodeServer.close());
