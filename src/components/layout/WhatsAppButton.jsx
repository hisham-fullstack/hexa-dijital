"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa6";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  // Hexa Dijital İletişim Numarası
  const phoneNumber = "905537161958";
  const defaultMessage = encodeURIComponent(
    "Merhaba Hexa Dijital, projem için hızlı bir teklif ve bilgi almak istiyorum.",
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="hexa-whatsapp-float"
      aria-label="WhatsApp ile Hızlı Teklif Alın"
    >
      <div className="whatsapp-icon-box">
        <FaWhatsapp size={28} />
      </div>
      <span className="whatsapp-text">Hızlı Teklif Al</span>
      <span className="whatsapp-ping" />
    </a>
  );
};

export default WhatsAppButton;
