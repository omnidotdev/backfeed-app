"use client";

import { Button, Icon } from "@omnidev/sigil";
import { useTheme } from "next-themes";
import { useHotkeys } from "react-hotkeys-hook";
import { PiMoonFill as Moon, PiSunFill as Sun } from "react-icons/pi";
import { useIsClient } from "usehooks-ts";

/**
 * Toggle application color mode.
 */
const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme(),
    isClient = useIsClient();

  const toggleTheme = () =>
    resolvedTheme === "dark" ? setTheme("light") : setTheme("dark");

  useHotkeys(
    "t",
    toggleTheme,
    {
      enabled: isClient,
    },
    [isClient, toggleTheme],
  );

  if (!isClient) return null;

  return (
    <Button
      variant="ghost"
      aria-label="Toggle theme"
      bgColor="transparent"
      onClick={toggleTheme}
    >
      {<Icon src={Sun} _light={{ display: "none" }} />}
      {<Icon src={Moon} _dark={{ display: "none" }} />}
    </Button>
  );
};

export default ThemeToggle;
