"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import {
  Send,
  Headphones,
  Briefcase,
  Sparkles,
  X,
  CheckCircle,
  CalendarDays,
  Phone,
  Coffee,
  Video,
} from "lucide-react";
import "./Contact.css";

const Contact = () => {
  const { cartItems, removeFromCart, finalTotal } = useCart();
  const [activeTab, setActiveTab] = useState("toplanti");
  const [meetingType, setMeetingType] = useState("call");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [formStatus, setFormStatus] = useState("idle");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat("tr-TR").format(price) + " ₺";

  const upcomingDays = useMemo(() => {
    const days = [];
    let currentDate = new Date();

    for (let i = 1; days.length < 14; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);

      days.push({
        fullDate: nextDate.toISOString(),
        dayName: new Intl.DateTimeFormat("tr-TR", {
          weekday: "short",
        }).format(nextDate),
        dayNum: nextDate.getDate(),
        monthName: new Intl.DateTimeFormat("tr-TR", {
          month: "short",
        }).format(nextDate),
      });
    }
    return days;
  }, []);

  const timeSlots = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");

    const formData = new FormData(e.target);
    formData.append("Konu", activeTab);

    if (activeTab === "toplanti") {
      formData.append("Toplanti_Tipi", meetingType);
      formData.append(
        "Tarih",
        selectedDate
          ? new Date(selectedDate).toLocaleDateString("tr-TR")
          : "Seçilmedi",
      );
      formData.append("Saat", selectedTime || "Seçilmedi");
    }

    if (cartItems.length > 0) {
      const services = cartItems.map((item) => item.name).join(", ");
      formData.append("Secilen_Hizmetler", services);
      formData.append("Tahmini_Butce", finalTotal + " TL");
    }

    try {
      const response = await fetch("https://formspree.io/f/meerqrga", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setFormStatus("success");
        e.target.reset();
        setTimeout(() => setFormStatus("idle"), 3000);
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <div className="global-section hx-contact-page">
      <div className="container">
        <div className="hx-contact-header">
          <h1 className="hx-contact-title">
            TANIŞALIM & <span className="text-glow">TEKLİF ALIN.</span>
          </h1>
          <p className="hx-contact-subtitle">
            Harika bir fikriniz mi var, yoksa mevcut projeniz için desteğe mi
            ihtiyacınız var? Doğru frekansı seçin ve sinyali gönderin.
          </p>
        </div>

        <div className="hx-contact-grid">
          <div className="hx-contact-form-wrapper">
            <div className="hx-form-tabs-minimal">
              <button
                type="button"
                className={`hx-tab-minimal-btn ${activeTab === "proje" ? "active" : ""}`}
                onClick={() => setActiveTab("proje")}
              >
                <Briefcase size={16} /> Yeni Proje
              </button>
              <button
                type="button"
                className={`hx-tab-minimal-btn ${activeTab === "toplanti" ? "active" : ""}`}
                onClick={() => setActiveTab("toplanti")}
              >
                <CalendarDays size={16} /> Toplantı Planla
              </button>
              <button
                type="button"
                className={`hx-tab-minimal-btn ${activeTab === "destek" ? "active" : ""}`}
                onClick={() => setActiveTab("destek")}
              >
                <Headphones size={16} /> Destek
              </button>
            </div>

            <form className="hx-form-minimal" onSubmit={handleSubmit}>
              <div className="hx-input-row-minimal">
                <div className="hx-input-float">
                  <input type="text" name="ad_soyad" placeholder=" " required />
                  <label>Adınız Soyadınız</label>
                </div>
                <div className="hx-input-float">
                  <input type="text" name="sirket" placeholder=" " required />
                  <label>Şirket / Marka</label>
                </div>
              </div>

              <div className="hx-input-row-minimal">
                <div className="hx-input-float">
                  <input type="email" name="email" placeholder=" " required />
                  <label>E-Posta Adresi</label>
                </div>
                <div className="hx-input-float">
                  <input type="tel" name="telefon" placeholder=" " required />
                  <label>Telefon Numarası</label>
                </div>
              </div>

              {activeTab === "toplanti" && (
                <div className="hx-meeting-section">
                  <div className="hx-meeting-type-selector">
                    <span className="section-mini-label">Nasıl Görüşelim?</span>
                    <div className="hx-type-pills">
                      <button
                        type="button"
                        className={`hx-type-pill ${meetingType === "call" ? "active" : ""}`}
                        onClick={() => setMeetingType("call")}
                      >
                        <Phone size={14} /> Sizi Arayalım
                      </button>
                      <button
                        type="button"
                        className={`hx-type-pill ${meetingType === "visit" ? "active" : ""}`}
                        onClick={() => setMeetingType("visit")}
                      >
                        <Coffee size={14} /> Size Gelelim
                      </button>
                      <button
                        type="button"
                        className={`hx-type-pill ${meetingType === "online" ? "active" : ""}`}
                        onClick={() => setMeetingType("online")}
                      >
                        <Video size={14} /> Online Toplantı
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {(meetingType === "visit" || meetingType === "online") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="hx-custom-datetime-wrapper"
                      >
                        <div className="hx-custom-date-picker">
                          <div className="hx-date-scroll-container">
                            <div
                              className="hx-date-scroll-area"
                              data-lenis-prevent="true"
                            >
                              {upcomingDays.map((day, idx) => (
                                <button
                                  type="button"
                                  key={idx}
                                  className={`hx-date-card ${selectedDate === day.fullDate ? "active" : ""}`}
                                  onClick={() => setSelectedDate(day.fullDate)}
                                >
                                  <span className="d-month">
                                    {day.monthName}
                                  </span>
                                  <span className="d-num">{day.dayNum}</span>
                                  <span className="d-day">{day.dayName}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="hx-custom-time-picker">
                          <span className="section-mini-label">
                            Saat Aralığı
                          </span>
                          <div className="hx-time-grid">
                            {timeSlots.map((time, idx) => (
                              <button
                                type="button"
                                key={idx}
                                className={`hx-time-pill ${selectedTime === time ? "active" : ""}`}
                                onClick={() => setSelectedTime(time)}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                        {meetingType === "visit" && (
                          <div
                            className="hx-input-float"
                            style={{ marginTop: "16px" }}
                          >
                            <textarea
                              name="adres"
                              rows="1"
                              placeholder=" "
                              required
                            ></textarea>
                            <label>Açık Adresiniz (Örn: Nilüfer / Bursa)</label>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="hx-input-float" style={{ marginTop: "16px" }}>
                    <textarea
                      name="mesaj"
                      rows="1"
                      placeholder=" "
                      required
                    ></textarea>
                    <label>Kısaca Toplantı Konusu</label>
                  </div>
                </div>
              )}

              {activeTab === "proje" && (
                <div className="hx-input-float" style={{ marginTop: "16px" }}>
                  <textarea
                    name="mesaj"
                    rows="2"
                    placeholder=" "
                    required
                  ></textarea>
                  <label>Proje Detayları (Aklınızdaki vizyonu anlatın)</label>
                </div>
              )}
              {activeTab === "destek" && (
                <div className="hx-input-float" style={{ marginTop: "16px" }}>
                  <textarea
                    name="mesaj"
                    rows="2"
                    placeholder=" "
                    required
                  ></textarea>
                  <label>Nasıl Yardımcı Olabiliriz?</label>
                </div>
              )}

              <button
                className="hx-submit-minimal-btn"
                disabled={formStatus === "submitting"}
                style={
                  formStatus === "success"
                    ? { backgroundColor: "var(--hexa-accent)", color: "#000" }
                    : {}
                }
              >
                <span>
                  {formStatus === "submitting"
                    ? "Gönderiliyor..."
                    : formStatus === "success"
                      ? "Başarıyla Gönderildi!"
                      : activeTab === "toplanti"
                        ? "Randevu Talebi Gönder"
                        : "Sinyali Gönder"}
                </span>
                {formStatus === "success" ? (
                  <CheckCircle size={16} />
                ) : (
                  <Send size={16} />
                )}
              </button>

              {formStatus === "error" && (
                <p
                  style={{
                    color: "#ff4d4d",
                    fontSize: "0.85rem",
                    marginTop: "10px",
                  }}
                >
                  Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyin.
                </p>
              )}
            </form>
          </div>

          <div className="hx-contact-sidebar">
            <AnimatePresence mode="wait">
              {cartItems.length > 0 &&
              (activeTab === "proje" || activeTab === "toplanti") ? (
                <motion.div
                  key="cart-summary"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="hx-cart-summary-box global-glass-card"
                >
                  <div className="summary-header">
                    <Sparkles size={20} color="var(--hexa-accent)" />
                    <h3>Seçtiğiniz Hizmetler</h3>
                  </div>
                  <div className="summary-items-list">
                    {cartItems.map((item) => (
                      <div key={item.slug} className="summary-item-card">
                        <div className="summary-item-info">
                          <CheckCircle size={16} color="var(--hexa-accent)" />
                          <span>{item.name}</span>
                        </div>
                        <button
                          className="summary-remove-btn"
                          onClick={() => removeFromCart(item.slug)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="summary-total-box">
                    <span className="total-label">
                      Tahmini Bütçe (KDV Hariç)
                    </span>
                    <span className="total-price">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="contact-info"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="hx-info-summary-box global-glass-card"
                >
                  <h3>Direkt İletişim</h3>
                  <p>Form doldurmak istemiyor musunuz? Bize doğrudan ulaşın.</p>
                  <div className="direct-contact-items">
                    <div className="dc-item">
                      <span className="dc-label">Yazılım Mühendisi</span>
                      <a href="tel:+905537161958">+90 553 716 19 58</a>
                    </div>
                    <div className="dc-item">
                      <span className="dc-label">
                        Pazarlama ve Müşteri İlişkileri
                      </span>
                      <a href="tel:+905539344135">+90 553 934 41 35</a>
                    </div>
                    <div className="dc-item">
                      <span className="dc-label">Merkez Ofis</span>
                      <p>Osmangazi / Bursa</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
