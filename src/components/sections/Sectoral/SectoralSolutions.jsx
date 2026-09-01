"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { sectoralData } from "@/data/sectoralData";
import { assetUrl } from "@/utils/formatters";
import HomeServices from "@/components/sections/Home/HomeServices";
import "./SectoralSolutions.css";

const SectorCard = ({ sector }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Link href={`/sektorel-cozumler/${sector.id}`} className="portfolio-card">
      <div
        className="portfolio-image-wrapper"
        ref={cardRef}
        onMouseMove={handleMouseMove}
      >
        <img src={assetUrl(sector.bgImage)} alt={sector.title} />

        <motion.div
          className="portfolio-hover-btn"
          animate={{
            x: mousePos.x - 90,
            y: mousePos.y - 25,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 0.1,
          }}
        >
          ÇÖZÜMÜ İNCELE <ArrowUpRight size={16} />
        </motion.div>
      </div>

      <div className="portfolio-info">
        <h3 className="portfolio-title">{sector.title}</h3>
        <div className="portfolio-meta">
          <span className="meta-label">Sektör:</span>
          <span className="meta-value">{sector.label}</span>
        </div>
      </div>
    </Link>
  );
};

const SectoralSolutions = () => {
  return (
    <div className="global-section sectoral-page">
      <div className="container">
        <div className="approach-content sectoral-hero-margin">
          <div className="approach-label">
            <p>SEKTÖREL ÇÖZÜMLER</p>
          </div>
          <div className="approach-text">
            <h2>
              <span className="text-dark">
                Sektörünüze özel, atışa hazır paketler.{" "}
              </span>
              <span className="text-light">
                İhtiyacınız olan tüm dijital silahları tek bir pakette
                birleştirdik. Sektörünüzü seçin ve büyümeye başlayın.
              </span>
            </h2>
          </div>
        </div>

        <div className="portfolio-grid">
          {sectoralData.map((sector) => (
            <SectorCard key={sector.id} sector={sector} />
          ))}
        </div>
      </div>
      <HomeServices />
    </div>
  );
};

export default SectoralSolutions;
