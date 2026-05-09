import type { Metadata } from "next";
import { Bebas_Neue, Space_Mono, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import ScrollRestorer from "@/components/ScrollRestorer";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const space = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parallel Offset — Djent",
  description:
    "Parallel Offset — a Djent band born at the intersection of polyrhythm and print. CMYK in sound and ink.",
  openGraph: {
    title: "Parallel Offset",
    description: "Djent · Polyrhythm · Print",
    type: "website",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../messages/${locale}.json`)).default;

  const langMap: Record<string, string> = {
    zh: "zh-CN", en: "en", fr: "fr", de: "de",
    it: "it", es: "es", ru: "ru", ar: "ar",
  };

  return (
    <html
      lang={langMap[locale] ?? "en"}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${bebas.variable} ${space.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-white text-[#1A1A1A]">
        <NextIntlClientProvider messages={messages}>
          <ScrollRestorer />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
