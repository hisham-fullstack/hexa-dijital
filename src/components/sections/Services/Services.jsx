"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Globe,
  ShoppingBag,
  Cpu,
  Search,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { servicesData } from "@/data/servicesData";
import { slugify, assetUrl } from "@/utils/formatters";
import CtaSection from "@/components/ui/CtaSection";
import SectoralPanel from "@/components/sections/Home/SectoralPanel";
import "./Services.css";

const iconMap = {
  "web-siteleri-dijital-vitrin": <Globe size={20} />,
  "satis-siparis-sistemleri": <ShoppingBag size={20} />,
  "dukkan-ici-programlar-kolayliklar": <Cpu size={20} />,
  "musteri-cekme-reklam-itibar": <Search size={20} />,
  "tasarim-baski-isleri": <Sparkles size={20} />,
};

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="global-section services-page">
      <div className="container">
        {/* ÜST BAŞLIK & VİZYON (BAĞIMSIZ KUSURSUZ HERO) */}
        <div className="approach-content services-hero-margin">
          <div className="approach-label">
            <p>HİZMETLERİMİZ</p>
          </div>
          <div className="approach-text">
            <h2>
              <span className="text-dark">
                Dükkanınızın ve şirketinizin ihtiyacı olan tüm çözümler.{" "}
              </span>
              <span className="text-light">
                Hızlı açılan web sitelerinden komisyonsuz paket servise, adisyon
                programından Google haritalarda 1. sıraya kadar net çözümler.
              </span>
            </h2>
          </div>
        </div>

        {/* ORİJİNAL STICKY GÖRSEL & LİSTELEME MİMARİSİ */}
        {servicesData.map((category) => {
          const bgTitle = category.title.split(" ")[0];

          return (
            <div key={category.id} className="services-category-wrapper">
              <div className="category-grid">
                {/* SOL: STICKY GÖRSEL & DEVASA BAŞLIK */}
                <div className="category-image-sticky-wrapper">
                  <div className="category-bg-title">
                    {bgTitle}{" "}
                    <span className="category-index">{category.index}</span>
                  </div>
                  <div className="category-image-box">
                    <img
                      src={assetUrl(category.bgImage)}
                      alt={category.title}
                    />
                  </div>
                </div>

                {/* SAĞ: KATEGORİ VE HİZMET LİSTESİ */}
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
                          <div className="sub-category-link-left">
                            <span className="sub-category-icon">
                              {iconMap[category.id] || (
                                <ChevronRight size={20} />
                              )}
                            </span>
                            <h4 className="sub-category-title">{sub.title}</h4>
                          </div>
                          <span className="group-explore-text">
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

                              <div className="item-right-wrap">
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
