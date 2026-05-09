"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

const LOCALES = [
  { code: "zh", label: "中文",      dot: "#00AEEF" },
  { code: "en", label: "English",   dot: "#EC008C" },
  { code: "fr", label: "Français",  dot: "#FFD600" },
  { code: "de", label: "Deutsch",   dot: "#1A1A1A" },
  { code: "it", label: "Italiano",  dot: "#00AEEF" },
  { code: "es", label: "Español",   dot: "#EC008C" },
  { code: "ru", label: "Русский",   dot: "#FFD600" },
  { code: "ar", label: "العربية",   dot: "#1A1A1A" },
] as const;

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchTo = (code: string) => {
    sessionStorage.setItem("__scroll", String(window.scrollY));
    router.replace(pathname, { locale: code });
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        style={{ fontFamily: "var(--font-code)" }}
        className="flex items-center gap-2 text-[10px] tracking-[0.2em] border border-neutral-200 px-3 py-1.5 hover:border-[#00AEEF] hover:text-[#00AEEF] transition-colors"
      >
        <span
          className="w-[6px] h-[6px] rounded-full flex-shrink-0"
          style={{ background: current.dot }}
        />
        {current.label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[8px] leading-none"
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="absolute right-0 top-full mt-2 bg-white border border-neutral-100 shadow-lg z-50 min-w-[120px] overflow-hidden list-none p-0 m-0"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {LOCALES.map(({ code, label, dot }) => (
              <li key={code}>
                <button
                  onClick={() => switchTo(code)}
                  style={{
                    fontFamily: "var(--font-code)",
                    direction: code === "ar" ? "rtl" : "ltr",
                  }}
                  className={`w-full flex items-center gap-2 px-4 py-2.5 text-[10px] tracking-[0.15em] transition-colors text-left ${
                    code === locale
                      ? "text-[#1A1A1A] bg-neutral-50"
                      : "text-neutral-500 hover:text-[#1A1A1A] hover:bg-neutral-50"
                  }`}
                >
                  <span
                    className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                    style={
                      code === locale
                        ? { background: dot }
                        : { border: `1px solid ${dot}` }
                    }
                  />
                  {label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
