import { Button } from "@omnidotdev/thornberry/button";
import { PiMoonFill as Moon, PiSunFill as Sun } from "react-icons/pi";

import { useTheme } from "@/providers/ThemeProvider";

/**
 * Toggle application color mode.
 */
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () =>
    theme === "dark" ? setTheme("light") : setTheme("dark");

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
