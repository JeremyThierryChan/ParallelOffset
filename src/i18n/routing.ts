import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["zh", "en", "fr", "de", "it", "es", "ru", "ar"],
  defaultLocale: "zh",
});
