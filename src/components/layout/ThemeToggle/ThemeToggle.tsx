"use client";

import { sigil, useLocalStorage } from "@omnidev/sigil";
import { Expand } from "@theme-toggles/react";
import { useEffect } from "react";
import { useIsClient } from "usehooks-ts";

import app from "lib/config/app.config";

import "@theme-toggles/react/css/Expand.css";

type ColorMode = "light" | "dark";

export const colorModeLocalStorageKey = `${app.name}-color-mode`;

const PandaExpand = sigil(Expand);

/**
 * Toggle application color mode.
 */
const ThemeToggle = () => {
  const [colorMode, setColorMode] = useLocalStorage<ColorMode>(
    colorModeLocalStorageKey,
    "light"
  );

  const isClient = useIsClient();

  const syncColorMode = () =>
    colorMode === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");

  useEffect(syncColorMode, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: sync color mode on color mode change
  useEffect(syncColorMode, [colorMode]);

  const updateTheme = () =>
    setColorMode(colorMode === "light" ? "dark" : "light");

  if (!isClient) return null;

  return (
    // @ts-ignore ignore missing props
    <PandaExpand
      onToggle={updateTheme}
      toggled={colorMode === "light"}
      css={{
        "& svg": {
          w: 6,
          h: 6,
        },
      }}
    />
  );
};

export default ThemeToggle;
