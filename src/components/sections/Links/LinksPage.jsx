"use client";

import React from "react";
import Link from "next/link";
import {
  Globe,
  Receipt,
  MapPin,
  ShoppingBag,
  Sparkles,
  Layers,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTiktok,
  FaPinterest,
  FaXTwitter,
} from "react-icons/fa6";
import { linksData } from "@/data/linksData";
import { assetUrl } from "@/utils/formatters";
import LightRays from "@/components/ui/LightRays";
import "./LinksPage.css";

const iconMap = {
  globe: <Globe size={16} strokeWidth={1.75} />,
  receipt: <Receipt size={16} strokeWidth={1.75} />,
  map: <MapPin size={16} strokeWidth={1.75} />,
  shopping: <ShoppingBag size={16} strokeWidth={1.75} />,
  sparkles: <Sparkles size={16} strokeWidth={1.75} />,
  layers: <Layers size={16} strokeWidth={1.75} />,
};

const socialIconMap = {
  instagram: <FaInstagram size={18} />,
  facebook: <FaFacebook size={18} />,
  youtube: <FaYoutube size={18} />,
  tiktok: <FaTiktok size={18} />,
  pinterest: <FaPinterest size={18} />,
  x: <FaXTwitter size={18} />,
};

const LinksPage = () => {
  const { profile, primaryAction, quickLinks, directContacts, socials } =
    linksData;

  const whatsappUrl = `https://wa.me/${primaryAction.phone}?text=${encodeURIComponent(
    primaryAction.message,
  )}`;

  return (
    <div className="hx-links-wrapper">
      {/* 1. NEON IŞIK HUZMELERİ */}
      <div className="hx-links-rays-bg">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffd1"
          raysSpeed={0.8}
          lightSpread={1.2}
          rayLength={2.5}
          followMouse={false}
          mouseInfluence={0}
        />
      </div>

      <div className="hx-links-container">
        {/* 2. PARLAK VEKTÖREL LOGO VE BAŞLIK */}
        <div className="hx-links-profile-clean">
          <div className="hx-logo-stage-clean">
            <div className="hx-logo-glow-aura" />
            <img
              src={assetUrl("/assets/logos/hexa_logo.svg")}
              alt="Hexa Dijital"
              className="hx-clean-vector-logo"
            />
          </div>

          <h1 className="hx-profile-title">{profile.brandName}</h1>
          <p className="hx-profile-tagline">{profile.tagline}</p>
          <div className="hx-live-indicator">
            <span className="hx-live-dot" />
            <span>{profile.status}</span>
          </div>
        </div>

        {/* 3. BİRİNCİL WHATSAPP HIZLI TEKLİF HATTI */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hx-primary-action-card"
        >
          <div className="hx-primary-left">
            <div className="hx-whatsapp-circle">
              <FaWhatsapp size={20} />
            </div>
            <div className="hx-primary-texts">
              <h3>{primaryAction.title}</h3>
              <p>{primaryAction.subtitle}</p>
            </div>
          </div>
          <ChevronRight size={18} className="hx-action-arrow" />
        </a>

        {/* 4. MOBİLDE YAN YANA 2'Lİ HIZLI ERİŞİM IZGARASI */}
        <div className="hx-links-2col-grid">
          {quickLinks.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`hx-grid-card-item ${item.highlight ? "is-highlighted" : ""}`}
            >
              <div className="grid-card-top">
                <div className="grid-card-icon">
                  {iconMap[item.iconType] || <Globe size={16} />}
                </div>
                {item.badge && (
                  <span className="grid-card-badge">{item.badge}</span>
                )}
              </div>

              <div className="grid-card-body">
                <h4 className="grid-card-title">{item.title}</h4>
                <p className="grid-card-desc">{item.description}</p>
              </div>

              <div className="grid-card-arrow-row">
                <ArrowUpRight size={14} />
              </div>
            </Link>
          ))}
        </div>

        {/* 5. DİREKT İLETİŞİM ŞERİDİ */}
        <div className="hx-contact-strip">
          {directContacts.map((contact, idx) => (
            <a
              key={idx}
              href={contact.href}
              className="hx-contact-tile"
              {...(contact.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              <span className="hx-tile-label">{contact.title}</span>
              <span className="hx-tile-value">{contact.value}</span>
              <span className="hx-tile-note">{contact.note}</span>
            </a>
          ))}
        </div>

        {/* 6. SOSYAL MEDYA İKONLARI */}
        {socials && socials.length > 0 && (
          <div className="hx-social-circles-row">
            {socials.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hx-social-circle-btn"
                aria-label={social.name}
              >
                {socialIconMap[social.type]}
              </a>
            ))}
          </div>
        )}

        {/* 7. ALT BİLGİ */}
        <div className="hx-links-footer">
          <span className="hx-footer-copy">
            © {new Date().getFullYear()} Hexa Dijital • Bursa
          </span>
        </div>
      </div>
    </div>
  );
};

export default LinksPage;
