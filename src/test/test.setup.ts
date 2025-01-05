/**
 * @file Test setup configuration. Anything included in here is injected into tests.
 */

import { GlobalRegistrator } from "@happy-dom/global-registrator";
import * as rtlDomMatchers from "@testing-library/jest-dom/matchers";
import { expect } from "bun:test";

import "__mocks__/nextRouter.mock";

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
