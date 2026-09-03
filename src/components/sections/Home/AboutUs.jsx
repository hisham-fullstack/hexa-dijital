"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Eye, Cpu } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import "./AboutUs.css";

const AboutUs = () => {
  const [expandedId, setExpandedId] = useState(0);
  const { t } = useLanguage();

  const pillars = [
    {
      id: 0,
      number: "01",
      title: t("about.p1_title"),
      desc: t("about.p1_desc"),
      icon: <ShieldCheck size={24} />,
    },
    {
      id: 1,
      number: "02",
      title: t("about.p2_title"),
      desc: t("about.p2_desc"),
      icon: <Eye size={24} />,
    },
    {
      id: 2,
      number: "03",
      title: t("about.p3_title"),
      desc: t("about.p3_desc"),
      icon: <Cpu size={24} />,
    },
  ];

  return (
    <section className="global-section hx-accordion-about">
      <div className="container">
        <div className="hx-about-grid">
          {/* SOL: STICKY MANİFESTO */}
          <div className="hx-about-sticky-col">
            <div className="hx-sticky-content">
              <span className="hx-meta-label">{t("about.badge")}</span>
              <h2 className="hx-massive-heading">
                {t("about.titleMain")} <br />
                <span className="text-glow-accent">{t("about.titleGlow")}</span>
              </h2>
              <p className="hx-sticky-desc">{t("about.desc")}</p>
            </div>
          </div>

          {/* SAĞ: FLUID ACCORDION */}
          <div className="hx-about-accordion-col">
            <div className="hx-accordion-wrapper">
              {pillars.map((pillar) => {
                const isActive = expandedId === pillar.id;

                return (
                  <motion.div
                    key={pillar.id}
                    className={`hx-accordion-item ${isActive ? "active" : ""}`}
                    onHoverStart={() => setExpandedId(pillar.id)}
                    onClick={() => setExpandedId(pillar.id)}
                    layout
                  >
                    <motion.div className="hx-accordion-header" layout>
                      <div className="hx-header-left">
                        <span className="hx-acc-number">{pillar.number}</span>
                        <h3 className="hx-acc-title">{pillar.title}</h3>
                      </div>
                      <motion.div
                        className="hx-acc-icon"
                        animate={{ rotate: isActive ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight size={24} />
                      </motion.div>
                    </motion.div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="hx-accordion-body"
                        >
                          <div className="hx-accordion-content-inner">
                            <div className="hx-acc-body-icon">
                              {pillar.icon}
                            </div>
                            <p className="hx-acc-desc">{pillar.desc}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
