"use client";

import React from "react";
import LightRays from "@/components/ui/LightRays";
import Logo3D from "./Logo3D";
import { useLanguage } from "@/context/LanguageContext";
import "./Hero.css";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="hero-section">
      {/* 1. KATMAN: Arka Plandaki Işık Huzmeleri */}
      <div className="hero-background">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00fffb"
          raysSpeed={1}
          lightSpread={1}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      {/* 2. KATMAN: Merkez 3D Logo */}
      <div className="hero-logo-center">
        <Logo3D />
      </div>

      {/* 3. KATMAN: Sol Alt Tipografi ve 4 Dilli Anlık Çeviri */}
      <div className="hero-bottom-container">
        <div className="hero-text-block">
          <span className="text-gradient-flow">{t("hero.tag")}</span>
          <h1 className="hero-headline">
            {t("hero.headline")}{" "}
            <span className="text-dim">{t("hero.subline")}</span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
