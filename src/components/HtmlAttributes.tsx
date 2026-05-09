"use client";

import { useEffect } from "react";

const LANG_MAP: Record<string, string> = {
  zh: "zh-CN", en: "en", fr: "fr", de: "de",
  it: "it", es: "es", ru: "ru", ar: "ar",
};

export default function HtmlAttributes({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = LANG_MAP[locale] ?? "en";
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);
  return null;
}
