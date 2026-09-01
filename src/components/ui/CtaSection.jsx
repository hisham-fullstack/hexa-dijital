"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, MessageSquareCode } from "lucide-react";
import "./CtaSection.css";

const CtaSection = () => {
  return (
    <section className="hexa-cta-wrapper">
      <div className="container">
        <motion.div
          className="hexa-cta-box global-glass-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Arka plan parlaması için dekoratif element */}
          <div className="cta-glow-bg" />

          <div className="cta-content-left">
            <div className="cta-icon-wrapper">
              <Rocket size={28} color="var(--hexa-accent)" />
            </div>
            <h2 className="cta-heading">
              Tamamen Size Özel Bir Çözüm mü Arıyorsunuz?
            </h2>
            <p className="cta-text">
              Standart paketlere sığmayan, sınırların ötesinde bir fikriniz mi
              var? Hexa Dijital olarak, markanızın DNA'sına uygun,{" "}
              <strong>terzi işi (tailor-made)</strong> teknoloji ve tasarım
              projeleri inşa ediyoruz. Hayalinizdeki projeyi konuşmak için
              bizimle iletişime geçin.
            </p>
          </div>

          <div className="cta-action-right">
            {/* to yerine href kullanıldı */}
            <Link href="/iletisim" className="cta-primary-btn">
              Özel Teklif İste <ArrowRight size={18} />
            </Link>
            <Link href="/iletisim" className="cta-secondary-btn">
              <MessageSquareCode size={18} /> Ekibimizle Görüşün
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
