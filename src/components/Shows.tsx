"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import { SHOWS, CMYK } from "@/lib/constants";

const COLOR_MAP = { C: CMYK.C, M: CMYK.M, Y: CMYK.Y, K: CMYK.K };

export default function Shows() {
  const t = useTranslations("shows");

  return (
    <section id="shows" className="py-28 md:py-36">
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionHeader number={t("number")} title={t("title")} />

        <div className="flex flex-col">
          {SHOWS.map(({ month, day, venue, city, tag, color, past }, i) => {
            const c = COLOR_MAP[color];
            return (
              <motion.div
                key={`${month}-${day}`}
                className={`grid items-center gap-8 py-6 border-b border-neutral-200 first:border-t ${past ? "opacity-40" : "group cursor-pointer"}`}
                style={{ gridTemplateColumns: "72px 1fr auto auto" }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: past ? 0.4 : 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={!past ? { x: 4 } : {}}
              >
                <div className="flex flex-col items-center">
                  <span style={{ fontFamily: "var(--font-code)", color: c }} className="text-[10px] tracking-[0.2em]">{month}</span>
                  <span style={{ fontFamily: "var(--font-heading)" }} className="text-[42px] leading-none text-[#1A1A1A]">{day}</span>
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--font-heading)" }} className="text-[22px] tracking-[0.05em] mb-1">{venue}</h4>
                  <p style={{ fontFamily: "var(--font-code)" }} className="text-[10px] tracking-[0.15em] text-neutral-400">{city}</p>
                </div>
                <span
                  style={{ fontFamily: "var(--font-code)", borderColor: past ? "#9E9E9E" : c, color: past ? "#9E9E9E" : c }}
                  className="hidden sm:inline text-[9px] tracking-[0.15em] border px-2.5 py-1"
                >
                  {tag}
                </span>
                {past ? (
                  <span style={{ fontFamily: "var(--font-code)" }} className="text-[10px] tracking-[0.2em] px-5 py-2.5 border border-neutral-200 text-neutral-300 text-center">{t("soldOut")}</span>
                ) : (
                  <motion.a href="#" style={{ fontFamily: "var(--font-code)", background: c }} className="text-[10px] tracking-[0.2em] px-5 py-2.5 text-white whitespace-nowrap" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    {t("tickets")}
                  </motion.a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
