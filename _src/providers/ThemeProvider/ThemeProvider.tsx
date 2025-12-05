import { ThemeProvider as NextThemesProvider } from "next-themes";

import type { PropsWithChildren } from "react";

/**
 * Application theme provider.
 */
const ThemeProvider = ({ children }: PropsWithChildren) => (
  <NextThemesProvider
    defaultTheme="system"
    attribute="class"
    // NB: See https://github.com/pacocoursey/next-themes?tab=readme-ov-file#disable-transitions-on-theme-change
    disableTransitionOnChange
  >
    {children}
  </NextThemesProvider>
);

export default ThemeProvider;
