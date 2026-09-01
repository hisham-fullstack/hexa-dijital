"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react";
import HomeServices from "@/components/sections/Home/HomeServices";
import "./SectoralDetail.css";

const SectoralDetail = ({ currentSector, relatedProjects = [] }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentSector?.id]);

  if (!currentSector) {
    return <div className="error-screen">Sektör bulunamadı.</div>;
  }

  return (
    <div className="hexa-sd-page">
      <div className="hexa-sd-hero-block">
        <div className="hexa-sd-image-wrapper">
          <img src={currentSector.bgImage} alt={currentSector.title} />
        </div>
        <div className="hexa-sd-top-action">
          <Link href="/sektorel-cozumler" className="hexa-sd-back-btn">
            <ChevronLeft size={16} /> Tüm Sektörler
          </Link>
        </div>
        <h1 className="hexa-sd-hero-title">
          <span className="title-line">
            {currentSector.title.split("&")[0]}
          </span>
          {currentSector.title.includes("&") && (
            <span className="title-line">
              & {currentSector.title.split("&")[1]}
            </span>
          )}
        </h1>
      </div>

      <div className="container">
        <section className="hexa-split-section">
          <div className="split-text-panel sticky-panel">
            <span className="section-kicker danger">MEVCUT DURUM ANALİZİ</span>
            <h2 className="split-title">
              Büyümenizi Yavaşlatan <br />
              <span className="text-danger">Darboğazlar.</span>
            </h2>
            <div className="article-content">
              <p className="lead-text">{currentSector.introText}</p>
              <div className="article-sub-block">
                <h3>Neden Önemli?</h3>
                <p>{currentSector.importanceText}</p>
              </div>
            </div>
          </div>

          <div className="split-cards-panel">
            {currentSector.painPoints.map((point, idx) => (
              <div key={idx} className="hexa-glass-card problem-card">
                <div className="card-header">
                  <AlertCircle className="icon-danger" size={24} />
                  <span className="card-num">{point.num}</span>
                </div>
                <h3>{point.title}</h3>
                <p>{point.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="hexa-split-section reverse-layout">
          <div className="split-text-panel sticky-panel">
            <span className="section-kicker success">
              HEXA DÖNÜŞÜM MİMARİSİ
            </span>
            <h2 className="split-title">
              Sorunlara Karşı <br />
              <span className="text-cyan">Hibrit Çözüm.</span>
            </h2>
            <div className="article-content">
              <p className="lead-text">{currentSector.processText}</p>
              <div className="article-sub-block">
                <h3>Hedeflenen Sonuç</h3>
                <p>
                  Geleneksel iş modellerinden sıyrılarak, otonom çalışan,
                  hatasız ve ölçeklenebilir bir dijital ekosisteme entegre
                  olursunuz.
                </p>
              </div>
            </div>
          </div>

          <div className="split-cards-panel">
            {currentSector.workflowSteps.map((step, index) => (
              <div key={index} className="hexa-glass-card solution-card">
                <div className="card-header">
                  <CheckCircle className="icon-success" size={24} />
                  <span className="phase-badge">PHASE {step.phase}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {relatedProjects.length > 0 && (
          <section className="hexa-related-projects-section">
            <div className="related-header">
              <span
                className="section-kicker"
                style={{ color: "var(--hexa-font-main)" }}
              >
                KANITLANMIŞ BAŞARI
              </span>
              <h2 className="related-title">
                Sektörünüzden <br />{" "}
                <span className="text-cyan">Örnek Vakalar.</span>
              </h2>
            </div>

            <div className="related-projects-grid">
              {relatedProjects.map((project) => (
                <Link
                  href={`/projeler/${project.slug}`}
                  key={project.id}
                  className="related-project-card global-glass-card"
                >
                  <div className="rp-image-box">
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className="rp-info-box">
                    <div>
                      <span className="rp-client">{project.client}</span>
                      <h3 className="rp-title">{project.title}</h3>
                    </div>
                    <div className="rp-action-circle">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <HomeServices />

        <section className="hexa-final-cta">
          <div className="cta-inner-glass">
            <h2>
              İşletmenizi <span className="text-cyan">Fütüristik</span> Bir{" "}
              <br /> Modele Taşıyalım.
            </h2>
            <p>
              Sektörünüzün dinamiklerine uygun, tamamen size özel kodlanmış bir
              altyapı inşa edelim.
            </p>
            <Link href="/iletisim" className="hexa-magnetic-btn">
              Operasyon Analizi İsteyin <ArrowRight size={24} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SectoralDetail;
