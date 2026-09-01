"use client";

import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  Check,
  XCircle,
  Coffee,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { projectsData } from "@/data/projectsData";
import { assetUrl } from "@/utils/formatters";
import CtaSection from "@/components/ui/CtaSection";
import SectoralPanel from "@/components/sections/Home/SectoralPanel";
import "./ServiceDetail.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const ServiceDetail = ({
  currentService,
  category,
  relatedServices = [],
  subCategorySlug,
}) => {
  const [openFaq, setOpenFaq] = useState(0);
  const [activeDemoTab, setActiveDemoTab] = useState(0);
  const [cinemaStage, setCinemaStage] = useState("idle");
  const cardContainerRef = useRef(null);
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCinemaStage("idle");
    setActiveDemoTab(0);
  }, [currentService?.slug]);

  // FOUC (PARLAMA) ENGELLEYİCİ GSAP SİSTEMİ
  useIsomorphicLayoutEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(
        [
          ".hexa-sd-top-nav",
          ".sd-hero-heading",
          ".sd-hero-description",
          ".quick-stat-item",
        ],
        { autoAlpha: 0 },
      );

      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      heroTl
        .to(".hexa-sd-top-nav", {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          startAt: { y: -20 },
        })
        .to(
          ".sd-hero-heading",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            startAt: { y: 35 },
          },
          "-=0.4",
        )
        .to(
          ".sd-hero-description",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            startAt: { y: 25 },
          },
          "-=0.5",
        )
        .to(
          ".quick-stat-item",
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            startAt: { scale: 0.85, y: 15 },
          },
          "-=0.4",
        );

      const sections = gsap.utils.toArray(".sd-editorial-section");
      sections.forEach((sec) => {
        const kicker = sec.querySelector(".sd-section-kicker, .faq-header");
        const title = sec.querySelector(".sd-editorial-title");
        const desc = sec.querySelector(".sd-editorial-p");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });

        if (kicker) {
          tl.fromTo(
            kicker,
            { autoAlpha: 0, x: -20 },
            { autoAlpha: 1, x: 0, duration: 0.5 },
          );
        }
        if (title) {
          tl.fromTo(
            title,
            { autoAlpha: 0, y: 25 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
            "-=0.3",
          );
        }
        if (desc) {
          tl.fromTo(
            desc,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
            "-=0.4",
          );
        }
      });

      gsap.fromTo(
        ".pain-card-clean",
        { autoAlpha: 0, y: 35 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".sd-pain-breakdown-grid",
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".deliverable-row",
        { autoAlpha: 0, x: -20 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".sd-deliverables-clean-list",
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".timeline-step-item",
        { autoAlpha: 0, y: 35 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".sd-timeline-cards",
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".comparison-card-split",
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".sd-comparison-matrix",
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".faq-item",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-accordion-list",
            start: "top 88%",
            once: true,
          },
        },
      );

      if (document.querySelector(".sd-pure-live-showcase-section")) {
        const liveTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".sd-pure-live-showcase-section",
            start: "top 80%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });

        liveTl
          .fromTo(
            ".sd-pure-live-showcase-section .sd-section-kicker",
            { autoAlpha: 0, x: -20 },
            { autoAlpha: 1, x: 0, duration: 0.5 },
          )
          .fromTo(
            ".sd-showcase-heading",
            { autoAlpha: 0, y: 25 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
            "-=0.3",
          )
          .fromTo(
            ".sd-live-pulse-badge",
            { autoAlpha: 0, scale: 0.8 },
            { autoAlpha: 1, scale: 1, duration: 0.4 },
            "-=0.4",
          )
          .fromTo(
            ".sd-showcase-lead-desc",
            { autoAlpha: 0, y: 15 },
            { autoAlpha: 1, y: 0, duration: 0.5 },
            "-=0.3",
          )
          .fromTo(
            ".sd-live-morphing-window",
            { autoAlpha: 0, y: 40, scale: 0.96 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.8 },
            "-=0.3",
          );
      }

      if (document.querySelector(".sd-showcase-section")) {
        gsap.fromTo(
          ".sd-showcase-section .sd-section-kicker, .sd-showcase-section .sd-section-title",
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".sd-showcase-section",
              start: "top 85%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          ".sd-logo-podium-card",
          { autoAlpha: 0, y: 30, scale: 0.9 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".sd-logos-podium-grid",
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      if (document.querySelector(".sd-related-projects-section")) {
        gsap.fromTo(
          ".sd-related-projects-section .sd-section-kicker, .sd-related-projects-section .sd-section-title",
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".sd-related-projects-section",
              start: "top 85%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          ".sd-project-card",
          { autoAlpha: 0, y: 35 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".sd-projects-grid",
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      if (document.querySelector(".hexa-sd-related-section")) {
        gsap.fromTo(
          ".related-section-title",
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".hexa-sd-related-section",
              start: "top 88%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          ".sleek-related-item",
          { autoAlpha: 0, y: 25 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".sleek-related-list",
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      gsap.fromTo(
        ".sidebar-sticky-box",
        { autoAlpha: 0, x: 30 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".hexa-sd-conversion-grid",
            start: "top 80%",
            once: true,
          },
        },
      );
    }, pageRef);

    return () => ctx.revert();
  }, [currentService?.slug]);

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

  const handleCinemaTrigger = () => {
    if (cinemaStage === "expanded") return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

    if (isMobile) {
      setCinemaStage("expanded");
      return;
    }

    setCinemaStage("focusing");

    let safetyTimer = setTimeout(() => {
      setCinemaStage("expanded");
    }, 500);

    if (cardContainerRef.current) {
      const rect = cardContainerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const targetOffset = -(viewportHeight - rect.height) / 2;

      if (window.lenis) {
        window.lenis.scrollTo(cardContainerRef.current, {
          offset: targetOffset,
          duration: 0.4,
          onComplete: () => {
            clearTimeout(safetyTimer);
            setCinemaStage("blooming");
            setTimeout(() => {
              setCinemaStage("expanded");
            }, 180);
          },
        });
      } else {
        window.scrollTo({
          top: window.scrollY + rect.top + targetOffset,
          behavior: "smooth",
        });
        clearTimeout(safetyTimer);
        setTimeout(() => {
          setCinemaStage("blooming");
          setTimeout(() => {
            setCinemaStage("expanded");
          }, 180);
        }, 250);
      }
    }
  };

  return (
    <div className="hexa-sd-page" ref={pageRef}>
      {/* 1. HERO BÖLÜMÜ */}
      <section className="hexa-sd-hero-section">
        <div className="hexa-sd-hero-bg">
          <img
            src={assetUrl(
              currentService.image ||
                category?.bgImage ||
                "/assets/servicess/web.webp",
            )}
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

          <div className="sd-hero-quick-stats">
            <div className="quick-stat-item">
              <Clock size={16} className="text-cyan" />
              <span>3 - 7 Günde Teslim</span>
            </div>
            <div className="quick-stat-item">
              <Coffee size={16} className="text-cyan" />
              <span>Bursa İçi Yüz Yüze Görüşme</span>
            </div>
            <div className="quick-stat-item">
              <ShieldCheck size={16} className="text-cyan" />
              <span>Sürpriz Ekstra Masraf Yok</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ANA DÖNÜŞÜM DÜZENİ */}
      <div className="container">
        <div className="hexa-sd-conversion-grid">
          {/* SOL: EDİTORYAL MAKALE VE İKNA AKIŞI */}
          <article className="hexa-sd-main-article">
            {/* 2.1 MEVCUT DURUM VE GÖRÜNMEYEN ZARAR */}
            <div className="sd-editorial-section">
              <span className="sd-section-kicker">GERÇEK DURUM ANALİZİ</span>
              <h2 className="sd-editorial-title">
                Eski veya Yavaş Bir Sistemle <br />
                <span className="text-glow">Neler Kaybediyorsunuz?</span>
              </h2>
              <p className="sd-editorial-p">
                {currentService.painPointText ||
                  "Müşterileriniz firmanızı internette aradığında ya da bir tavsiye üzerine sitenize girdiğinde; açılmayan, telefonda dağılan veya karmaşık bir ekranla karşılaştığı an aramaktan vazgeçer. O an kaçan müşteri, doğrudan rakibinize gider."}
              </p>

              <div className="sd-pain-breakdown-grid">
                <div className="pain-card-clean">
                  <div className="pain-card-number">01</div>
                  <h4>Hazır Müşteriyi Kaçırma</h4>
                  <p>
                    Sosyal medyadan veya tavsiyeyle gelen kişi 3 saniye içinde
                    aradığını bulamazsa hemen sayfayı kapatıp rakibi arar.
                  </p>
                </div>

                <div className="pain-card-clean">
                  <div className="pain-card-number">02</div>
                  <h4>Haksız Fiyat Pazarlığı</h4>
                  <p>
                    İşinizi ne kadar kaliteli yaparsanız yapın, internetteki
                    amatör görünüm müşteride "küçük işletme" algısı yaratır ve
                    fiyat kırdırır.
                  </p>
                </div>

                <div className="pain-card-clean">
                  <div className="pain-card-number">03</div>
                  <h4>Telefon ve Mesaj Yorgunluğu</h4>
                  <p>
                    Fiyatı, menüyü veya adresi tek tek WhatsApp'tan yazarak
                    anlatmaya çalışırken asıl işinize ve üretiminize vakit
                    kalmaz.
                  </p>
                </div>
              </div>
            </div>

            {/* 2.2 ÇÖZÜMÜMÜZ VE KAZANILACAKLAR */}
            <div className="sd-editorial-section">
              <span className="sd-section-kicker">HEXA ÇÖZÜM STANDARDI</span>
              <h2 className="sd-editorial-title">İşinizi Büyüten Net Çözüm</h2>
              <p className="sd-editorial-p">{currentService.description}</p>

              {currentService.deliverables && (
                <div className="sd-deliverables-clean-list">
                  <h3 className="deliverables-subheading">
                    Bu Pakette Size Teslim Edeceklerimiz:
                  </h3>
                  <div className="deliverables-columns">
                    {currentService.deliverables.map((item, idx) => (
                      <div key={idx} className="deliverable-row">
                        <div className="check-bullet">
                          <Check size={16} strokeWidth={2.5} />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 2.3 SÜREÇ NASIL İŞLİYOR? (3 ADIMLI ZAHMETSİZ YOLCULUK) */}
            <div className="sd-editorial-section">
              <span className="sd-section-kicker">ÇALIŞMA DÜZENİ</span>
              <h2 className="sd-editorial-title">
                Sizi Teknik Detaylarla Yormuyoruz.
              </h2>
              <p className="sd-editorial-p">
                Yazılım veya tasarım terimlerini bilmek zorunda değilsiniz.
                Süreci tamamen anahtar teslim ve şeffaf yönetiyoruz:
              </p>

              <div className="sd-timeline-cards">
                <div className="timeline-step-item">
                  <div className="step-badge">1. ADIM</div>
                  <h4>Kahvenizi İçerken Dinliyoruz</h4>
                  <p>
                    İhtiyacınızı, ürünlerinizi ve hedef kitlenizi yerinde
                    inceliyor; neye ihtiyacınız olduğunu netleştiriyoruz.
                  </p>
                </div>

                <div className="timeline-step-item">
                  <div className="step-badge">2. ADIM</div>
                  <h4>3 Günde Canlı Önizleme</h4>
                  <p>
                    Tasarımı hazırlayıp bizzat telefonunuzda çalışan halini
                    onayınıza sunuyoruz. Beğenmediğiniz yerleri düzeltiyoruz.
                  </p>
                </div>

                <div className="timeline-step-item">
                  <div className="step-badge">3. ADIM</div>
                  <h4>Eksiksiz Yayına Alma</h4>
                  <p>
                    Google kayıtları, harita konumu ve WhatsApp butonları
                    bağlanmış olarak anahtar teslim kullanımınıza açıyoruz.
                  </p>
                </div>
              </div>
            </div>

            {/* 2.4 PİYASA İŞİ VS. HEXA STANDARDI */}
            {currentService.comparison && (
              <div className="sd-editorial-section">
                <span className="sd-section-kicker">FARKIMIZ</span>
                <h2 className="sd-editorial-title">
                  Neden Sıradan Şablon Değil?
                </h2>

                <div className="sd-comparison-matrix">
                  {currentService.comparison.map((row, idx) => (
                    <div key={idx} className="comparison-card-split">
                      <div className="comp-side bad-side">
                        <div className="side-title">
                          <XCircle size={16} />
                          <span>Piyasadaki Sıradan Yaklaşım</span>
                        </div>
                        <p>{row.others}</p>
                      </div>

                      <div className="comp-side good-side">
                        <div className="side-title">
                          <CheckCircle2 size={16} />
                          <span>Hexa Standartları</span>
                        </div>
                        <p>{row.hexa}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2.5 S.S.S. (AKICI ANİMASYONLU AÇILIR KUTULAR) */}
            <div className="sd-editorial-section">
              <div className="faq-header">
                <HelpCircle size={22} className="text-cyan" />
                <h2 className="sd-editorial-title" style={{ margin: 0 }}>
                  Aklınıza Takılabilecek Sorular
                </h2>
              </div>
              <div className="faq-accordion-list">
                {(
                  currentService.faqs || [
                    {
                      q: "İş ne kadar sürede tamamlanır ve teslim edilir?",
                      a: "Gerekli bilgileri ve fotoğrafları aldıktan sonra genellikle 3 ila 7 iş günü içinde tüm kurulum, test ve Google kayıtlarını tamamlayarak anahtar teslim kullanımınıza açıyoruz.",
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
                    className={`faq-item global-glass-card ${
                      openFaq === fIdx ? "open" : ""
                    }`}
                    onClick={() => setOpenFaq(openFaq === fIdx ? -1 : fIdx)}
                  >
                    <div className="faq-question">
                      <span>{faq.q}</span>
                      <ChevronDown size={18} className="faq-chevron" />
                    </div>
                    <AnimatePresence initial={false}>
                      {openFaq === fIdx && (
                        <motion.div
                          key="faq-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.25, delay: 0.05 },
                          }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="faq-answer">
                            <p>{faq.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* SAĞ: STICKY DANIŞMANLIK & İLETİŞİM BLOKU */}
          <aside className="hexa-sd-sidebar">
            <div className="sidebar-sticky-box global-glass-card">
              <div className="action-trust-badge">
                <ShieldCheck size={16} />
                <span>Doğrudan Çözüm Ortağınız</span>
              </div>

              <h2 className="sidebar-action-title">
                {currentService.sloganMain} <br />
                <span className="text-cyan">
                  {currentService.sloganHighlight}
                </span>
              </h2>

              <p className="sidebar-main-lead">
                İşletmenizin ihtiyacına uygun paketi ve yol haritasını net bir
                şekilde belirleyelim.
              </p>

              <div className="action-perks-list">
                <div className="perk-row">
                  <Check size={15} className="text-cyan" />
                  <span>3 - 7 Günde Eksiksiz Teslim</span>
                </div>
                <div className="perk-row">
                  <Check size={15} className="text-cyan" />
                  <span>Sürpriz Ekstra Fatura Yok</span>
                </div>
                <div className="perk-row">
                  <Check size={15} className="text-cyan" />
                  <span>Bursa İçi Yüz Yüze Destek</span>
                </div>
              </div>

              <div className="sidebar-action-buttons-inline">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sd-btn-inline-primary"
                >
                  <FaWhatsapp size={18} />
                  <span>WhatsApp'tan Yazın</span>
                </a>

                <Link href="/iletisim" className="sd-btn-inline-secondary">
                  <span>Teklif Alın</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              <span className="sidebar-sub-note">
                Dilerseniz Bursa'daki işletmenizi ziyaret ediyor, kahvenizi
                içerken detayları konuşuyoruz.
              </span>
            </div>
          </aside>
        </div>
      </div>

      {/* 3. CANLI SİNEMATİK SAHNE */}
      {activeLiveDemo && (
        <section className="sd-pure-live-showcase-section">
          <div className="container">
            <div className="sd-showcase-top-header">
              <span className="sd-section-kicker">CANLI TEST ALANI</span>
              <div className="sd-showcase-title-row">
                <h2 className="sd-showcase-heading">
                  Yaptığımız Sitede{" "}
                  <span className="text-glow">Bizzat Gezinin</span>
                </h2>
                <div className="sd-live-pulse-badge">
                  <Radio size={14} className="live-pulse-icon" />
                  <span>Canlı Bağlantı Açık</span>
                </div>
              </div>
              <p className="sd-showcase-lead-desc">
                Aşağıdaki pencere bir resim değildir;{" "}
                <strong>birebir çalışan gerçek web sitesidir</strong>. Üzerine
                dokunarak telefonunuzda test edin.
              </p>
            </div>

            {currentService.liveDemos.length > 1 && (
              <div className="sd-demo-tabs-nav">
                {currentService.liveDemos.map((demo, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`sd-demo-tab-btn ${
                      activeDemoTab === idx ? "active" : ""
                    }`}
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

            <div ref={cardContainerRef} className="sd-cinema-anchor-box">
              <div
                className={`sd-cinema-energy-bloom ${
                  cinemaStage === "blooming" || cinemaStage === "focusing"
                    ? "active"
                    : ""
                }`}
              />

              <div
                className={`sd-live-morphing-window global-glass-card ${
                  cinemaStage === "focusing" ? "is-focusing" : ""
                }`}
                onClick={handleCinemaTrigger}
              >
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
                      <span>Tam Ekranda Gezin</span>
                    </div>
                  </div>
                </div>

                <div className="sd-morph-iframe-holder">
                  <div className="sd-in-place-trigger-overlay">
                    <div className="sd-interactive-trigger-pill">
                      <Smartphone
                        size={18}
                        className="text-cyan mobile-pill-icon"
                      />
                      <Maximize2
                        size={18}
                        className="text-cyan desktop-pill-icon"
                      />
                      <span>Siteyi Canlı Gezin & Test Edin</span>
                    </div>
                  </div>

                  <iframe
                    src={activeLiveDemo.url}
                    title={activeLiveDemo.title}
                    className="sd-morph-live-iframe"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                  />
                </div>

                <div className="sd-viewport-caption-bar">
                  <div className="caption-text-block">
                    <strong>{activeLiveDemo.title}:</strong>{" "}
                    {activeLiveDemo.caption}
                  </div>
                  <span className="caption-direct-btn">
                    Deneyimi Başlat <ArrowUpRight size={15} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. SİNEMATİK TAM EKRAN MODAL */}
      <AnimatePresence>
        {cinemaStage === "expanded" && activeLiveDemo && (
          <div className="sd-fullscreen-demo-overlay">
            <motion.div
              className="sd-cinema-backdrop-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setCinemaStage("idle")}
            />

            <motion.div
              className="sd-fullscreen-modal-window"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
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
                    aria-label="Kapat"
                  >
                    <X size={18} />
                    <span>Kapat</span>
                  </button>
                </div>
              </div>

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
        {currentService.showcaseLogos &&
          currentService.showcaseLogos.length > 0 && (
            <section className="sd-showcase-section">
              <div className="sd-section-header">
                <span className="sd-section-kicker">REFERANSLARIMIZ</span>
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
                      <img src={assetUrl(item.logo)} alt={item.name} />
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

        {relatedProjects.length > 0 && (
          <section className="sd-related-projects-section">
            <div className="sd-section-header">
              <span className="sd-section-kicker">VAKA ANALİZLERİ</span>
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
                    <img src={assetUrl(project.image)} alt={project.title} />
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
    </div>
  );
};

export default ServiceDetail;
