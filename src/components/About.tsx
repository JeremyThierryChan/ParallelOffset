"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";

const TAGS = [
  { key: "djent",       border: "#00AEEF", color: "#00AEEF", bg: "transparent" },
  { key: "progressive", border: "#EC008C", color: "#EC008C", bg: "transparent" },
  { key: "polyrhythm",  border: "#FFD600", color: "#1A1A1A", bg: "#FFD600"     },
  { key: "guitar",      border: "#1A1A1A", color: "#1A1A1A", bg: "transparent" },
  { key: "time",        border: "#00AEEF", color: "#00AEEF", bg: "transparent" },
] as const;

const RHYTHMS = [
  { label: "4/4", beats: ["c","off","m","off","y","off","k","off"] },
  { label: "7/8", beats: ["c","off","m","y","off","k","off","c"]   },
  { label: "9/8", beats: ["m","y","off","k","off","c","m","off","y"] },
] as const;

const BEAT_COLORS: Record<string, string> = {
  c: "#00AEEF", m: "#EC008C", y: "#FFD600", k: "#1A1A1A",
};

export default function About() {
  const t = useTranslations("about");
  const rhythmRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rhythmRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-28 md:py-36">
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionHeader number={t("number")} title={t("title")} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-80px" }} transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}>
            <h3 style={{ fontFamily:"var(--font-heading)" }} className="text-[52px] leading-[1.02] tracking-[0.03em] mb-7">
              {t("headline1")}<br />{t("headline2")}
            </h3>
            <p className="text-[15px] leading-[1.85] text-neutral-500 mb-5">
              <strong className="text-[#1A1A1A] font-semibold">Parallel Offset</strong>{" "}
              {t("body1")}
            </p>
            <p className="text-[15px] leading-[1.85] text-neutral-500">{t("body2")}</p>

            <div className="flex flex-wrap gap-2 mt-8">
              {TAGS.map(({ key, border, color, bg }) => (
                <span key={key} style={{ fontFamily:"var(--font-code)", borderColor:border, color, background:bg }} className="text-[10px] tracking-[0.15em] border px-3 py-1.5">
                  {t(`tags.${key}`)}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div ref={rhythmRef} className="bg-[#F5F5F5] border border-neutral-200 p-10 flex flex-col gap-10" initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-80px" }} transition={{ duration:0.7, delay:0.1, ease:[0.16,1,0.3,1] }}>
            {/* CMYK circles */}
            <div className="flex justify-center">
              <div className="relative w-28 h-28">
                {[
                  { color:"#00AEEF", top:0,    left:"50%", ml:-20 },
                  { color:"#EC008C", top:"50%", left:0     },
                  { color:"#FFD600", top:"50%", left:"auto", right:0 },
                ].map(({ color, ...pos }, i) => (
                  <motion.div key={i} className="absolute w-12 h-12 rounded-full" style={{ background:color, mixBlendMode:"multiply", opacity:0.85, ...pos } as React.CSSProperties}
                    animate={{ scale:[1,1.08,1] }} transition={{ duration:3+i*0.5, repeat:Infinity, ease:"easeInOut", delay:i*0.8 }}/>
                ))}
              </div>
            </div>

            {/* Rhythm grid */}
            <div className="flex flex-col gap-4">
              {RHYTHMS.map(({ label, beats }, ri) => (
                <div key={label} className="flex items-center gap-3">
                  <span style={{ fontFamily:"var(--font-code)" }} className="text-[10px] text-neutral-400 w-7 tracking-[0.05em]">{label}</span>
                  <div className="flex gap-[5px] flex-1">
                    {beats.map((beat, bi) => {
                      const isOn = beat !== "off";
                      return (
                        <motion.div key={bi} className="flex-1 h-5 rounded-[2px]"
                          style={{ background:isOn?BEAT_COLORS[beat]:"transparent", border:isOn?"none":"1px solid #E0E0E0" }}
                          animate={isOn&&inView?{ opacity:[1,0.55,1], scale:[1,0.88,1] }:{}}
                          transition={{ duration:label==="4/4"?1:label==="7/8"?0.875:1.125, delay:bi*0.12+ri*0.08, repeat:Infinity, ease:"easeInOut" }}/>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
