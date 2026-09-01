"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import CtaSection from "@/components/ui/CtaSection";
import SectoralPanel from "@/components/sections/Home/SectoralPanel";
import "./SubCategoryDetail.css";

const SubCategoryDetail = ({ subCategory, category, subCategorySlug }) => {
  const router = useTransitionRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [subCategorySlug]);

  if (!subCategory || !category) {
    return (
      <div className="error-screen">
        <h3>Grup bulunamadı.</h3>
        <Link href="/hizmetler">Hizmetlere Dön</Link>
      </div>
    );
  }

  const titleParts = subCategory.title.split(" ");
  const heroTitle1 = titleParts[0];
  const heroTitle2 = titleParts.slice(1).join(" ") || "Çözümleri";

  const whatsappMessage = encodeURIComponent(
    `Merhaba Hexa Dijital, "${subCategory.title}" hizmetleriniz hakkında bilgi ve işletmeme özel teklif almak istiyorum.`,
  );
  const whatsappUrl = `https://wa.me/905537161958?text=${whatsappMessage}`;

  return (
    <div className="hexa-sd-page">
      {/* HERO ALANI */}
      <section className="subcat-hero-section">
        <div className="subcat-hero-bg">
          <img src={subCategory.image} alt={subCategory.title} />
          <div className="subcat-hero-overlay" />
        </div>

        <div className="container subcat-hero-container">
          <div className="subcat-top-nav">
            <Link href="/hizmetler" className="subcat-back-btn">
              <ChevronLeft size={16} /> Tüm Hizmetler
            </Link>
            <span className="subcat-hero-badge">
              <Sparkles size={13} /> {category.title}
            </span>
          </div>

          <div className="subcat-hero-text">
            <h1 className="subcat-hero-heading">
              <span>{heroTitle1}</span> <span>{heroTitle2}</span>
            </h1>
            {subCategory.introText && (
              <p className="subcat-hero-subtext">{subCategory.introText}</p>
            )}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="subcat-article-layout">
          <aside className="subcat-article-sidebar">
            <div className="sidebar-sticky-box global-glass-card">
              <div className="subcat-guarantee-tag">
                <ShieldCheck size={16} /> Şeffaf Fiyat & Anahtar Teslim
              </div>
              <h2 className="sidebar-action-title">
                {subCategory.sloganMain || heroTitle1}{" "}
                <span className="global-text-dimmed">
                  {subCategory.sloganHighlight || heroTitle2}
                </span>
              </h2>
              <p className="subcat-side-desc">
                İşletmenizin ihtiyacına en uygun çözümü birlikte belirleyelim.
              </p>

              <div className="subcat-action-buttons-inline">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="subcat-btn-primary"
                >
                  <FaWhatsapp size={17} />
                  <span>WhatsApp'tan Yazın</span>
                </a>

                <Link href="/iletisim" className="subcat-btn-secondary">
                  <span>Teklif Alın</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </aside>

          <article className="subcat-article-body">
            {subCategory.description && (
              <>
                <h3 className="subcat-content-heading">
                  {subCategory.descriptionTitle ||
                    `Neden ${subCategory.title} Önemli?`}
                </h3>
                <p className="subcat-content-text">{subCategory.description}</p>
              </>
            )}

            {subCategory.blockquote && (
              <blockquote className="subcat-quote">
                "{subCategory.blockquote}"
              </blockquote>
            )}

            {subCategory.processSteps &&
              subCategory.processSteps.length > 0 && (
                <div className="subcat-process-box">
                  <h3 className="subcat-content-heading">
                    {subCategory.processTitle || "Nasıl Çalışıyoruz?"}
                  </h3>
                  <ul className="article-list">
                    {subCategory.processSteps.map((step, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={18} className="list-icon" />
                        <span>
                          <strong>{step.title}:</strong> {step.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </article>
        </div>

        {/* HİZMET LİSTESİ */}
        <div className="subcat-services-section">
          <div className="subcat-list-header">
            <Sparkles size={18} color="var(--hexa-accent)" />
            <span>
              Bu Kategorideki Hizmetlerimiz ({subCategory.items.length})
            </span>
          </div>

          <div className="subcat-sleek-list">
            {subCategory.items.map((item, index) => (
              <div
                key={item.slug}
                className="sleek-list-row"
                onClick={() =>
                  router.push(`/hizmetler/${subCategorySlug}/${item.slug}`)
                }
              >
                <div className="sleek-row-left">
                  <span className="sleek-row-index">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <div className="sleek-row-texts">
                    <h3>{item.name}</h3>
                    <p>{item.introText || item.description}</p>
                  </div>
                </div>

                <div className="sleek-row-right">
                  <span className="sleek-view-link">
                    İncele <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CtaSection />
      <SectoralPanel />
    </div>
  );
};

export default SubCategoryDetail;
