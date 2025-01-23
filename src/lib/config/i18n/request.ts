import { getRequestConfig } from "next-intl/server";
import { routing } from "lib/config/i18n/routing";

function isValidLocale(locale: string): locale is "en-US" | "en-ES" {
  return routing.locales.includes(locale as "en-US" | "en-ES");
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !isValidLocale(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
