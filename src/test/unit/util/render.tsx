import { render as rtlRender } from "@testing-library/react";

import { ThemeProvider } from "providers";

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
    // NB: other application providers may need to wrap the testing tree here depending on coverage.
    wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    ...options,
  });

export default render;
