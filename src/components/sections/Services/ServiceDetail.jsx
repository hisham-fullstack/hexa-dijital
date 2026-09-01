"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Clock,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  Lock,
  Globe,
  Radio,
  Maximize2,
  X,
  Smartphone,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { projectsData } from "@/data/projectsData";
import CtaSection from "@/components/ui/CtaSection";
import SectoralPanel from "@/components/sections/Home/SectoralPanel";
import "./ServiceDetail.css";

const ServiceDetail = ({
  currentService,
  category,
  relatedServices = [],
  subCategorySlug,
}) => {
  const [openFaq, setOpenFaq] = useState(0);
  const [activeDemoTab, setActiveDemoTab] = useState(0);

  // Sinematik Aşama: 'idle' | 'focusing' | 'blooming' | 'expanded'
  const [cinemaStage, setCinemaStage] = useState("idle");
  const cardContainerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCinemaStage("idle");
  }, [currentService?.slug]);

  // ESC tuşuna basıldığında ve mobilde geri dönüldüğünde scroll akışını serbest bırakma
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && cinemaStage === "expanded") {
        setCinemaStage("idle");
      }
    };

    if (cinemaStage === "expanded") {
      document.body.style.overflow = "hidden";
      if (window.lenis) window.lenis.stop();
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      if (window.lenis) window.lenis.start();
    }

    return () => {
      document.body.style.overflow = "unset";
      if (window.lenis) window.lenis.start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cinemaStage]);

  if (!currentService) return null;

  const whatsappMessage = encodeURIComponent(
    `Merhaba Hexa Dijital, "${currentService.name}" hizmetiniz hakkında işletmeme özel bilgi ve net bir teklif almak istiyorum.`,
  );
  const whatsappUrl = `https://wa.me/905537161958?text=${whatsappMessage}`;

  const relatedProjects = projectsData.filter((p) =>
    currentService.relatedProjects?.includes(p.id),
  );

  const activeLiveDemo =
    currentService.liveDemos && currentService.liveDemos.length > 0
      ? currentService.liveDemos[activeDemoTab]
      : null;

  // MOBİL VE MASAÜSTÜ İÇİN ORTAK SİNEMATİK MERKEZLEME
  const handleCinemaTrigger = () => {
    if (cinemaStage !== "idle") return;

    setCinemaStage("focusing");

    if (cardContainerRef.current) {
      const rect = cardContainerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const targetOffset = -(viewportHeight - rect.height) / 2;

      if (window.lenis) {
        window.lenis.scrollTo(cardContainerRef.current, {
          offset: targetOffset,
          duration: 0.6,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          onComplete: () => {
            setCinemaStage("blooming");
            setTimeout(() => {
              setCinemaStage("expanded");
            }, 280);
          },
        });
      } else {
        const currentScroll = window.scrollY || window.pageYOffset;
        window.scrollTo({
          top: currentScroll + rect.top + targetOffset,
          behavior: "smooth",
        });

        setTimeout(() => {
          setCinemaStage("blooming");
          setTimeout(() => {
            setCinemaStage("expanded");
          }, 280);
        }, 450);
      }
    }
  };

  return (
    <div className="hexa-sd-page">
      {/* 1. HERO BÖLÜMÜ */}
      <section className="hexa-sd-hero-section">
        <div className="hexa-sd-hero-bg">
          <img
            src={
              currentService.image ||
              category?.bgImage ||
              "/assets/servicess/web.webp"
            }
            alt={currentService.name}
          />
          <div className="hexa-sd-hero-overlay" />
        </div>

        <div className="container hexa-sd-hero-container">
          <div className="hexa-sd-top-nav">
            <Link href="/hizmetler" className="hexa-sd-back-btn">
              <ChevronLeft size={16} /> Tüm Hizmetlerimiz
            </Link>
            <span className="sd-hero-badge">
              <Sparkles size={13} /> {category?.title || "Hizmet Alanı"}
            </span>
          </div>

          <div className="hexa-sd-hero-text">
            <h1 className="sd-hero-heading">
              {currentService.heroTitle1 || currentService.name}
            </h1>
            <p className="sd-hero-description">{currentService.introText}</p>
          </div>
        </div>
      </section>

      {/* 2. DÖNÜŞÜM & İÇERİK BÖLÜMÜ */}
      <div className="container">
        <div className="hexa-sd-conversion-grid">
          {/* SOL: MAKALE, ACI NOKTALARI, SSS */}
          <article className="hexa-sd-main-article">
            {/* ACI NOKTASI KUTUSU */}
            <div className="sd-pain-box global-glass-card">
              <div className="pain-header">
                <AlertTriangle className="pain-icon" size={22} />
                <h3>Bu Durumu Ertelediğinizde Neler Oluyor?</h3>
              </div>
              <p className="pain-desc">
                {currentService.painPointText ||
                  "Müşterileriniz sizi aradığında yavaş açılan, telefonda dağınık duran veya Google'da bulunamayan bir işletmeyle karşılaştığında aramaktan vazgeçip doğrudan rakibinize gidiyor."}
              </p>
              <div className="pain-consequences">
                <div className="consequence-item">
                  <span className="consequence-title">Kaçan Müşteriler</span>
                  <span className="consequence-desc">
                    Sitenizden veya sosyal medyanızdan bilgi alamayıp başka
                    firmayı arayan potansiyel müşteriler.
                  </span>
                </div>
                <div className="consequence-item">
                  <span className="consequence-title">Fiyat Pazarlığı</span>
                  <span className="consequence-desc">
                    Amatör kurumsal görünüm yüzünden kaliteli işinize rağmen
                    fiyat kırmak zorunda kalma.
                  </span>
                </div>
              </div>
            </div>

            {/* ÇÖZÜM */}
            <div className="sd-solution-box">
              <h2 className="sd-block-title">İşinizi Büyüten Çözümümüz</h2>
              <p className="sd-block-desc">{currentService.description}</p>
            </div>

            {/* TESLİMATLAR */}
            {currentService.deliverables && (
              <div className="sd-deliverables-box global-glass-card">
                <h3 className="deliverables-heading">Bu Pakette Neler Var?</h3>
                <div className="deliverables-grid">
                  {currentService.deliverables.map((item, idx) => (
                    <div key={idx} className="deliverable-item">
                      <CheckCircle2 size={18} className="deliverable-check" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* KIYASLAMA TABLOSU */}
            {currentService.comparison && (
              <div className="sd-comparison-box global-glass-card">
                <h3 className="comparison-heading">Neden Hexa Standartları?</h3>
                <div className="comparison-table">
                  {currentService.comparison.map((row, idx) => (
                    <div key={idx} className="comparison-row">
                      <div className="comp-col comp-feature">
                        <strong>{row.feature}</strong>
                      </div>
                      <div className="comp-col comp-others">
                        <span className="comp-badge bad">Sıradan Yaklaşım</span>
                        <p>{row.others}</p>
                      </div>
                      <div className="comp-col comp-hexa">
                        <span className="comp-badge good">Hexa Yaklaşımı</span>
                        <p>{row.hexa}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* S.S.S. */}
            <div className="sd-faq-section">
              <div className="faq-header">
                <HelpCircle size={22} className="text-cyan" />
                <h3 className="faq-main-title">
                  Aklınıza Takılabilecek Sorular
                </h3>
              </div>
              <div className="faq-accordion-list">
                {(
                  currentService.faqs || [
                    {
                      q: "İş ne kadar sürede tamamlanır ve teslim edilir?",
                      a: "Gerekli bilgileri ve görselleri aldıktan sonra genellikle 3 ila 7 iş günü içinde tüm kurulum, test ve Google kayıtlarını tamamlayarak anahtar teslim kullanımınıza açıyoruz.",
                    },
                    {
                      q: "Sonradan sürpriz bir masraf çıkar mı?",
                      a: "Kesinlikle hayır. Başta ne konuştuysak ve teklifte ne yazıyorsa geçerli olan odur. Gizli sunucu, bakım veya güncelleme faturaları çıkarılmaz.",
                    },
                    {
                      q: "Teknik bilgim yok, sonrasında sistemi nasıl yöneteceğim?",
                      a: "Tüm sistemlerimizi herkesin rahatça kullanabileceği basitlikte hazırlıyoruz. Teslimat sonrası telefonla ve birebir destek vererek her aşamada yanınızda oluyoruz.",
                    },
                  ]
                ).map((faq, fIdx) => (
                  <div
                    key={fIdx}
                    className={`faq-item global-glass-card ${openFaq === fIdx ? "open" : ""}`}
                    onClick={() => setOpenFaq(openFaq === fIdx ? -1 : fIdx)}
                  >
                    <div className="faq-question">
                      <span>{faq.q}</span>
                      <ChevronDown size={18} className="faq-chevron" />
                    </div>
                    {openFaq === fIdx && (
                      <div className="faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* SAĞ: TEMİZ VE KONTROLLÜ STICKY SIDEBAR */}
          <aside className="hexa-sd-sidebar">
            <div className="sidebar-sticky-box global-glass-card">
              <div className="action-trust-badge">
                <ShieldCheck size={16} />
                <span>Şeffaf Fiyatlandırma & Hızlı Teslim</span>
              </div>

              <h2 className="sidebar-action-title">
                {currentService.sloganMain} <br />
                <span className="global-text-dimmed">
                  {currentService.sloganHighlight}
                </span>
              </h2>

              <div className="action-perks-list">
                <div className="perk-row">
                  <Clock size={15} className="text-cyan" />
                  <span>3-7 Günde Eksiksiz Teslim</span>
                </div>
                <div className="perk-row">
                  <ShieldCheck size={15} className="text-cyan" />
                  <span>Sürpriz Ek Ücret Yok</span>
                </div>
              </div>

              <div className="sidebar-action-buttons-inline">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sd-btn-inline-primary"
                >
                  <FaWhatsapp size={17} />
                  <span>WhatsApp'tan Yazın</span>
                </a>

                <Link href="/iletisim" className="sd-btn-inline-secondary">
                  <span>Teklif İsteyin</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              <span className="sidebar-sub-note">
                Bursa içi işletmeleri dilerseniz yerinde ziyaret ediyor,
                kahvenizi içerken ihtiyacınızı netleştiriyoruz.
              </span>
            </div>
          </aside>
        </div>
      </div>

      {/* 3. CANLI SİNEMATİK SAHNE: MOBİL & MASAÜSTÜ BÜYÜME DENEYİMİ */}
      {activeLiveDemo && (
        <section className="sd-pure-live-showcase-section">
          <div className="container">
            <div className="sd-showcase-top-header">
              <div
                className="text-gradient-flow"
                style={{ marginBottom: "8px" }}
              >
                CANLI VE ETKİLEŞİMLİ VİTRİN
              </div>
              <div className="sd-showcase-title-row">
                <h2 className="sd-showcase-heading">
                  Yaptığımız Sitede{" "}
                  <span className="text-glow">Doğrudan Gezinin</span>
                </h2>
                <div className="sd-live-pulse-badge">
                  <Radio size={14} className="live-pulse-icon" />
                  <span>Canlı Bağlantı Hazır</span>
                </div>
              </div>
              <p className="sd-showcase-lead-desc">
                Aşağıdaki pencere bir resim değildir;{" "}
                <strong>birebir çalışan gerçek web sitesidir</strong>. Üzerine
                dokunduğunuzda gerçek bir kullanıcı deneyimi yaşayın.
              </p>
            </div>

            {/* SEKMELER */}
            {currentService.liveDemos.length > 1 && (
              <div className="sd-demo-tabs-nav">
                {currentService.liveDemos.map((demo, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`sd-demo-tab-btn ${activeDemoTab === idx ? "active" : ""}`}
                    onClick={() => {
                      setActiveDemoTab(idx);
                      setCinemaStage("idle");
                    }}
                  >
                    <Globe size={15} />
                    <span>{demo.title}</span>
                  </button>
                ))}
              </div>
            )}

            {/* SİNEMA ÇAPASI */}
            <div ref={cardContainerRef} className="sd-cinema-anchor-box">
              {/* ARKA PLANDA PATLAYAN NEON ENERJİ HALKASI */}
              <div
                className={`sd-cinema-energy-bloom ${
                  cinemaStage === "blooming" || cinemaStage === "focusing"
                    ? "active"
                    : ""
                }`}
              />

              {/* SAYFA İÇİNDEKİ CANLI PENCERE */}
              {cinemaStage !== "expanded" && (
                <motion.div
                  layoutId="live-browser-cinema-morph"
                  className={`sd-live-morphing-window global-glass-card ${
                    cinemaStage === "focusing" ? "is-focusing" : ""
                  }`}
                  onClick={handleCinemaTrigger}
                  transition={{
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* TARAYICI ÜST ÇUBUĞU */}
                  <div className="sd-browser-bar">
                    <div className="sd-browser-dots">
                      <span className="dot dot-red" />
                      <span className="dot dot-yellow" />
                      <span className="dot dot-green" />
                    </div>

                    <div className="sd-browser-address-bar">
                      <Lock size={12} className="sd-lock-icon" />
                      <span className="sd-address-url">
                        https://{activeLiveDemo.domain || "hexadijital.com"}
                      </span>
                    </div>

                    <div className="sd-browser-right-actions">
                      <div className="sd-browser-open-prompt">
                        <Maximize2 size={13} />
                        <span>
                          {cinemaStage === "focusing"
                            ? "Kilitleniyor..."
                            : "Tam Ekranda Büyüt"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BİZZAT CANLI ÇALIŞAN GERÇEK SİTE GÖVDESİ */}
                  <div className="sd-morph-iframe-holder">
                    <div className="sd-in-place-trigger-overlay">
                      <motion.div
                        className="sd-interactive-trigger-pill"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Smartphone
                          size={18}
                          className="text-cyan mobile-pill-icon"
                        />
                        <Maximize2
                          size={18}
                          className="text-cyan desktop-pill-icon"
                        />
                        <span>Siteyi Canlı Gezin & Test Edin</span>
                      </motion.div>
                    </div>

                    <iframe
                      src={activeLiveDemo.url}
                      title={activeLiveDemo.title}
                      className="sd-morph-live-iframe"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                    />
                  </div>

                  {/* ALT BİLGİ ŞERİDİ */}
                  <div className="sd-viewport-caption-bar">
                    <div className="caption-text-block">
                      <strong>{activeLiveDemo.title}:</strong>{" "}
                      {activeLiveDemo.caption}
                    </div>
                    <span className="caption-direct-btn">
                      Deneyimi Başlat <ArrowUpRight size={15} />
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 4. SİNEMATİK TAM EKRAN (MOBİLDE 100% EKRANI KAPLAYAN UYGULAMA MODU) */}
      <AnimatePresence>
        {cinemaStage === "expanded" && activeLiveDemo && (
          <div className="sd-fullscreen-demo-overlay">
            {/* SİNEMA ARKA PLAN FLULUĞU */}
            <motion.div
              className="sd-cinema-backdrop-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setCinemaStage("idle")}
            />

            {/* BİZZAT AYNI PENCERENİN TAM EKRANA DÖNÜŞMÜŞ HALİ */}
            <motion.div
              layoutId="live-browser-cinema-morph"
              className="sd-fullscreen-modal-window"
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* MODAL ÜST TARAYICI ÇUBUĞU */}
              <div className="sd-fullscreen-modal-header">
                <div className="sd-modal-left-info">
                  <div className="sd-browser-dots">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                  </div>

                  <div className="sd-modal-url-pill">
                    <Lock size={12} className="sd-lock-icon" />
                    <span>
                      https://{activeLiveDemo.domain || "hexadijital.com"}
                    </span>
                  </div>
                </div>

                <div className="sd-modal-actions-right">
                  <a
                    href={activeLiveDemo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sd-modal-newtab-btn"
                  >
                    <ExternalLink size={14} />
                    <span>Yeni Sekmede Aç</span>
                  </a>

                  <button
                    type="button"
                    className="sd-modal-close-btn"
                    onClick={() => setCinemaStage("idle")}
                    aria-label="Geri Dön"
                  >
                    <X size={18} />
                    <span>Geri Dön</span>
                  </button>
                </div>
              </div>

              {/* SAF CANLI SİTE (TAM EKRANDA TAMAMEN SERBEST GEZİNME) */}
              <div
                className="sd-fullscreen-iframe-container"
                data-lenis-prevent="true"
              >
                <iframe
                  src={activeLiveDemo.url}
                  title={activeLiveDemo.title}
                  className="sd-fullscreen-live-iframe"
                  loading="eager"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. LOGO & PROJELER & DİĞER HİZMETLER */}
      <div className="container">
        {/* LOGO ÇALIŞMALARI */}
        {currentService.showcaseLogos &&
          currentService.showcaseLogos.length > 0 && (
            <section className="sd-showcase-section">
              <div className="sd-section-header">
                <span className="text-gradient-flow">LOGO ÇALIŞMALARIMIZ</span>
                <h2 className="sd-section-title">
                  İşletmelere Kazandırdığımız{" "}
                  <span className="text-glow">Özgün Marka İmzaları</span>
                </h2>
              </div>

              <div className="sd-logos-podium-grid">
                {currentService.showcaseLogos.map((item, idx) => (
                  <div
                    key={idx}
                    className="sd-logo-podium-card global-glass-card"
                  >
                    <div className="podium-logo-wrap">
                      <img src={item.logo} alt={item.name} />
                    </div>
                    <div className="podium-info">
                      <span className="podium-brand-name">{item.name}</span>
                      <span className="podium-sector">{item.sector}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        {/* MÜŞTERİ VAKA ANALİZLERİ */}
        {relatedProjects.length > 0 && (
          <section className="sd-related-projects-section">
            <div className="sd-section-header">
              <span className="text-gradient-flow">VAKA ANALİZLERİ</span>
              <h2 className="sd-section-title">
                Birlikte Büyüdüğümüz{" "}
                <span className="text-glow">Müşteri Hikayeleri</span>
              </h2>
            </div>

            <div className="sd-projects-grid">
              {relatedProjects.map((project) => (
                <Link
                  href={`/projeler/${project.slug}`}
                  key={project.id}
                  className="sd-project-card global-glass-card"
                >
                  <div className="sd-project-img">
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className="sd-project-info">
                    <div>
                      <span className="sd-client-tag">{project.client}</span>
                      <h3 className="sd-project-name">{project.title}</h3>
                    </div>
                    <div className="sd-project-arrow">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* İLGİLİ DİĞER HİZMETLER */}
        {relatedServices.length > 0 && (
          <div className="hexa-sd-related-section">
            <h4 className="related-section-title">
              İşletmenizi Tamamlayacak Diğer Hizmetlerimiz
            </h4>
            <div className="sleek-related-list">
              {relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/hizmetler/${subCategorySlug}/${s.slug}`}
                  className="sleek-related-item global-glass-card"
                >
                  <span className="related-item-name">{s.name}</span>
                  <span className="related-item-arrow">
                    İncele <ArrowRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <CtaSection />
      <SectoralPanel />
    </div>
  );
};

export default ServiceDetail;
