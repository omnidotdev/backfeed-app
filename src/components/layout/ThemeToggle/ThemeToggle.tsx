"use client";

import { sigil } from "@omnidev/sigil";
import { Expand } from "@theme-toggles/react";
import { useTheme } from "next-themes";
import { useHotkeys } from "react-hotkeys-hook";
import { useIsClient } from "usehooks-ts";

import "@theme-toggles/react/css/Expand.css";

const PandaExpand = sigil(Expand);

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
    // @ts-ignore ignore missing props
    <PandaExpand
      onToggle={toggleTheme}
      toggled={resolvedTheme === "light"}
      css={{
        p: 2.5,
        "& svg": {
          w: 5,
          h: 5,
        },
      }}
    />
  );
};

export default ThemeToggle;
