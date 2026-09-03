"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import "./Testimonials.css";

const Testimonials = () => {
  const { t } = useLanguage();

  const testimonialsData = [
    {
      id: 1,
      quote: t("testimonials.t1_quote"),
      name: t("testimonials.t1_name"),
      title: t("testimonials.t1_role"),
      initial: "İ",
    },
    {
      id: 2,
      quote: t("testimonials.t2_quote"),
      name: t("testimonials.t2_name"),
      title: t("testimonials.t2_role"),
      initial: "M",
    },
    {
      id: 3,
      quote: t("testimonials.t3_quote"),
      name: t("testimonials.t3_name"),
      title: t("testimonials.t3_role"),
      initial: "Ö",
    },
  ];

  return (
    <section className="global-section testimonials-section">
      <div className="container testimonials-container">
        {/* SOL TARAF: Ekrana kilitlenen (Sticky) alan */}
        <div className="testimonials-left">
          <div className="testimonials-sticky-content">
            <div className="text-gradient-flow">{t("testimonials.tag")}</div>
            <h2 className="testimonials-title">
              {t("testimonials.title")} <br />
              <span className="text-dimmed global-text-dimmed">
                {t("testimonials.subtitle")}
              </span>
            </h2>
          </div>
        </div>

        {/* SAĞ TARAF: Yukarı doğru kayan kartlar */}
        <div className="testimonials-right">
          {testimonialsData.map((item) => (
            <div className="testimonial-card global-glass-card" key={item.id}>
              <p className="testimonial-quote">"{item.quote}"</p>

              <div className="testimonial-author">
                <div className="author-avatar">{item.initial}</div>
                <div className="author-info">
                  <h4 className="author-name">{item.name}</h4>
                  <span className="author-title">{item.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
