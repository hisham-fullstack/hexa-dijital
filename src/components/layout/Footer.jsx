"use client";

import React from "react";
import Link from "next/link";
import { servicesData } from "@/data/servicesData";
import { slugify } from "@/utils/formatters";
import { ArrowUpRight } from "lucide-react";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaPinterest,
  FaXTwitter,
  FaTiktok,
} from "react-icons/fa6";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="hexa-premium-footer">
      <div className="container">
        {/* 5 HİZMET KATEGORİSİNİN YAN YANA EŞİT DİZİLİMİ */}
        <div className="footer-columns-5grid">
          {servicesData.map((category) => {
            const sub = category.subCategories[0];
            if (!sub) return null;
            const subSlug = slugify(sub.title);

            return (
              <div key={category.id} className="footer-column-item">
                <h4 className="footer-column-title">
                  <Link
                    href={`/hizmetler/${subSlug}`}
                    className="footer-col-header-link"
                  >
                    <span>{sub.title}</span>
                    <ArrowUpRight size={14} className="col-arrow" />
                  </Link>
                </h4>
                <ul className="footer-links-list">
                  {sub.items.map((item) => (
                    <li key={item.slug}>
                      <Link href={`/hizmetler/${subSlug}/${item.slug}`}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* DEVASA ORİJİNAL 35VW HEXA FİLİGRANI */}
      <div className="footer-bottom-container">
        <div className="footer-massive-text">
          <span>HEXA</span>
        </div>

        <div className="footer-social-row">
          <div className="copyright-text">
            © {new Date().getFullYear()} Hexa Dijital • Bursa. Tüm hakları
            saklıdır.
          </div>
          <div className="social-links">
            <a
              href="https://instagram.com/hexadijital"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="Instagram"
            >
              <FaInstagram size={17} />
              <span>Instagram</span>
            </a>
            <a
              href="https://facebook.com/hexadijitall"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="Facebook"
            >
              <FaFacebook size={17} />
              <span>Facebook</span>
            </a>
            <a
              href="https://www.youtube.com/@HEXADijital"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="YouTube"
            >
              <FaYoutube size={17} />
              <span>YouTube</span>
            </a>
            <a
              href="https://www.tiktok.com/@hexadijital"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="TikTok"
            >
              <FaTiktok size={17} />
              <span>TikTok</span>
            </a>
            <a
              href="https://tr.pinterest.com/hexadijital/"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="Pinterest"
            >
              <FaPinterest size={17} />
              <span>Pinterest</span>
            </a>
            <a
              href="https://x.com/hexadijital"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="X Twitter"
            >
              <FaXTwitter size={17} />
              <span>X</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
