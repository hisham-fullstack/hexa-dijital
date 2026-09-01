"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code2, Sparkles, Network } from "lucide-react";
import "./AboutUs.css";

const AboutUs = () => {
  // İlk eleman varsayılan olarak açık da gelebilir, kapalı da. Biz ilkini açık başlatalım.
  const [expandedId, setExpandedId] = useState(0);

  const pillars = [
    {
      id: 0,
      number: "01",
      title: "Kusursuz Mimari",
      desc: "Monolitik yapıları geride bırakıyoruz. React, Laravel ve Supabase ile sadece bugün değil, 5 yıl sonra da performansından ödün vermeyen, ölçeklenebilir ve temiz sistemler kodluyoruz.",
      icon: <Code2 size={24} />,
    },
    {
      id: 1,
      number: "02",
      title: "Geleceğin Estetiği",
      desc: "Arayüz bir araç değil, deneyimin kendisidir. Glassmorphism dokuları, karanlık mod optimizasyonları ve bento grid yerleşimleriyle markanızı fütüristik bir formda yeniden yaratıyoruz.",
      icon: <Sparkles size={24} />,
    },
    {
      id: 2,
      number: "03",
      title: "Otonom Yapılar",
      desc: "İnsan hatasını ortadan kaldırın. İşletme süreçlerinizi, yapay zeka destekli ERP çözümlerimiz, mikro-öğrenme algoritmaları ve otomatik komisyon takip sistemlerimizle otopilota alıyoruz.",
      icon: <Network size={24} />,
    },
  ];

  return (
    <section className="global-section hx-accordion-about">
      <div className="container">
        <div className="hx-about-grid">
          {/* SOL: STICKY MANİFESTO */}
          <div className="hx-about-sticky-col">
            <div className="hx-sticky-content">
              <span className="hx-meta-label">BİZ KİMİZ?</span>
              <h2 className="hx-massive-heading">
                Dijitalde <br />
                sıradanlığı <br />
                <span className="text-glow-accent">reddediyoruz.</span>
              </h2>
              <p className="hx-sticky-desc">
                Hexa Dijital, Bursa'dan tüm dünyaya açılan; estetik, performans
                ve inovasyonu tek bir potada eriten yeni nesil bir teknoloji
                stüdyosudur. Fikirlerinizi dijitalin sınırlarını zorlayan
                ürünlere dönüştürüyoruz.
              </p>
            </div>
          </div>

          {/* SAĞ: FLUID ACCORDION (AKIŞKAN LİSTE) */}
          <div className="hx-about-accordion-col">
            <div className="hx-accordion-wrapper">
              {pillars.map((pillar) => {
                const isActive = expandedId === pillar.id;

                return (
                  <motion.div
                    key={pillar.id}
                    className={`hx-accordion-item ${isActive ? "active" : ""}`}
                    onHoverStart={() => setExpandedId(pillar.id)}
                    onClick={() => setExpandedId(pillar.id)} // Mobilde dokunma için
                    layout
                  >
                    {/* Üst Kısım: Sadece Başlık ve Numara */}
                    <motion.div className="hx-accordion-header" layout>
                      <div className="hx-header-left">
                        <span className="hx-acc-number">{pillar.number}</span>
                        <h3 className="hx-acc-title">{pillar.title}</h3>
                      </div>
                      <motion.div
                        className="hx-acc-icon"
                        animate={{ rotate: isActive ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight size={24} />
                      </motion.div>
                    </motion.div>

                    {/* Alt Kısım: Açılan İçerik */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="hx-accordion-body"
                        >
                          <div className="hx-accordion-content-inner">
                            <div className="hx-acc-body-icon">
                              {pillar.icon}
                            </div>
                            <p className="hx-acc-desc">{pillar.desc}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
