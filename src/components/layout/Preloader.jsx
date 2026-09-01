"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";
import "./Preloader.css";

const Preloader = ({ onComplete }) => {
  const { progress } = useProgress(); // 3D sahnelerin yüklenme yüzdesini alır
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 3D model anında yüklense bile animasyonun akıcı görünmesi için yapay bir gecikme ve animasyon
    let currentProgress = displayProgress;

    // Framer motion kullanmadan sayıları akıcı bir şekilde artırmak için requestAnimationFrame kullanıyoruz
    const updateProgress = () => {
      // Hedef, ya 3D modelin gerçek progress'i ya da en azından zamanla artan bir değer
      const target = Math.max(progress, 100);

      // Yumuşak geçiş (Lerp)
      currentProgress += (target - currentProgress) * 0.05;

      if (currentProgress > 99.9) {
        setDisplayProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          // Preloader kapandıktan biraz sonra ana sisteme haber ver (Prop varsa çalıştır)
          if (onComplete) {
            setTimeout(onComplete, 1000);
          }
        }, 400); // 100% olduktan sonra yarım saniye bekle
      } else {
        setDisplayProgress(Math.floor(currentProgress));
        requestAnimationFrame(updateProgress);
      }
    };

    const animationId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationId);
  }, [progress, onComplete]);

  // Awwwards tarzı pürüzsüz çıkış animasyonu (Eğri: çok hızlı başlar, çok yavaş biter)
  const slideUp = {
    initial: { y: "0%" },
    exit: {
      y: "-100%", // top yerine y kullanıyoruz
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const textReveal = {
    initial: { y: "100%", opacity: 0 },
    animate: {
      y: "0%",
      opacity: 1,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          variants={slideUp}
          initial="initial"
          exit="exit"
          className="preloader-container"
        >
          {/* Arka plandaki ince grid veya noise detayı (Opsiyonel ama lüks gösterir) */}
          <div className="preloader-noise"></div>

          <div className="preloader-content">
            <div className="preloader-text-wrapper">
              <motion.h1
                variants={textReveal}
                initial="initial"
                animate="animate"
                exit="exit"
                className="preloader-brand"
              >
                HEXA <span className="text-dijital">DİJİTAL</span>
              </motion.h1>
            </div>

            <div className="preloader-bottom">
              <span className="preloader-status">
                Yeni nesil web deneyimi...
              </span>
              <span className="preloader-percentage">{displayProgress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
