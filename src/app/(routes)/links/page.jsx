import LinksPage from "@/components/sections/Links/LinksPage";

export const metadata = {
  title: "Hızlı Erişim & İletişim Bağlantıları | Hexa Dijital Bursa",
  description:
    "Hexa Dijital hızlı iletişim ve hizmet bağlantıları. Telefonda saniyesinde açılan web siteleri, restoran adisyon sistemleri ve WhatsApp teklif hattı.",
  keywords: [
    "bursa web tasarım iletişim",
    "bursa yazılım teklif al",
    "hexa dijital bağlantılar",
    "hexa dijital bio link",
    "bursa dijital ajans whatsapp",
  ],
  alternates: {
    canonical: "https://hexadijital.com/baglantilar",
  },
  openGraph: {
    title: "Hexa Dijital | Hızlı Erişim & Teklif Kanalları",
    description:
      "Telefonda saniyede açılan web siteleri, restoran adisyon sistemleri ve WhatsApp hızlı teklif hattı.",
    url: "https://hexadijital.com/baglantilar",
    siteName: "Hexa Dijital",
    images: [
      {
        url: "https://hexadijital.com/assets/logos/hexa_logo.svg",
        width: 1200,
        height: 630,
        alt: "Hexa Dijital Hızlı İletişim",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hexa Dijital | Hızlı Erişim Bağlantıları",
    description:
      "İşletmenizin ihtiyacı olan web sitesi ve yazılım çözümlerine hızlıca ulaşın.",
    images: ["https://hexadijital.com/assets/logos/hexa_logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LinksRoutePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Hexa Dijital Hızlı Erişim ve İletişim Sayfası",
    description:
      "Hexa Dijital Bursa web tasarım, restoran otomasyonu ve hızlı WhatsApp teklif kanalları.",
    url: "https://hexadijital.com/baglantilar",
    mainEntity: {
      "@type": "ProfessionalService",
      name: "Hexa Dijital",
      telephone: "+905537161958",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bursa",
        addressCountry: "TR",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LinksPage />
    </>
  );
}
