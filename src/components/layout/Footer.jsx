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
  const designCategory = servicesData[0];
  const techCategory1 = servicesData[1];
  const techCategory2 = servicesData[2];

  const techSubCategories = [
    ...(techCategory1?.subCategories || []),
    ...(techCategory2?.subCategories || []),
  ];

  return (
    <footer className="hexa-premium-footer">
      <div className="footer-grid-container">
        {designCategory && (
          <div className="footer-row">
            <div className="footer-row-title">
              <h3>{designCategory.title.toUpperCase()}</h3>
            </div>
            <div className="footer-row-links">
              {designCategory.subCategories.map((sub, index) => {
                const subSlug = slugify(sub.title);

                return (
                  <div key={index} className="footer-col">
                    <h4>
                      <Link
                        href={`/hizmetler/${subSlug}`}
                        className="footer-col-header-link"
                      >
                        <span>{sub.title}</span>
                        <ArrowUpRight size={14} className="col-arrow" />
                      </Link>
                    </h4>
                    <ul>
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
        )}

        {techSubCategories.length > 0 && (
          <div className="footer-row">
            <div className="footer-row-title">
              <h3>TEKNOLOJİ & YAZILIM</h3>
            </div>
            <div className="footer-row-links">
              {techSubCategories.map((sub, index) => {
                const subSlug = slugify(sub.title);

                return (
                  <div key={index} className="footer-col">
                    <h4>
                      <Link
                        href={`/hizmetler/${subSlug}`}
                        className="footer-col-header-link"
                      >
                        <span>{sub.title}</span>
                        <ArrowUpRight size={14} className="col-arrow" />
                      </Link>
                    </h4>
                    <ul>
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
        )}
      </div>

      <div className="footer-bottom-container">
        <div className="footer-massive-text">
          <span>HEXA</span>
        </div>

        <div className="footer-social-row">
          <div className="copyright-text">
            © {new Date().getFullYear()} Hexa Dijital. Tüm hakları saklıdır.
          </div>
          <div className="social-links">
            <a
              href="https://instagram.com/hexadijital"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
              <span>Instagram</span>
            </a>
            <a
              href="https://facebook.com/hexadijitall"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="Facebook"
            >
              <FaFacebook size={18} />
              <span>Facebook</span>
            </a>
            <a
              href="https://www.youtube.com/@HEXADijital"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="YouTube"
            >
              <FaYoutube size={18} />
              <span>YouTube</span>
            </a>
            <a
              href="https://www.tiktok.com/@hexadijital"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="TikTok"
            >
              <FaTiktok size={18} />
              <span>TikTok</span>
            </a>
            <a
              href="https://tr.pinterest.com/hexadijital/"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="Pinterest"
            >
              <FaPinterest size={18} />
              <span>Pinterest</span>
            </a>
            <a
              href="https://x.com/hexadijital"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="X Twitter"
            >
              <FaXTwitter size={18} />
              <span>X</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
