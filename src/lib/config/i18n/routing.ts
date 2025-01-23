import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en-US", "en-ES"] as const,
  defaultLocale: "en-US",
  localePrefix: {
    mode: "always",
    prefixes: {
      "en-US": "/en",
      "en-ES": "/es",
    },
  },
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
