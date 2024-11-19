import { ThemeProvider as NextThemesProvider } from "next-themes";

import type { PropsWithChildren } from "react";

/**
 * Application theme provider.
 */
const ThemeProvider = ({ children }: PropsWithChildren) => (
  <NextThemesProvider defaultTheme="system" attribute="class">
    {children}
  </NextThemesProvider>
);

export default ThemeProvider;
