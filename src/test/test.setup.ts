/**
 * @file Test setup configuration.
 */

import { GlobalRegistrator } from "@happy-dom/global-registrator";

/**
 * Inject mocked browser APIs into the global scope.
 * @see https://bun.sh/guides/test/happy-dom
 */
GlobalRegistrator.register();
