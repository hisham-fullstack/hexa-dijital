"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  Clock,
  Coffee,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { assetUrl } from "@/utils/formatters";
import CtaSection from "@/components/ui/CtaSection";
import SectoralPanel from "@/components/sections/Home/SectoralPanel";
import "./SubCategoryDetail.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const SubCategoryDetail = ({ subCategory, category, subCategorySlug }) => {
  const router = useTransitionRouter();
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [subCategorySlug]);

  useIsomorphicLayoutEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(
        [
          ".subcat-top-nav",
          ".subcat-hero-heading",
          ".subcat-hero-subtext",
          ".subcat-quick-stat",
        ],
        { autoAlpha: 0 },
      );

      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      heroTl
        .to(".subcat-top-nav", {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          startAt: { y: -20 },
        })
        .to(
          ".subcat-hero-heading",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            startAt: { y: 30 },
          },
          "-=0.4",
        )
        .to(
          ".subcat-hero-subtext",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            startAt: { y: 20 },
          },
          "-=0.5",
        )
        .to(
          ".subcat-quick-stat",
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            startAt: { scale: 0.9, y: 15 },
          },
          "-=0.4",
        );

      const articleSections = gsap.utils.toArray(".subcat-article-section");
      articleSections.forEach((sec) => {
        const kicker = sec.querySelector(".subcat-section-kicker");
        const title = sec.querySelector(".subcat-article-title");
        const desc = sec.querySelector(".subcat-article-p");

        const secTl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });

        if (kicker) {
          secTl.fromTo(
            kicker,
            { autoAlpha: 0, x: -20 },
            { autoAlpha: 1, x: 0, duration: 0.5 },
          );
        }
        if (title) {
          secTl.fromTo(
            title,
            { autoAlpha: 0, y: 25 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
            "-=0.3",
          );
        }
        if (desc) {
          secTl.fromTo(
            desc,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
            "-=0.4",
          );
        }
      });

      if (document.querySelector(".subcat-editorial-quote")) {
        gsap.fromTo(
          ".subcat-editorial-quote",
          { autoAlpha: 0, x: -30 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".subcat-editorial-quote",
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      if (document.querySelector(".subcat-process-cards-grid")) {
        gsap.fromTo(
          ".subcat-step-card",
          { autoAlpha: 0, y: 35 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".subcat-process-cards-grid",
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      gsap.fromTo(
        ".subcat-sidebar-sticky",
        { autoAlpha: 0, x: 30 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".subcat-editorial-layout",
            start: "top 80%",
            once: true,
          },
        },
      );

      if (document.querySelector(".subcat-bento-header")) {
        gsap.fromTo(
          [
            ".subcat-bento-header .subcat-section-kicker",
            ".subcat-bento-heading",
          ],
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".subcat-bento-header",
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      gsap.fromTo(
        ".subcat-bento-card",
        { autoAlpha: 0, y: 35, scale: 0.97 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".subcat-bento-grid",
            start: "top 85%",
            once: true,
          },
        },
      );
    }, pageRef);

    return () => ctx.revert();
  }, [subCategorySlug]);

  if (!subCategory || !category) {
    return (
      <div className="error-screen">
        <h3>Hizmet kategorisi bulunamadı.</h3>
        <Link href="/hizmetler">Hizmetlere Dön</Link>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Merhaba Hexa Dijital, "${subCategory.title}" paketiniz hakkında bilgi ve işletmeme özel teklif almak istiyorum.`,
  );
  const whatsappUrl = `https://wa.me/905537161958?text=${whatsappMessage}`;

  return (
    <div className="hexa-subcat-page" ref={pageRef}>
      {/* 1. LÜKS HERO ALANI */}
      <section className="subcat-hero-section">
        <div className="subcat-hero-bg">
          <img src={assetUrl(subCategory.image)} alt={subCategory.title} />
          <div className="subcat-hero-overlay" />
        </div>

        <div className="container subcat-hero-container">
          <div className="subcat-top-nav">
            <Link href="/hizmetler" className="subcat-back-btn">
              <ChevronLeft size={16} /> Tüm Hizmetlerimiz
            </Link>
            <span className="subcat-hero-badge">
              <Sparkles size={13} /> {category.title}
            </span>
          </div>

          <div className="subcat-hero-text">
            <h1 className="subcat-hero-heading">{subCategory.title}</h1>
            {subCategory.introText && (
              <p className="subcat-hero-subtext">{subCategory.introText}</p>
            )}
          </div>

          <div className="subcat-quick-stats-row">
            <div className="subcat-quick-stat">
              <Clock size={16} className="text-cyan" />
              <span>3 - 7 Günde Anahtar Teslim</span>
            </div>
            <div className="subcat-quick-stat">
              <Coffee size={16} className="text-cyan" />
              <span>Bursa İçi Yüz Yüze Görüşme</span>
            </div>
            <div className="subcat-quick-stat">
              <ShieldCheck size={16} className="text-cyan" />
              <span>Sürpriz Ekstra Maliyet Yok</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EDİTORYAL DÜZEN & STICKY DANIŞMANLIK */}
      <div className="container">
        <div className="subcat-editorial-layout">
          <article className="subcat-editorial-article">
            <div className="subcat-article-section">
              <span className="subcat-section-kicker">NEDEN GEREKLİ?</span>
              <h2 className="subcat-article-title">
                {subCategory.descriptionTitle ||
                  "İşletmeniz İçin Neden Kritik Bir Yatırım?"}
              </h2>
              <p className="subcat-article-p">{subCategory.description}</p>
            </div>

            {subCategory.blockquote && (
              <blockquote className="subcat-editorial-quote">
                "{subCategory.blockquote}"
              </blockquote>
            )}

            {subCategory.processSteps &&
              subCategory.processSteps.length > 0 && (
                <div className="subcat-article-section">
                  <span className="subcat-section-kicker">ÇALIŞMA DÜZENİ</span>
                  <h3
                    className="subcat-article-title"
                    style={{ fontSize: "1.6rem" }}
                  >
                    Nasıl Çalışıyoruz?
                  </h3>
                  <div className="subcat-process-cards-grid">
                    {subCategory.processSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="subcat-step-card global-glass-card"
                      >
                        <div className="step-num">0{idx + 1}</div>
                        <h4>{step.title}</h4>
                        <p>{step.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </article>

          {/* SAĞ: STICKY DANIŞMANLIK KUTUSU */}
          <aside className="subcat-sidebar-sticky">
            <div className="subcat-sidebar-card global-glass-card">
              <div className="subcat-trust-badge">
                <ShieldCheck size={16} />
                <span>Doğrudan Çözüm Ortağınız</span>
              </div>

              <h2 className="subcat-sidebar-title">
                {subCategory.sloganMain} <br />
                <span className="text-cyan">{subCategory.sloganHighlight}</span>
              </h2>

              <p className="subcat-sidebar-lead">
                İşletmenizin ihtiyacına uygun paketi ve yol haritasını net bir
                şekilde belirleyelim.
              </p>

              <div className="subcat-sidebar-perks">
                <div className="subcat-perk-item">
                  <Check size={15} className="text-cyan" />
                  <span>3 - 7 Günde Eksiksiz Teslim</span>
                </div>
                <div className="subcat-perk-item">
                  <Check size={15} className="text-cyan" />
                  <span>Sürpriz Ekstra Fatura Yok</span>
                </div>
                <div className="subcat-perk-item">
                  <Check size={15} className="text-cyan" />
                  <span>Bursa İçi Yüz Yüze Destek</span>
                </div>
              </div>

              <div className="subcat-sidebar-actions">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="subcat-primary-action-btn"
                >
                  <FaWhatsapp size={18} />
                  <span>WhatsApp'tan Yazın</span>
                </a>

                <Link href="/iletisim" className="subcat-secondary-action-btn">
                  <span>Teklif Alın</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* 3. İNTERAKTİF BENTO HİZMET KARTLARI (TAM BOY CAM KAPLAMA) */}
        <div className="subcat-bento-section">
          <div className="subcat-bento-header">
            <span className="subcat-section-kicker">HİZMET LİSTESİ</span>
            <h2 className="subcat-bento-heading">
              Bu Kategorideki <span className="text-glow">Çözümlerimiz</span> (
              {subCategory.items.length})
            </h2>
          </div>

          <div className="subcat-bento-grid">
            {subCategory.items.map((item, index) => (
              <div
                key={item.slug}
                className="subcat-bento-card"
                onClick={() =>
                  router.push(`/hizmetler/${subCategorySlug}/${item.slug}`)
                }
              >
                {/* 1. Katman: Tam Boy Arka Plan */}
                <div
                  className="subcat-card-bg-layer"
                  style={{
                    backgroundImage: `url(${assetUrl(
                      item.image ||
                        subCategory.image ||
                        "/assets/servicess/web.webp",
                    )})`,
                  }}
                />

                {/* 2. Katman: Kesintisiz %100 Cam Karartma */}
                <div className="subcat-card-full-overlay" />

                {/* 3. Katman: İçerik */}
                <div className="subcat-card-content">
                  <div className="subcat-card-top">
                    <span className="subcat-card-idx">0{index + 1}</span>
                    <div className="subcat-card-arrow-circle">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  <div className="subcat-card-bottom">
                    <h3 className="subcat-card-title">{item.name}</h3>
                    <p className="subcat-card-desc">
                      {item.introText || item.description}
                    </p>

                    <span className="subcat-card-explore-btn">
                      Detayları ve Canlı Demoyu İncele <ArrowRight size={14} />
                    </span>
                  </div>
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
