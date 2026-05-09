"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/LocaleSwitcher";

const SECTION_KEYS = ["about", "music", "shows", "print", "contact"] as const;

export default function Nav() {
  const t = useTranslations("nav");

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = document.querySelectorAll("section[id]");
      let cur = "";
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 120) cur = s.id;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 md:px-12"
        style={{ height: 64 }}
        animate={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* CMYK rule on scroll */}
        <motion.div
          className="absolute bottom-0 inset-x-0 flex h-[3px]"
          animate={{ opacity: scrolled ? 1 : 0 }}
        >
          <span className="flex-1 bg-[#00AEEF]" />
          <span className="flex-1 bg-[#EC008C]" />
          <span className="flex-1 bg-[#FFD600]" />
          <span className="flex-1 bg-[#1A1A1A]" />
        </motion.div>

        {/* Logo */}
        <a href="#hero" className="flex flex-col leading-none">
          <span
            style={{ fontFamily: "var(--font-code)" }}
            className="text-[9px] tracking-[0.4em] text-neutral-400 uppercase"
          >
            Parallel
          </span>
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 22,
              background: "linear-gradient(90deg, #00AEEF, #EC008C, #FFD600)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.05em",
              lineHeight: 1,
            }}
          >
            Offset
          </span>
        </a>

        {/* Desktop links + locale switcher */}
        <div className="hidden md:flex items-center gap-9">
          <ul className="flex items-center gap-9 list-none">
            {SECTION_KEYS.map((key) => (
              <li key={key}>
                <a
                  href={`#${key}`}
                  style={{ fontFamily: "var(--font-code)" }}
                  className={`text-[10px] tracking-[0.2em] transition-colors duration-200 relative group ${
                    active === key ? "text-[#1A1A1A]" : "text-neutral-400 hover:text-[#1A1A1A]"
                  }`}
                >
                  {t(key)}
                  <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#00AEEF] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              </li>
            ))}
          </ul>

          {/* Locale switcher */}
          <LocaleSwitcher />
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1 bg-transparent border-none cursor-pointer"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <motion.span className="block w-6 h-[2px] bg-[#1A1A1A]" animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} />
          <motion.span className="block w-6 h-[2px] bg-[#1A1A1A]" animate={{ opacity: open ? 0 : 1 }} />
          <motion.span className="block w-6 h-[2px] bg-[#1A1A1A]" animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 z-40 bg-white border-b-4 border-[#1A1A1A] pt-16 pb-8 px-8 flex flex-col gap-5 md:hidden"
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {SECTION_KEYS.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                onClick={() => setOpen(false)}
                style={{ fontFamily: "var(--font-code)" }}
                className="text-[13px] tracking-[0.25em] text-neutral-600 hover:text-[#1A1A1A] transition-colors"
              >
                {t(key)}
              </a>
            ))}
            <LocaleSwitcher />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
