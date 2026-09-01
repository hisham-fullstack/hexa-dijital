import React from "react";
import LightRays from "@/components/ui/LightRays";
import Logo3D from "./Logo3D";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero-section">
      {/* 1. KATMAN: Arka Plandaki Neon Işık Huzmeleri */}
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

      {/* 2. KATMAN: Tam Merkezdeki 3D Metalik Logo */}
      <div className="hero-logo-center">
        <Logo3D />
      </div>

      {/* 3. KATMAN: Sol Alt Tipografi */}
      <div className="hero-bottom-container">
        <div className="hero-text-block">
          <span className="text-gradient-flow">TAM HİZMET AJANSI</span>
          <h1 className="hero-headline">
            Hexa, Bursa merkezli bir tasarım, teknoloji ve reklam ajansıdır.{" "}
            <span className="text-dim">
              Markanız için bütünsel dijital kimlikler & kusursuz yazılım
              deneyimleri inşa ediyoruz.
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
