"use client";

import React, { useEffect, useRef } from "react";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/context/CartContext";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

export default function Providers({ children }) {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    lenisRef.current = lenis;
    // Sayfa genelinde sinematik merkezleme yapabilmek için Lenis nesnesi kaydedilir
    if (typeof window !== "undefined") {
      window.lenis = lenis;
    }

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined") {
        window.lenis = null;
      }
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      value={{
        light: "theme-inverted",
        dark: "dark",
      }}
    >
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}
