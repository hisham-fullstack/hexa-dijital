"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function MetaPixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Sayfa yolu veya parametreler değiştiğinde Meta Pixel'e yeni PageView gönder
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  return null;
}
