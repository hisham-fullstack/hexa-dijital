"use client";

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import {
  Globe,
  ShoppingBag,
  Cpu,
  Search,
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { assetUrl } from "@/utils/formatters";
import "./Header.css";

const serviceCategories = [
  {
    title: "Web Siteleri & Dijital Vitrin",
    count: "/ 5 hizmet",
    icon: <Globe size={18} strokeWidth={1.5} />,
    bgImage: "/assets/servicess/web.webp",
    href: "/hizmetler/web-siteleri-dijital-vitrin",
  },
  {
    title: "Satış & Sipariş Sistemleri",
    count: "/ 5 hizmet",
    icon: <ShoppingBag size={18} strokeWidth={1.5} />,
    bgImage: "/assets/servicess/subServicess/e-commerce.webp",
    href: "/hizmetler/satis-siparis-sistemleri",
  },
  {
    title: "Dükkan İçi Programlar & Kolaylıklar",
    count: "/ 5 hizmet",
    icon: <Cpu size={18} strokeWidth={1.5} />,
    bgImage: "/assets/servicess/subServicess/business_management_software.webp",
    href: "/hizmetler/dukkan-ici-programlar-kolayliklar",
  },
  {
    title: "Müşteri Çekme, Reklam & İtibar",
    count: "/ 5 hizmet",
    icon: <Search size={18} strokeWidth={1.5} />,
    bgImage: "/assets/servicess/subServicess/local_seo.webp",
    href: "/hizmetler/musteri-cekme-reklam-itibar",
  },
  {
    title: "Tasarım & Baskı İşleri",
    count: "/ 4 hizmet",
    icon: <Sparkles size={18} strokeWidth={1.5} />,
    bgImage: "/assets/servicess/brand_identity.webp",
    href: "/hizmetler/tasarim-baski-isleri",
  },
];

const availableLanguages = [
  { code: "tr", label: "TR", title: "Türkçe" },
  { code: "en", label: "EN", title: "English" },
  { code: "de", label: "DE", title: "Deutsch" },
  { code: "ar", label: "عربي", title: "العربية" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const { currentLang, changeLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  const islandRef = useRef(null);
  const menuContainerRef = useRef(null);
  const closeTimeout = useRef(null);
  const langDropdownRef = useRef(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Dil menüsü dışına tıklandığında kapatma
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target)
      ) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useLayoutEffect(() => {
    if (activeMenu && islandRef.current && menuContainerRef.current) {
      gsap.to(islandRef.current, {
        borderRadius: "24px",
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      });

      gsap.to(menuContainerRef.current, {
        height: "auto",
        duration: 0.5,
        ease: "power3.inOut",
        overwrite: "auto",
      });

      gsap.fromTo(
        ".menu-fade-item",
        { y: -15, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.4,
          stagger: 0.03,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    }
  }, [activeMenu]);

  const openMenuContainer = (menuType) => {
    clearTimeout(closeTimeout.current);
    if (activeMenu !== menuType) {
      setActiveMenu(menuType);
    }
  };

  const closeMenu = () => {
    if (document.querySelectorAll(".menu-fade-item").length > 0) {
      gsap.to(".menu-fade-item", {
        y: -10,
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.in",
        overwrite: "auto",
      });
    }

    if (menuContainerRef.current) {
      gsap.to(menuContainerRef.current, {
        height: 0,
        duration: 0.4,
        ease: "power3.inOut",
        overwrite: "auto",
        delay: 0.1,
      });
    }

    if (islandRef.current) {
      gsap.to(islandRef.current, {
        borderRadius: "100px",
        duration: 0.4,
        ease: "power3.inOut",
        overwrite: "auto",
        delay: 0.1,
      });
    }

    closeTimeout.current = setTimeout(() => {
      setActiveMenu(null);
    }, 450);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setTimeout(() => setMobileServicesOpen(false), 400);
  };

  const handleMouseLeave = () => {
    clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => {
      closeMenu();
    }, 200);
  };

  const handleLinkClick = () => {
    clearTimeout(closeTimeout.current);
    setActiveMenu(null);

    if (menuContainerRef.current && islandRef.current) {
      gsap.killTweensOf([
        menuContainerRef.current,
        islandRef.current,
        ".menu-fade-item",
      ]);

      gsap.to(".menu-fade-item", {
        autoAlpha: 0,
        y: -10,
        duration: 0.15,
      });

      gsap.to(menuContainerRef.current, {
        height: 0,
        duration: 0.2,
        ease: "power2.inOut",
      });

      gsap.to(islandRef.current, {
        borderRadius: "100px",
        duration: 0.2,
        ease: "power2.inOut",
      });
    }

    closeMobileMenu();
  };

  const isLightTheme =
    mounted &&
    (resolvedTheme === "light" || resolvedTheme === "theme-inverted");

  return (
    <header className={`modern-header ${scrolled ? "scrolled" : ""}`}>
      <div className={`nav-cinematic-overlay ${activeMenu ? "active" : ""}`} />

      {/* MOBİL MENÜ */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          <ul className="mobile-nav-list">
            <li style={{ "--delay": "0.1s" }}>
              <Link href="/" onClick={handleLinkClick}>
                {t("nav.home")}
              </Link>
            </li>

            <li style={{ "--delay": "0.2s" }} className="mobile-dropdown-item">
              <div
                className="mobile-dropdown-header"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              >
                <span>{t("nav.services")}</span>
                <ChevronDown
                  size={24}
                  className={`dropdown-icon ${mobileServicesOpen ? "open" : ""}`}
                />
              </div>
              <div
                className={`mobile-dropdown-body ${mobileServicesOpen ? "open" : ""}`}
              >
                {serviceCategories.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={handleLinkClick}
                    className="mobile-sub-link"
                  >
                    <span className="mobile-sub-icon">{item.icon}</span>
                    {item.title}
                  </Link>
                ))}
              </div>
            </li>

            <li style={{ "--delay": "0.3s" }}>
              <Link href="/sektorel-cozumler" onClick={handleLinkClick}>
                {t("nav.sectoral")}
              </Link>
            </li>
            <li style={{ "--delay": "0.4s" }}>
              <Link href="/projeler" onClick={handleLinkClick}>
                {t("nav.projects")}
              </Link>
            </li>
            <li style={{ "--delay": "0.5s" }}>
              <Link href="/iletisim" onClick={handleLinkClick}>
                {t("nav.contact")}
              </Link>
            </li>
          </ul>

          {/* Mobilde Dil Seçimi Butonları */}
          <div className="mobile-lang-row">
            {availableLanguages.map((l) => (
              <button
                key={l.code}
                type="button"
                className={`mobile-lang-pill ${currentLang === l.code ? "active" : ""}`}
                onClick={() => {
                  changeLanguage(l.code);
                  closeMobileMenu();
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="header-container">
        {/* LOGO */}
        <div className="logo-box">
          <Link href="/" onClick={handleLinkClick}>
            <img
              src={assetUrl("/assets/logos/hexa_logo.svg")}
              alt="Hexa Logo"
              className="hexa-svg-logo"
            />
          </Link>
        </div>

        {/* ORTA MENÜ ADASI */}
        <div className="center-nav-wrapper">
          <nav
            className="nav-island"
            ref={islandRef}
            onMouseLeave={handleMouseLeave}
          >
            <ul className="nav-links">
              <li onMouseEnter={closeMenu}>
                <Link
                  href="/"
                  className={pathname === "/" ? "active-link" : ""}
                  onClick={handleLinkClick}
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li
                onMouseEnter={() => openMenuContainer("hizmetler")}
                className="has-mega"
              >
                <Link
                  href="/hizmetler"
                  className={
                    pathname?.startsWith("/hizmetler") ||
                    activeMenu === "hizmetler"
                      ? "active-link"
                      : ""
                  }
                  onClick={handleLinkClick}
                >
                  {t("nav.services")}
                </Link>
              </li>

              <li onMouseEnter={closeMenu}>
                <Link
                  href="/sektorel-cozumler"
                  className={
                    pathname?.startsWith("/sektorel") ? "active-link" : ""
                  }
                  onClick={handleLinkClick}
                >
                  {t("nav.sectoral")}
                </Link>
              </li>

              <li onMouseEnter={closeMenu}>
                <Link
                  href="/projeler"
                  className={pathname === "/projeler" ? "active-link" : ""}
                  onClick={handleLinkClick}
                >
                  {t("nav.projects")}
                </Link>
              </li>
              <li onMouseEnter={closeMenu}>
                <Link
                  href="/iletisim"
                  className={pathname === "/iletisim" ? "active-link" : ""}
                  onClick={handleLinkClick}
                >
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>

            {/* AÇILIR MEGA MENÜ */}
            <div className="mega-menu-container" ref={menuContainerRef}>
              <div className="mega-menu-inner">
                {activeMenu === "hizmetler" && (
                  <div className="mega-menu-section">
                    <div className="mega-menu-grid">
                      {serviceCategories.map((service, index) => (
                        <Link
                          className="bento-item menu-fade-item"
                          key={index}
                          href={service.href}
                          onClick={handleLinkClick}
                        >
                          <div
                            className="bento-bg"
                            style={{
                              backgroundImage: `url(${assetUrl(service.bgImage)})`,
                            }}
                          />
                          <div className="bento-content">
                            <div className="bento-title">
                              <span className="icon">{service.icon}</span>
                              {service.title}
                            </div>
                            <span className="bento-count">{service.count}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>

        {/* SAĞ AKSİYON ALANI (DİL SEÇİCİ & TEMA & MOBİL MENÜ) */}
        <div className="header-action">
          {/* LÜKS DİL SEÇİM KAPSÜLÜ */}
          <div className="hexa-lang-selector-wrapper" ref={langDropdownRef}>
            <button
              type="button"
              className="hexa-lang-toggle-btn"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              aria-label="Dil Seçimi"
            >
              <Globe size={16} className="lang-globe-icon" />
              <span>{currentLang.toUpperCase()}</span>
              <ChevronDown
                size={13}
                className={`lang-chevron ${langMenuOpen ? "open" : ""}`}
              />
            </button>

            {langMenuOpen && (
              <div className="hexa-lang-dropdown-menu global-glass-card">
                {availableLanguages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    className={`lang-option-row ${
                      currentLang === item.code ? "active" : ""
                    }`}
                    onClick={() => {
                      changeLanguage(item.code);
                      setLangMenuOpen(false);
                    }}
                  >
                    <span className="lang-code-tag">{item.label}</span>
                    <span className="lang-full-title">{item.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* TEMA SEÇİCİ */}
          <button
            className={`hexa-theme-toggle ${isLightTheme ? "is-light" : ""}`}
            onClick={() => setTheme(isLightTheme ? "dark" : "light")}
            aria-label="Temayı Değiştir"
          >
            <div className="icon-wrapper sun-icon">
              <Sun size={20} strokeWidth={1.5} />
            </div>
            <div className="icon-wrapper moon-icon">
              <Moon size={20} strokeWidth={1.5} />
            </div>
          </button>

          {/* MOBİL BUTON */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menüyü Aç"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
