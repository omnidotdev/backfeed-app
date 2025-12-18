import { render as rtlRender } from "@testing-library/react";
import { QueryProvider, SearchParamsProvider, ThemeProvider } from "providers";

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
      // NB: other application providers may need to wrap the testing tree here depending on fixture requirements.
      <ThemeProvider>
        <SearchParamsProvider>
          <QueryProvider>{children}</QueryProvider>
        </SearchParamsProvider>
      </ThemeProvider>
    ),
    ...options,
  });

export default render;
