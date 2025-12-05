import { Button, Icon } from "@omnidev/sigil";
import { useHotkeys } from "react-hotkeys-hook";
import { PiMoonFill as Moon, PiSunFill as Sun } from "react-icons/pi";

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
      variant="icon"
      aria-label="Toggle theme"
      bgColor="transparent"
      color="foreground.default"
      onClick={toggleTheme}
    >
      <Icon src={Sun} _light={{ display: "none" }} />

      <Icon src={Moon} _dark={{ display: "none" }} />
    </Button>
  );
};

export default ThemeToggle;
