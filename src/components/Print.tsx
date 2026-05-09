"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import RegMark from "@/components/ui/RegMark";
import { CMYK } from "@/lib/constants";

function PressSheet() {
  const layers = [
    { color: CMYK.C, angle: 45,  delay: 0   },
    { color: CMYK.M, angle: -45, delay: 1.5 },
    { color: CMYK.Y, angle: 0,   delay: 3   },
    { color: CMYK.K, angle: 90,  delay: 4.5 },
  ];
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute -inset-8 pointer-events-none">
        {["top-0 left-0","top-0 right-0","bottom-0 left-0","bottom-0 right-0"].map((pos, i) => (
          <div key={i} className={`absolute ${pos}`}><RegMark size={20} color="rgba(0,0,0,0.25)" /></div>
        ))}
      </div>
      <div className="relative w-56 h-72 bg-white border border-neutral-200 shadow-[6px_6px_0_#E0E0E0] overflow-hidden">
        {layers.map(({ color, angle, delay }, i) => (
          <motion.div key={i} className="absolute inset-4" style={{ mixBlendMode:"multiply" }} animate={{ opacity:[0,0.75,0] }} transition={{ duration:8, delay, repeat:Infinity, ease:"easeInOut" }}>
            <div className="w-full h-full" style={{ backgroundImage:`repeating-linear-gradient(${angle}deg, ${color} 0px, ${color} 2px, transparent 2px, transparent 9px)` }}/>
            <span style={{ fontFamily:"var(--font-code)", color }} className="absolute bottom-1.5 right-2 text-[9px] tracking-[0.2em] mix-blend-normal">{["C","M","Y","K"][i]}</span>
          </motion.div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <RegMark size={40} color="rgba(0,0,0,0.15)" />
        </div>
      </div>
    </div>
  );
}

export default function Print() {
  const t = useTranslations("print");
  const services = [
    { key: "service1", color: CMYK.C },
    { key: "service2", color: CMYK.M },
    { key: "service3", color: CMYK.Y },
    { key: "service4", color: CMYK.K },
  ] as const;

  return (
    <section id="print" className="py-28 md:py-36 bg-[#F5F5F5] cmyk-border-top">
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionHeader number={t("number")} title={t("title")} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-80px" }} transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}>
            <h3 style={{ fontFamily:"var(--font-heading)" }} className="text-[52px] leading-[1.02] tracking-[0.03em] mb-7">
              {t("headline1")}<br />{t("headline2")}
            </h3>
            <p className="text-[15px] leading-[1.85] text-neutral-500 mb-5">{t("body1")}</p>
            <p className="text-[15px] leading-[1.85] text-neutral-500">{t("body2")}</p>
            <div className="grid grid-cols-2 gap-3 mt-8">
              {services.map(({ key, color }) => (
                <div key={key} className="flex items-center gap-3">
                  <div className="w-4 h-4 flex-shrink-0" style={{ background: color }} />
                  <span style={{ fontFamily:"var(--font-code)" }} className="text-[11px] tracking-[0.1em]">{t(key)}</span>
                </div>
              ))}
            </div>
            <a href="#contact" style={{ fontFamily:"var(--font-code)" }} className="inline-block mt-8 text-[12px] tracking-[0.2em] text-[#1A1A1A] border-b-2 border-[#00AEEF] pb-0.5 hover:text-[#00AEEF] hover:border-[#EC008C] transition-colors">{t("cta")}</a>
          </motion.div>
          <motion.div initial={{ opacity:0, scale:0.96 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true, margin:"-80px" }} transition={{ duration:0.7, delay:0.15, ease:[0.16,1,0.3,1] }} className="flex items-center justify-center py-12">
            <PressSheet />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
