"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import RegMark from "@/components/ui/RegMark";

const OFFSET_LAYERS = [
  { color: "#00AEEF", dx: -3, dy: -2 },
  { color: "#EC008C", dx:  3, dy: -2 },
  { color: "#FFD600", dx: -2, dy:  2 },
  { color: "#1A1A1A", dx:  0, dy:  0 },
];

export default function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const bgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 22;
      const y = (e.clientY / window.innerHeight) * 22;
      el.style.backgroundPosition = `${x}px ${y}px`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div ref={bgRef} className="halftone-bg absolute inset-0 transition-[background-position] duration-100" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center select-none px-6"
      >
        {/* Corner reg marks */}
        <div className="absolute -inset-16 pointer-events-none">
          {["top-0 left-0","top-0 right-0","bottom-0 left-0","bottom-0 right-0"].map((pos, i) => (
            <motion.div key={i} className={`absolute ${pos}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 + i * 0.1 }}>
              <RegMark size={32} color="rgba(0,0,0,0.2)" />
            </motion.div>
          ))}
        </div>

        {/* Ghost register */}
        <motion.div className="relative h-8 flex items-center justify-center mb-2 overflow-visible" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
          {["#00AEEF","#EC008C","#FFD600"].map((color, i) => (
            <span key={i} style={{ fontFamily:"var(--font-heading)", fontSize:13, letterSpacing:"0.5em", color, mixBlendMode:"multiply", position:"absolute", transform:`translate(${(i-1)*3}px,${(i%2)*2-1}px)`, opacity:0.45, whiteSpace:"nowrap" }}>
              PARALLEL
            </span>
          ))}
        </motion.div>

        {/* PARALLEL */}
        <motion.h1
          style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(52px,13vw,168px)", letterSpacing:"0.22em", lineHeight:1 }}
          className="text-[#1A1A1A]"
          initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.9, ease:[0.16,1,0.3,1] }}
        >
          PARALLEL
        </motion.h1>

        {/* OFFSET — CMYK misregistration */}
        <motion.div className="relative" style={{ lineHeight:0.85 }} initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.15, ease:[0.16,1,0.3,1] }}>
          {OFFSET_LAYERS.map(({ color, dx, dy }, i) => (
            <span key={i} style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(60px,15vw,190px)", letterSpacing:"0.1em", color, mixBlendMode:i<3?"multiply":"normal", position:i===0?"relative":"absolute", top:i===0?undefined:`${dy}px`, left:i===0?undefined:`${dx}px`, inset:i===0?undefined:0, display:"block", pointerEvents:"none" }}>
              OFFSET
            </span>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.div className="flex items-center gap-5 mt-10" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5, duration:0.8 }}>
          <div className="flex h-[2px] w-14">
            <span className="flex-1 bg-[#00AEEF]"/><span className="flex-1 bg-[#EC008C]"/><span className="flex-1 bg-[#FFD600]"/>
          </div>
          <p style={{ fontFamily:"var(--font-code)" }} className="text-[10px] tracking-[0.35em] text-neutral-500">{t("tagline")}</p>
          <div className="flex h-[2px] w-14">
            <span className="flex-1 bg-[#00AEEF]"/><span className="flex-1 bg-[#EC008C]"/><span className="flex-1 bg-[#FFD600]"/>
          </div>
        </motion.div>

        {/* Sub */}
        <motion.p className="text-neutral-500 text-[15px] font-light mt-3 tracking-wide" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.65, duration:0.8 }}>
          {t("sub1")}<span className="mx-4 text-neutral-200">⊗</span>{t("sub2")}
        </motion.p>

        {/* CTA */}
        <motion.a href="#about" className="mt-12 flex flex-col items-center gap-2 border border-[#1A1A1A] px-10 pt-4 pb-3 group relative overflow-hidden" initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8, duration:0.6 }} whileHover="hover">
          <motion.span className="absolute inset-0 bg-[#1A1A1A] origin-bottom" initial={{ scaleY:0 }} variants={{ hover:{ scaleY:1 } }} transition={{ duration:0.3, ease:[0.16,1,0.3,1] }}/>
          <span style={{ fontFamily:"var(--font-code)" }} className="relative text-[10px] tracking-[0.3em] transition-colors duration-300 group-hover:text-white z-10">{t("cta")}</span>
          <div className="relative flex gap-[3px] w-20 z-10">
            {["#00AEEF","#EC008C","#FFD600","#1A1A1A"].map((c,i) => (
              <motion.span key={i} className="flex-1 h-[2px]" style={{ background:c }} animate={{ scaleX:[0.4,1,0.4] }} transition={{ duration:2, delay:i*0.2, repeat:Infinity, ease:"easeInOut" }}/>
            ))}
          </div>
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4, duration:0.8 }}>
        <span style={{ fontFamily:"var(--font-code)" }} className="text-[9px] tracking-[0.3em] text-neutral-400">{t("scroll")}</span>
        <motion.div className="w-[1px] h-10 bg-gradient-to-b from-neutral-400 to-transparent" animate={{ scaleY:[1,0.4,1], opacity:[1,0.3,1] }} transition={{ duration:2.2, repeat:Infinity, ease:"easeInOut" }}/>
      </motion.div>
    </section>
  );
}
