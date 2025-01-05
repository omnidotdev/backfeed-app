import { render as rtlRender } from "@testing-library/react";

import {
  // AuthProvider,
  // BlockchainProvider,
  QueryProvider,
  SearchParamsProvider,
  ThemeProvider,
} from "providers";

import type { RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";

/**
 * Custom render function (composes RTL's `render` function).
 * @param ui RTL component render tree.
 * @param options RTL options.
 * @returns custom render function.
 */
const render = (ui: ReactElement, options?: RenderOptions) =>
  rtlRender(ui, {
    wrapper: ({ children }) => (
      // TODO enable `AuthProvider` when API routes are mocked (currently throws fetch errors). Also enable `BlockchainProvider` when WalletConnect requests are mocked. Both of these can be handled by MSW integration with the Bun test runner, however this is blocked by TODO enable below, blocked by https://github.com/oven-sh/bun/issues/13072 (see test setup file for corresponding TODO)
      // NB: other application providers may need to wrap the testing tree here depending on fixture requirements.
      // <AuthProvider>
      <ThemeProvider>
        <SearchParamsProvider>
          <QueryProvider>
            {/* <BlockchainProvider> */}
            {children}
            {/* </BlockchainProvider> */}
          </QueryProvider>
        </SearchParamsProvider>
      </ThemeProvider>
      // </AuthProvider>
    ),
    ...options,
  });

export default render;
