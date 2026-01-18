import { useRouter } from "@tanstack/react-router";
import { createContext, use, useState } from "react";

import { setTheme as setThemeServerFn } from "@/server/functions/theme";

import type { PropsWithChildren } from "react";
import type { Theme } from "@/server/functions/theme";

interface ThemeContext {
  theme: Theme;
  setTheme: (val: Theme) => void;
}

const ThemeContext = createContext<ThemeContext | null>(null);

/**
 * Global theme provider.
 */
const ThemeProvider = ({
  children,
  theme: initialTheme,
}: PropsWithChildren<{ theme: Theme }>) => {
  const router = useRouter();
  const [theme, setThemeState] = useState(initialTheme);

  const setTheme = (val: Theme) => {
    // Immediately update local state and DOM for instant feedback
    setThemeState(val);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(val);

    // Persist to server in background
    setThemeServerFn({ data: val }).then(() => router.invalidate());
  };

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
};

export const useTheme = () => {
  const val = use(ThemeContext);

  if (!val) throw new Error("`useTheme` called outside of `<ThemeProvider />`");

  return val;
};

export default ThemeProvider;
