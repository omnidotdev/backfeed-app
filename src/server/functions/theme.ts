import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { z } from "zod";

const postThemeValidator = z.union([z.literal("light"), z.literal("dark")]);
const storageKey = "_preferred-theme";

export type Theme = z.infer<typeof postThemeValidator>;

export const getTheme = createServerFn().handler(
  async () => (getCookie(storageKey) || "light") as Theme,
);

export const setTheme = createServerFn({ method: "POST" })
  .inputValidator(postThemeValidator)
  .handler(async ({ data }) => setCookie(storageKey, data));
