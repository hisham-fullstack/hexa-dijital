"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/locales/translations";

// Sunucu tarafında veya ilk yüklemede çökmeyi önleyen güvenli varsayılan sözlük
const defaultContext = {
  currentLang: "tr",
  changeLanguage: () => {},
  t: (path) => {
    const keys = path.split(".");
    let current = translations["tr"];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        return path;
      }
    }
    return current;
  },
  isRTL: false,
};

const LanguageContext = createContext(defaultContext);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  return context || defaultContext;
};

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState("tr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("hexa_lang");
    if (savedLang && ["tr", "en", "de", "ar"].includes(savedLang)) {
      setCurrentLang(savedLang);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem("hexa_lang", currentLang);

    const htmlEl = document.documentElement;
    htmlEl.lang = currentLang;

    if (currentLang === "ar") {
      htmlEl.setAttribute("dir", "rtl");
      document.body.classList.add("rtl-mode");
    } else {
      htmlEl.setAttribute("dir", "ltr");
      document.body.classList.remove("rtl-mode");
    }
  }, [currentLang, mounted]);

  const t = (path) => {
    const keys = path.split(".");
    let current = translations[currentLang] || translations["tr"];

    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        let fallback = translations["tr"];
        for (const fKey of keys) {
          if (fallback && fallback[fKey] !== undefined) {
            fallback = fallback[fKey];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return current;
  };

  const changeLanguage = (langCode) => {
    if (["tr", "en", "de", "ar"].includes(langCode)) {
      setCurrentLang(langCode);
    }
  };

  const isRTL = currentLang === "ar";

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        changeLanguage,
        t,
        isRTL,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
