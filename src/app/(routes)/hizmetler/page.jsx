import Services from "@/components/sections/Services/Services";
import { servicesData } from "@/data/servicesData";

export const metadata = {
  title: "Bursa Dijital Çözümler ve Hizmetlerimiz | Hexa Dijital",
  description:
    "Hexa Dijital'in profesyonel hizmetleriyle tanışın: Hızlı açılan web siteleri, mobil uygulamalar, işletme otomasyonları ve Bursa yerel SEO çözümleri.",
  keywords: [
    "bursa web tasarım",
    "bursa yazılım şirketi",
    "bursa dijital pazarlama ajansı",
    "mobil uygulama geliştirme bursa",
    "bursa yerel seo hizmeti",
    "e-ticaret sitesi kurma bursa",
    "işletme otomasyonu bursa",
    "hexa dijital hizmetler",
  ],
  alternates: {
    canonical: "https://hexadijital.com/hizmetler",
  },
  openGraph: {
    title: "Bursa Dijital Çözümler ve Hizmetlerimiz | Hexa Dijital",
    description:
      "Modern web tasarımları, akılda kalıcı kurumsal kimlikler, işletme otomasyonları ve mobil çözümlerimizle markanızı internette zirveye taşıyın.",
    url: "https://hexadijital.com/hizmetler",
    siteName: "Hexa Dijital",
    images: [
      {
        url: "https://hexadijital.com/assets/logos/hexa_logo.svg",
        width: 1200,
        height: 630,
        alt: "Hexa Dijital Bursa Kurumsal Hizmetler",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dijital Hizmetlerimiz | Hexa Dijital Bursa",
    description:
      "Şirketinize özel internet siteleri, kurumsal kimlik tasarımları, işletme yazılımları ve telefon uygulamalarıyla tanışın.",
    images: ["https://hexadijital.com/assets/logos/hexa_logo.svg"],
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

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Hexa Dijital Bursa Kurumsal Çözümler ve Hizmet Kataloğu",
    description:
      "Kurumsal Kimlik, Reklam, Web Geliştirme, Mobil Çözümler, İşletme Otomasyonu ve Yapay Zeka Sistemleri.",
    url: "https://hexadijital.com/hizmetler",
    numberOfItems: servicesData.length,
    itemListElement: servicesData.map((cat, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `Bursa ${cat.title}`,
      description: cat.description,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Services />
    </>
  );
}
