"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { servicesData } from "@/data/servicesData";
import { slugify, assetUrl } from "@/utils/formatters";
import "./HomeServices.css";

const HomeServices = () => {
  const router = useRouter();

  return (
    <section className="global-section services-section">
      <div className="container">
        <div className="text-gradient-flow">Hizmetlerimiz</div>

        <div className="bento-grid">
          {servicesData.map((category) =>
            category.subCategories.map((sub, subIdx) => {
              const cardId = `${category.id}-${subIdx}`;
              const subSlug = slugify(sub.title);

              return (
                <div
                  key={cardId}
                  className="bento-card"
                  style={{ backgroundImage: `url(${assetUrl(sub.image)})` }}
                  onClick={() => router.push(`/hizmetler/${subSlug}`)}
                >
                  <div className="card-overlay" />
                  <div className="card-top-blur" />

                  <div className="card-content">
                    <div className="card-top">
                      <h3>{sub.title}</h3>
                      <span className="service-count">
                        / {sub.items.length} hizmet
                      </span>
                    </div>

                    <div className="card-tags-container">
                      <div className="tags-list">
                        {sub.items.map((item, index) => (
                          <span
                            key={index}
                            className="glass-tag"
                            style={{ "--i": index + 1 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/hizmetler/${subSlug}/${item.slug}`);
                            }}
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>

                      <span className="see-more">Detayları İncele</span>
                    </div>
                  </div>
                </div>
              );
            }),
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeServices;
