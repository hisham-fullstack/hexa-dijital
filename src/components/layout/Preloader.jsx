"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";
import "./Preloader.css";

const Preloader = ({ onComplete }) => {
  const pathname = usePathname();
  const { progress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Bio-link ve hızlı bağlantı sayfalarında preloader'ı tamamen devre dışı bırak
  const isExcludedPage =
    pathname === "/baglantilar" || pathname === "/baglantilar/";

  useEffect(() => {
    if (isExcludedPage) {
      setIsLoading(false);
      return;
    }

    let currentProgress = displayProgress;

    const updateProgress = () => {
      const target = Math.max(progress, 100);
      currentProgress += (target - currentProgress) * 0.05;

      if (currentProgress > 99.9) {
        setDisplayProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          if (onComplete) {
            setTimeout(onComplete, 1000);
          }
        }, 400);
      } else {
        setDisplayProgress(Math.floor(currentProgress));
        requestAnimationFrame(updateProgress);
      }
    };

    const animationId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationId);
  }, [progress, onComplete, isExcludedPage]);

  // Hızlı erişim sayfasındaysak hiçbir şey render etme (Anında açılış)
  if (isExcludedPage) {
    return null;
  }

  const slideUp = {
    initial: { y: "0%" },
    exit: {
      y: "-100%",
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
