"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { ArrowUpRight } from "lucide-react";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  const phoneNumber = "905539344135";
  const defaultMessage = encodeURIComponent(
    "Merhaba, işletmem için hizmetleriniz hakkında hızlı bir bilgi ve fiyat teklifi almak istiyorum.",
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="hexa-luxury-whatsapp-float"
      aria-label="WhatsApp Hızlı İletişim Hattı"
    >
      <div className="whatsapp-glass-glow" />

      <div className="whatsapp-icon-wrapper">
        <FaWhatsapp size={20} className="whatsapp-brand-icon" />
      </div>

      <div className="whatsapp-text-group">
        <span className="whatsapp-action-text">WhatsApp Hızlı Hat</span>
      </div>

      <div className="whatsapp-arrow-pill">
        <ArrowUpRight size={14} />
      </div>
    </a>
  );
};

export default WhatsAppButton;
