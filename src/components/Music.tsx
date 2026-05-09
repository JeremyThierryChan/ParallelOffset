"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import { RELEASES, SINGLES, CMYK } from "@/lib/constants";

const COLOR_MAP = { C: CMYK.C, M: CMYK.M, Y: CMYK.Y, K: CMYK.K };

function ArtworkDisplay() {
  return (
    <div className="aspect-square relative overflow-hidden bg-[#0a0a0a] flex items-end">
      {[
        { c: CMYK.C, pos: "30% 30%" },
        { c: CMYK.M, pos: "70% 30%" },
        { c: CMYK.Y, pos: "50% 70%" },
      ].map(({ c, pos }, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{ background: `radial-gradient(circle at ${pos}, ${c}, transparent 70%)`, mixBlendMode: "screen" }}
          animate={{ opacity: [0, 0.9, 0] }}
          transition={{ duration: 6, delay: i * 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`, backgroundSize: "12px 12px" }} />
      <div className="relative z-10 p-5">
        <span style={{ fontFamily: "var(--font-code)" }} className="block text-[15px] tracking-[0.15em] text-white">{RELEASES[0].title}</span>
        <span style={{ fontFamily: "var(--font-code)" }} className="text-[10px] tracking-[0.2em] text-neutral-400">{RELEASES[0].type} · {RELEASES[0].year}</span>
      </div>
    </div>
  );
}

export default function Music() {
  const t = useTranslations("music");
  const release = RELEASES[0];

  return (
    <section id="music" className="py-28 md:py-36 bg-[#1A1A1A]">
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionHeader number={t("number")} title={t("title")} dark />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <motion.div className="border border-neutral-800 overflow-hidden" initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-80px" }} transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <ArtworkDisplay />
              <div className="p-7 flex flex-col gap-5 bg-[#111]">
                <div>
                  <h3 style={{ fontFamily:"var(--font-heading)" }} className="text-[28px] tracking-[0.08em] text-white">{release.title}</h3>
                  <p style={{ fontFamily:"var(--font-code)" }} className="text-[10px] tracking-[0.2em] text-neutral-500 mt-1">{release.type} · {release.year} · {release.tracks.length} {t("tracks")}</p>
                </div>
                <div className="flex flex-col gap-3">
                  {release.tracks.map(({ num, name, time, color }) => (
                    <div key={num} className="flex items-center gap-3 pb-3 border-b border-neutral-800 last:border-0">
                      <span style={{ fontFamily:"var(--font-code)", color:COLOR_MAP[color] }} className="text-[10px] w-5">{num}</span>
                      <span className="flex-1 text-[13px] text-neutral-300">{name}</span>
                      <span style={{ fontFamily:"var(--font-code)" }} className="text-[10px] text-neutral-600">{time}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-auto">
                  <motion.a href="#" style={{ fontFamily:"var(--font-code)" }} className="text-[10px] tracking-[0.2em] px-5 py-2.5 bg-[#00AEEF] text-white" whileHover={{ backgroundColor:"#EC008C" }} transition={{ duration:0.2 }}>{t("stream")}</motion.a>
                  <a href="#" style={{ fontFamily:"var(--font-code)" }} className="text-[10px] tracking-[0.2em] px-5 py-2.5 border border-neutral-700 text-neutral-400 hover:border-[#00AEEF] hover:text-[#00AEEF] transition-colors">{t("download")}</a>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-4">
            {SINGLES.map(({ title, year, color }, i) => {
              const c = COLOR_MAP[color];
              return (
                <motion.div key={title} className="flex items-center gap-5 border border-neutral-800 p-5 group hover:border-neutral-600 transition-colors cursor-pointer"
                  initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true, margin:"-80px" }} transition={{ duration:0.6, delay:i*0.1, ease:[0.16,1,0.3,1] }}>
                  <div className="w-16 h-16 flex-shrink-0 relative overflow-hidden" style={{ background:`linear-gradient(135deg, ${c}, ${c}44)` }}>
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage:`radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize:"8px 8px" }}/>
                  </div>
                  <div>
                    <h4 style={{ fontFamily:"var(--font-code)" }} className="text-[12px] tracking-[0.15em] text-white mb-1">{title}</h4>
                    <p style={{ fontFamily:"var(--font-code)" }} className="text-[10px] text-neutral-500 tracking-[0.15em]">Single · {year}</p>
                  </div>
                  <span style={{ color:c }} className="ml-auto text-lg opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </motion.div>
              );
            })}
            <motion.div className="border border-dashed border-neutral-700 p-5 flex items-center justify-center" initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:0.4 }}>
              <span style={{ fontFamily:"var(--font-code)" }} className="text-[10px] tracking-[0.2em] text-neutral-600">{t("comingSoon")}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
