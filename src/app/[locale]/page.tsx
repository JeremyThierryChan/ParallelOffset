import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Nav     from "@/components/Nav";
import Hero    from "@/components/Hero";
import About   from "@/components/About";
import Music   from "@/components/Music";
import Shows   from "@/components/Shows";
import Print   from "@/components/Print";
import Contact from "@/components/Contact";
import Footer  from "@/components/Footer";
import CmykCursor from "@/components/CmykCursor";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <CmykCursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Music />
        <Shows />
        <Print />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
