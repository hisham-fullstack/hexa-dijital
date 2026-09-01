"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, ArrowRight } from "lucide-react";
import { sectoralData } from "@/data/sectoralData";
import { assetUrl } from "@/utils/formatters";
import "./SectoralPanel.css";

const SectoralPanel = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="global-section hx-bento-section">
      <div className="container">
        <div className="hx-bento-editorial-layout">
          <div className="hx-bento-left-column">
            <h2 className="text-gradient-flow">SEKTÖREL ÇÖZÜMLER</h2>

            <div
              className="hx-bento-grid-wrapper"
              onMouseLeave={() => setHoveredId(null)}
            >
              {sectoralData.slice(0, 4).map((sector) => {
                const isDimmed = hoveredId !== null && hoveredId !== sector.id;
                const isFocused = hoveredId === sector.id;

                return (
                  <Link
                    href={`/sektorel-cozumler/${sector.id}`}
                    key={sector.id}
                    className={`hx-bento-card-item ${isDimmed ? "hx-bento-dimmed" : ""} ${isFocused ? "hx-bento-focused" : ""}`}
                    onMouseEnter={() => setHoveredId(sector.id)}
                  >
                    <div
                      className="hx-bento-bg-layer"
                      style={{
                        backgroundImage: `url(${assetUrl(sector.bgImage)})`,
                      }}
                    />
                    <div className="hx-bento-overlay-layer" />

                    <div className="hx-bento-icon-box">
                      <ArrowUpRight size={22} strokeWidth={2} />
                    </div>

                    <div className="hx-bento-content-box">
                      <span className="hx-bento-badge-text">
                        {sector.label}
                      </span>
                      <h3 className="hx-bento-title-text">{sector.title}</h3>
                      <p className="hx-bento-desc-text">{sector.description}</p>

                      <ul className="hx-bento-features-list">
                        {sector.workflowSteps?.slice(0, 2).map((step, idx) => (
                          <li key={idx}>
                            <Check size={14} className="hx-bento-check-icon" />
                            {step.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hx-bento-right-column">
            <div className="hx-bento-sticky-content">
              <h3 className="hx-bento-side-typography">
                <span className="text-dark">Standart şablonlar değil; </span>
                <span className="text-light">
                  sektörünüzün darboğazlarını yıkan otonom dönüşüm mimarileri.
                </span>
              </h3>

              <Link href="/sektorel-cozumler" className="hx-bento-explore-btn">
                Tüm Mimarileri İncele <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectoralPanel;
