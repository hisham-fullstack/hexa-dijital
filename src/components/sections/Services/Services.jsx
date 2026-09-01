"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Sparkles,
  Search,
  Globe,
  Cpu,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { servicesData } from "@/data/servicesData";
import { slugify } from "@/utils/formatters";
import CtaSection from "@/components/ui/CtaSection";
import SectoralPanel from "@/components/sections/Home/SectoralPanel";
import "./Services.css";

const iconMap = {
  "Web Siteleri": <Globe size={20} />,
  "E-Ticaret & Satış Sistemleri": <ShoppingBag size={20} />,
  "İşletme Otomasyonu & Yazılım": <Cpu size={20} />,
  "Marka & Grafik Tasarım": <Sparkles size={20} />,
  "Sosyal Medya & Google": <Search size={20} />,
};

const Services = () => {
  return (
    <div className="global-section services-page">
      <div className="container">
        {/* ÜST BAŞLIK & VİZYON */}
        <div className="approach-content services-hero-margin">
          <div className="approach-label">
            <p>HİZMETLERİMİZ</p>
          </div>
          <div className="approach-text">
            <h2>
              <span className="text-dark">
                İşletmenizin ihtiyacı olan tüm dijital çözümler.{" "}
              </span>
              <span className="text-light">
                Hızlı açılan web sitelerinden komisyonsuz e-ticaret
                sistemlerine, restoran otomasyonundan Google harita
                sıralamalarına kadar.
              </span>
            </h2>
          </div>
        </div>

        {/* KATEGORİ LİSTESİ */}
        {servicesData.map((category) => {
          const bgTitle = category.title.split(" ")[0];

          return (
            <div key={category.id} className="services-category-wrapper">
              <div className="category-grid">
                {/* SOL: STICKY GÖRSEL & BAŞLIK */}
                <div className="category-image-sticky-wrapper">
                  <div className="category-bg-title">
                    {bgTitle}{" "}
                    <span className="category-index">{category.index}</span>
                  </div>
                  <div className="category-image-box">
                    <img src={category.bgImage} alt={category.title} />
                  </div>
                </div>

                {/* SAĞ: LİSTE */}
                <div className="category-list-box">
                  <div className="list-main-header">
                    <h3>{category.title}</h3>
                    <p className="category-desc-text">{category.description}</p>
                  </div>

                  {category.subCategories.map((sub, subIdx) => {
                    const subSlug = slugify(sub.title);

                    return (
                      <div key={subIdx} className="sub-category-group">
                        <Link
                          href={`/hizmetler/${subSlug}`}
                          className="sub-category-title-link"
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                            }}
                          >
                            <span className="sub-category-icon">
                              {iconMap[sub.title] || <ChevronRight size={20} />}
                            </span>
                            <h4 className="sub-category-title">{sub.title}</h4>
                          </div>
                          <span
                            className="group-explore-text"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            Tümünü İncele ({sub.items.length}){" "}
                            <ArrowRight size={14} />
                          </span>
                        </Link>

                        <div className="service-links">
                          {sub.items.map((item) => (
                            <Link
                              key={item.slug}
                              href={`/hizmetler/${subSlug}/${item.slug}`}
                              className="service-list-item"
                            >
                              <span className="item-text">{item.name}</span>

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "16px",
                                  zIndex: 10,
                                }}
                              >
                                <span className="service-inspect-tag">
                                  İncele
                                </span>
                                <ChevronRight
                                  className="item-arrow"
                                  strokeWidth={1.5}
                                  size={18}
                                />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <CtaSection />
      <SectoralPanel />
    </div>
  );
};

export default Services;
