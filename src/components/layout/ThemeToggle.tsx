import { useHotkeys } from "react-hotkeys-hook";
import { PiMoonFill as Moon, PiSunFill as Sun } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";

/**
 * Toggle application color mode.
 */
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () =>
    theme === "dark" ? setTheme("light") : setTheme("dark");

  useHotkeys("t", toggleTheme, [toggleTheme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      <Sun className="hidden dark:block" />

      <Moon className="block dark:hidden" />
    </Button>
  );
};

export default ThemeToggle;
