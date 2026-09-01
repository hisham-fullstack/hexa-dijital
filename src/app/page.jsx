import Hero from "@/components/sections/Home/Hero";
import HomeServices from "@/components/sections/Home/HomeServices";
import Approach from "@/components/sections/Home/Approach";
import SectoralPanel from "@/components/sections/Home/SectoralPanel";
import LatestWork from "@/components/sections/Home/LatestWork";
import AboutUs from "@/components/sections/Home/AboutUs";
import Testimonials from "@/components/sections/Home/Testimonials";

export const metadata = {
  title: "Hexa Dijital | Bursa Tasarım, Yazılım ve Reklam Ajansı",
  description:
    "Bursa'nın fütüristik tasarım, yazılım ve reklam ajansı Hexa Dijital. Web tasarım, mobil uygulama, SEO ve premium dijital marka çözümleriyle zirveye oynayın.",
  keywords: [
    "bursa web tasarım",
    "bursa yazılım şirketi",
    "bursa reklam ajansı",
    "bursa dijital ajans",
    "bursa mobil uygulama",
    "bursa seo ajansı",
    "web tasarım bursa",
    "hexa dijital",
  ],
  alternates: {
    canonical: "https://hexadijital.com",
  },
  openGraph: {
    title: "Hexa Dijital | Bursa Tasarım, Yazılım ve Reklam Ajansı",
    description:
      "Web tasarım, mobil uygulama ve premium marka çözümleriyle dijitalde zirveye oynayın.",
    url: "https://hexadijital.com",
    siteName: "Hexa Dijital",
    images: [
      {
        url: "https://hexadijital.com/assets/logos/hexa_logo.svg",
        width: 1200,
        height: 630,
        alt: "Hexa Dijital",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <HomeServices />
      <Approach />
      <SectoralPanel />
      <LatestWork />
      <AboutUs />
      <Testimonials />
    </div>
  );
}
