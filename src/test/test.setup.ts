/**
 * @file Test setup configuration. Anything included in here is injected into tests.
 */

import { expect } from "bun:test";

import { GlobalRegistrator } from "@happy-dom/global-registrator";
import * as rtlDomMatchers from "@testing-library/jest-dom/matchers";
import { setupServer } from "msw/node";

import { mockOidcDiscovery, mockOidcJwks } from "@/__mocks__/handlers/auth";
import "@/__mocks__/payments.mock";

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

/**
 * Serve mocked OIDC endpoints so Better Auth's `genericOAuth` discovery (eager
 * since 1.7) resolves without reaching the network when the auth module is
 * transitively imported by a test. Unmatched requests pass through untouched.
 */
const authServer = setupServer(mockOidcDiscovery, mockOidcJwks);

authServer.listen({ onUnhandledRequest: "bypass" });

// TODO enable full network mocking below, blocked by https://github.com/oven-sh/bun/issues/13072. Good reference for MSW integration: https://kentcdodds.com/blog/stop-mocking-fetch
// beforeAll(() => mswNodeServer.listen());
// reset handlers after each test (particularly useful if a handler is added in a specific test)
// afterEach(() => mswNodeServer.resetHandlers());
// afterAll(() => mswNodeServer.close());
