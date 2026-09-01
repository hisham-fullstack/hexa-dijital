"use client";

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useTheme } from "next-themes";
import {
  Globe,
  ShoppingBag,
  Cpu,
  Sparkles,
  Search,
  Zap,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import "./Header.css";

const techMenuItems = [
  {
    title: "Web Siteleri",
    count: "/ 3 hizmet",
    icon: <Globe size={18} strokeWidth={1.5} />,
    bgImage: "/assets/servicess/web.webp",
    href: "/hizmetler/web-siteleri",
  },
  {
    title: "E-Ticaret & Satış Sistemleri",
    count: "/ 2 hizmet",
    icon: <ShoppingBag size={18} strokeWidth={1.5} />,
    bgImage: "/assets/servicess/subServicess/e-commerce.webp",
    href: "/hizmetler/e-ticaret-satis-sistemleri",
  },
  {
    title: "İşletme Otomasyonu & Yazılım",
    count: "/ 4 hizmet",
    icon: <Cpu size={18} strokeWidth={1.5} />,
    bgImage: "/assets/servicess/subServicess/business_management_software.webp",
    href: "/hizmetler/isletme-otomasyonu-yazilim",
  },
  {
    title: "Marka & Grafik Tasarım",
    count: "/ 3 hizmet",
    icon: <Sparkles size={18} strokeWidth={1.5} />,
    bgImage: "/assets/servicess/brand_identity.webp",
    href: "/hizmetler/marka-grafik-tasarim",
  },
  {
    title: "Sosyal Medya & Google",
    count: "/ 2 hizmet",
    icon: <Search size={18} strokeWidth={1.5} />,
    bgImage: "/assets/servicess/subServicess/local_seo.webp",
    href: "/hizmetler/sosyal-medya-google",
  },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const islandRef = useRef(null);
  const menuContainerRef = useRef(null);
  const closeTimeout = useRef(null);

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

      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          <ul className="mobile-nav-list">
            <li style={{ "--delay": "0.1s" }}>
              <Link href="/" onClick={handleLinkClick}>
                Ana Sayfa
              </Link>
            </li>

            <li style={{ "--delay": "0.2s" }} className="mobile-dropdown-item">
              <div
                className="mobile-dropdown-header"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              >
                <span>Hizmetler</span>
                <ChevronDown
                  size={24}
                  className={`dropdown-icon ${mobileServicesOpen ? "open" : ""}`}
                />
              </div>
              <div
                className={`mobile-dropdown-body ${mobileServicesOpen ? "open" : ""}`}
              >
                {techMenuItems.map((item, idx) => (
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
                Sektörel Çözümler
              </Link>
            </li>
            <li style={{ "--delay": "0.4s" }}>
              <Link href="/projeler" onClick={handleLinkClick}>
                Projeler
              </Link>
            </li>
            <li style={{ "--delay": "0.5s" }}>
              <Link href="/iletisim" onClick={handleLinkClick}>
                Tanışalım
              </Link>
            </li>
          </ul>

          <div className="mobile-menu-footer" style={{ "--delay": "0.6s" }}>
            <Link
              href="/iletisim"
              onClick={handleLinkClick}
              className="mobile-cta-link-wrapper"
            >
              <button className="hexa-premium-cta-btn mobile-full-btn">
                <Zap size={18} strokeWidth={2} className="cta-bolt-icon" />
                <span>Teklif & Görüşme</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="header-container">
        <div className="logo-box">
          <Link href="/" onClick={handleLinkClick}>
            <img
              src="/assets/logos/hexa_logo.svg"
              alt="Hexa Logo"
              className="hexa-svg-logo"
            />
          </Link>
        </div>

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
                  Ana Sayfa
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
                  Hizmetler
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
                  Sektörel Çözümler
                </Link>
              </li>

              <li onMouseEnter={closeMenu}>
                <Link
                  href="/projeler"
                  className={pathname === "/projeler" ? "active-link" : ""}
                  onClick={handleLinkClick}
                >
                  Projeler
                </Link>
              </li>
              <li onMouseEnter={closeMenu}>
                <Link
                  href="/iletisim"
                  className={pathname === "/iletisim" ? "active-link" : ""}
                  onClick={handleLinkClick}
                >
                  Tanışalım
                </Link>
              </li>
            </ul>

            <div className="mega-menu-container" ref={menuContainerRef}>
              <div className="mega-menu-inner">
                {activeMenu === "hizmetler" && (
                  <div className="mega-menu-section">
                    <div className="mega-menu-grid">
                      {techMenuItems.map((service, index) => (
                        <Link
                          className="bento-item menu-fade-item"
                          key={index}
                          href={service.href}
                          onClick={handleLinkClick}
                        >
                          <div
                            className="bento-bg"
                            style={{
                              backgroundImage: `url(${service.bgImage})`,
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

        <div className="header-action">
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

          <Link
            href="/iletisim"
            onClick={handleLinkClick}
            className="desktop-cta"
          >
            <button className="hexa-premium-cta-btn">
              <Zap size={18} strokeWidth={2} className="cta-bolt-icon" />
              <span>Teklif & Görüşme</span>
            </button>
          </Link>

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
