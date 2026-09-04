"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import { projectsData } from "@/data/projectsData";
import { assetUrl } from "@/utils/formatters";
import { useLanguage } from "@/context/LanguageContext";
import "./LatestWork.css";

const LatestWork = () => {
  const [hoveredWork, setHoveredWork] = useState(null);
  const { t } = useLanguage();
  const featuredWorks = projectsData.filter((project) => project.isFeatured);

  useEffect(() => {
    if (featuredWorks.length > 0) {
      setHoveredWork(featuredWorks[0]);
    }
  }, []);

  return (
    <section className="global-section latest-work-section">
      <div className="container">
        <div className="lw-header-compact">
          <div className="text-gradient-flow lw-header-tag">
            {t("latestWork.tag")}
          </div>
          <div className="lw-header-content-flex">
            <h2>
              {t("latestWork.titleMain")} <br />{" "}
              <span className="text-glow">{t("latestWork.titleGlow")}</span>{" "}
              {t("latestWork.titleEnd")}
            </h2>
            <Link href="/projeler" className="hx-btn-outline">
              {t("latestWork.viewAllBtn")}
            </Link>
          </div>
        </div>

        <div className="lw-interactive-layout">
          <div className="lw-list-column">
            {featuredWorks.map((work) => (
              <Link
                key={work.id}
                href={`/projeler/${work.slug}`}
                className="lw-row-item"
                onMouseEnter={() => setHoveredWork(work)}
              >
                <div className="lw-row-left">
                  <div className="lw-meta">
                    <span className="lw-tag">
                      {work.isHexaProduct && (
                        <Cpu size={12} style={{ marginRight: "6px" }} />
                      )}
                      {work.meta[0].value}
                    </span>
                    <span className="lw-tech-text">{work.meta[1].value}</span>
                  </div>

                  <h3 className="lw-title">{work.title}</h3>
                  <p className="lw-description">{work.description}</p>
                </div>

                <div className="lw-row-right">
                  <div className="lw-arrow-circle">
                    <ArrowRight size={24} />
                  </div>
                </div>

                <div className="lw-mobile-image">
                  <img src={assetUrl(work.image)} alt={work.title} />
                </div>
              </Link>
            ))}
          </div>

          <div className="lw-image-column">
            <div className="lw-sticky-container global-glass-card">
              <AnimatePresence mode="wait">
                {hoveredWork && (
                  <motion.div
                    key={hoveredWork.id}
                    className="lw-sticky-wrapper"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img
                      src={assetUrl(hoveredWork.image)}
                      alt={hoveredWork.title}
                    />
                    <div className="lw-overlay-info">
                      <span className="lw-client-text">
                        {t("latestWork.clientLabel")}: {hoveredWork.client}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="lw-mobile-action">
          <Link href="/projeler" className="hx-btn-outline lw-mobile-full-btn">
            {t("latestWork.viewAllBtn")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestWork;
