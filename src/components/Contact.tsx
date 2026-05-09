"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import { SOCIAL_LINKS } from "@/lib/constants";

const CONTACT_EMAILS = [
  { labelKey: "labelBooking",  email: "booking@paralleloffset.com", color: "#00AEEF" },
  { labelKey: "labelPrintShop",email: "print@paralleloffset.com",   color: "#EC008C" },
  { labelKey: "labelPress",    email: "press@paralleloffset.com",   color: "#FFD600" },
] as const;

export default function Contact() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const subjects = [
    { value: "",         label: t("subjectPlaceholder") },
    { value: "booking",  label: t("subjectBooking")     },
    { value: "print",    label: t("subjectPrint")       },
    { value: "collab",   label: t("subjectCollab")      },
    { value: "press",    label: t("subjectPress")       },
    { value: "other",    label: t("subjectOther")       },
  ];

  return (
    <section id="contact" className="py-28 md:py-36">
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionHeader number={t("number")} title={t("title")} />

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="thanks"
                  className="flex flex-col items-start gap-4 py-16"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                >
                  <div className="flex h-[3px] w-24">
                    <span className="flex-1 bg-[#00AEEF]" />
                    <span className="flex-1 bg-[#EC008C]" />
                    <span className="flex-1 bg-[#FFD600]" />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-heading)" }} className="text-[48px] tracking-[0.05em]">
                    {t("sentTitle")}
                  </h3>
                  <p className="text-neutral-500 text-[15px]">{t("sentSub")}</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-7" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Name */}
                  {[
                    { id: "name",  label: t("fieldName"),  type: "text",  placeholder: t("namePlaceholder"),  color: "#00AEEF" },
                    { id: "email", label: t("fieldEmail"), type: "email", placeholder: t("emailPlaceholder"), color: "#EC008C" },
                  ].map(({ id, label, type, placeholder, color }) => (
                    <div key={id} className="flex flex-col gap-2">
                      <label htmlFor={id} style={{ fontFamily: "var(--font-code)", color }} className="text-[10px] tracking-[0.25em]">{label}</label>
                      <input id={id} type={type} placeholder={placeholder} required
                        className="bg-transparent border-b border-neutral-200 pb-3 pt-1 text-[14px] text-[#1A1A1A] outline-none focus:border-[#00AEEF] placeholder:text-neutral-300 transition-colors"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>
                  ))}

                  {/* Subject */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" style={{ fontFamily: "var(--font-code)", color: "#FFD600" }} className="text-[10px] tracking-[0.25em]">{t("fieldSubject")}</label>
                    <select id="subject" className="bg-transparent border-b border-neutral-200 pb-3 pt-1 text-[14px] text-[#1A1A1A] outline-none focus:border-[#EC008C] transition-colors appearance-none cursor-pointer" style={{ fontFamily: "var(--font-body)" }}>
                      {subjects.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" style={{ fontFamily: "var(--font-code)" }} className="text-[10px] tracking-[0.25em] text-[#1A1A1A]">{t("fieldMessage")}</label>
                    <textarea id="message" rows={5} placeholder={t("messagePlaceholder")} required
                      className="bg-transparent border-b border-neutral-200 pb-3 pt-1 text-[14px] text-[#1A1A1A] outline-none focus:border-[#1A1A1A] placeholder:text-neutral-300 transition-colors resize-none"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>

                  {/* Submit */}
                  <motion.button type="submit" className="self-start flex flex-col items-start gap-2 border border-[#1A1A1A] px-10 pt-4 pb-3 relative overflow-hidden group" whileHover="hover">
                    <motion.span className="absolute inset-0 bg-[#1A1A1A] origin-left" initial={{ scaleX: 0 }} variants={{ hover: { scaleX: 1 } }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}/>
                    <span style={{ fontFamily: "var(--font-code)" }} className="relative text-[11px] tracking-[0.25em] group-hover:text-white transition-colors duration-300 z-10">{t("send")}</span>
                    <div className="relative flex w-full h-[2px] z-10">
                      {["#00AEEF","#EC008C","#FFD600","#1A1A1A"].map((c, i) => (
                        <span key={i} className="flex-1 h-full" style={{ background: c }} />
                      ))}
                    </div>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info sidebar */}
          <motion.div
            className="flex flex-col gap-9 pt-1"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {CONTACT_EMAILS.map(({ labelKey, email, color }) => (
              <div key={labelKey}>
                <h4 style={{ fontFamily: "var(--font-code)", color }} className="text-[10px] tracking-[0.25em] mb-2">{t(labelKey)}</h4>
                <p className="text-[14px] text-neutral-500">{email}</p>
              </div>
            ))}

            <div>
              <h4 style={{ fontFamily: "var(--font-code)" }} className="text-[10px] tracking-[0.25em] mb-3 text-[#1A1A1A]">{t("labelFollow")}</h4>
              <div className="flex flex-col gap-2">
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <a key={label} href={href} style={{ fontFamily: "var(--font-code)" }}
                    className="text-[11px] tracking-[0.15em] text-neutral-500 flex items-center gap-2 group hover:text-[#1A1A1A] transition-colors"
                  >
                    <span className="text-neutral-200 group-hover:text-[#00AEEF] transition-colors">→</span>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
