"use client";

import { useTranslations } from "next-intl";
import RegMark from "@/components/ui/RegMark";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#1A1A1A] text-white py-12 px-8 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 flex h-[3px]">
        <span className="flex-1 bg-[#00AEEF]" />
        <span className="flex-1 bg-[#EC008C]" />
        <span className="flex-1 bg-[#FFD600]" />
      </div>

      <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between gap-6">
        <div className="flex flex-col leading-none">
          <span style={{ fontFamily: "var(--font-code)" }} className="text-[9px] tracking-[0.4em] text-neutral-500">PARALLEL</span>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: 20, background: "linear-gradient(90deg, #00AEEF, #EC008C, #FFD600)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            OFFSET
          </span>
        </div>

        <div style={{ fontFamily: "var(--font-heading)" }} className="flex gap-2 text-[32px]">
          <span style={{ color: "#00AEEF" }}>C</span>
          <span style={{ color: "#EC008C" }}>M</span>
          <span style={{ color: "#FFD600" }}>Y</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>K</span>
        </div>

        <p style={{ fontFamily: "var(--font-code)" }} className="text-[10px] tracking-[0.15em] text-neutral-500">
          {t("copy")}
        </p>
      </div>

      <div className="absolute bottom-6 right-8 opacity-20">
        <RegMark size={28} color="white" />
      </div>
    </footer>
  );
}
