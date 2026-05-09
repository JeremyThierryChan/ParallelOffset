import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ScrollRestorer from "@/components/ScrollRestorer";
import HtmlAttributes from "@/components/HtmlAttributes";

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

  return (
    <NextIntlClientProvider messages={messages}>
      <HtmlAttributes locale={locale} />
      <ScrollRestorer />
      {children}
    </NextIntlClientProvider>
  );
}
