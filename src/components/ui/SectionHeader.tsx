"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  number: string;
  title: string;
  dark?: boolean;
}

export default function SectionHeader({ number, title, dark = false }: SectionHeaderProps) {
  return (
    <motion.div
      className="flex items-center gap-5 mb-18"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span
        style={{ fontFamily: "var(--font-code)" }}
        className="text-[11px] text-neutral-500 tracking-[0.2em]"
      >
        {number}
      </span>
      <h2
        style={{ fontFamily: "var(--font-heading)" }}
        className={`text-5xl tracking-[0.08em] leading-none ${dark ? "text-white" : "text-[#1A1A1A]"}`}
      >
        {title}
      </h2>
      <div className="flex-1 h-[3px] flex overflow-hidden rounded-full">
        <span className="flex-1 bg-[#00AEEF]" />
        <span className="flex-1 bg-[#EC008C]" />
        <span className="flex-1 bg-[#FFD600]" />
        <span className="flex-1 bg-[#1A1A1A]" />
      </div>
    </motion.div>
  );
}
