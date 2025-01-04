import { render as rtlRender } from "@testing-library/react";

import {
  BlockchainProvider,
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
      // TODO enable `AuthProvider` when API routes are mocked (currently throws fetch errors)
      // NB: other application providers may need to wrap the testing tree here depending on fixture requirements.
      // <AuthProvider>
      <ThemeProvider>
        <SearchParamsProvider>
          <QueryProvider>
            <BlockchainProvider>{children}</BlockchainProvider>
          </QueryProvider>
        </SearchParamsProvider>
      </ThemeProvider>
      // </AuthProvider>
    ),
    ...options,
  });

export default render;
