"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { servicesData } from "@/data/servicesData";
import { slugify, assetUrl } from "@/utils/formatters";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowUpRight } from "lucide-react";
import "./HomeServices.css";

const HomeServices = () => {
  const router = useRouter();
  const { t } = useLanguage();

  const allSubCategories = servicesData.flatMap((cat) =>
    cat.subCategories.map((sub) => ({
      ...sub,
      categoryId: cat.id,
      categoryIndex: cat.index,
    })),
  );

  return (
    <section className="global-section services-section">
      <div className="container">
        <div className="home-services-header">
          <span className="text-gradient-flow">{t("services.tag")}</span>
          <h2 className="home-services-title">
            {t("services.title")}{" "}
            <span className="text-cyan">{t("services.titleGlow")}</span>
          </h2>
        </div>

        {/* 2 Üst + 3 Alt Lüks Asimetrik Bento Grid */}
        <div className="modern-bento-grid">
          {allSubCategories.map((sub, index) => {
            const subSlug = slugify(sub.title);
            const isFeatured = index === 0;

            return (
              <div
                key={sub.title}
                className={`bento-card bento-card-${index + 1} ${
                  isFeatured ? "bento-card-featured" : ""
                }`}
                onClick={() => router.push(`/hizmetler/${subSlug}`)}
              >
                {/* 1. KATMAN: Arka Plan Görseli */}
                <div
                  className="card-bg-layer"
                  style={{ backgroundImage: `url(${assetUrl(sub.image)})` }}
                />

                {/* 2. KATMAN: Tam Boy Sinematik Karartma ve Cam Filtresi */}
                <div className="card-full-overlay" />

                {/* 3. KATMAN: İçerik */}
                <div className="card-content">
                  <div className="card-top">
                    <div className="card-index-badge">
                      <span>0{index + 1}</span>
                    </div>

                    <div className="card-arrow-circle">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  <div className="card-bottom">
                    <div className="card-titles-wrap">
                      <span className="card-service-count">
                        {sub.items.length} {t("services.solutionsCount")}
                      </span>
                      <h3 className="card-main-title">{sub.title}</h3>
                      <p className="card-intro-text">{sub.introText}</p>
                    </div>

                    <div className="card-tags-container">
                      <div className="tags-list">
                        {sub.items.map((item, tagIndex) => (
                          <span
                            key={item.slug}
                            className="glass-tag"
                            style={{ "--i": tagIndex + 1 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/hizmetler/${subSlug}/${item.slug}`);
                            }}
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>

                      <span className="see-more-link">
                        {t("services.exploreMore")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeServices;
