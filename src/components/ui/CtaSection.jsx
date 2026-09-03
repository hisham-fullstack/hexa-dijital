"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PhoneCall, ArrowRight, MessageSquareCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import "./CtaSection.css";

const CtaSection = () => {
  const { t } = useLanguage();

  return (
    <section className="hexa-cta-wrapper">
      <div className="container">
        <motion.div
          className="hexa-cta-box global-glass-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="cta-glow-bg" />

          <div className="cta-content-left">
            <div className="cta-icon-wrapper">
              <PhoneCall size={28} color="var(--hexa-accent)" />
            </div>
            <h2 className="cta-heading">{t("cta.heading")}</h2>
            <p className="cta-text">{t("cta.text")}</p>
          </div>

          <div className="cta-action-right">
            <Link href="/iletisim" className="cta-primary-btn">
              {t("cta.btnPrimary")} <ArrowRight size={18} />
            </Link>
            <Link href="/iletisim" className="cta-secondary-btn">
              <MessageSquareCheck size={18} /> {t("cta.btnSecondary")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
