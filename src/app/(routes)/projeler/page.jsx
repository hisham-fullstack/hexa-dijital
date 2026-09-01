import Projects from "@/components/sections/Projects/Projects";
import { projectsData } from "@/data/projectsData";

export const metadata = {
  title: "Başarı Hikayeleri & Portfolyo | Hexa Dijital Bursa",
  description:
    "Bursa yazılım ve tasarım ajansı Hexa Dijital'in başarı hikayeleri. Restoran otomasyonlarından premium web tasarımlarına kadar hayata geçirdiğimiz fütüristik projeler ve vaka analizleri.",
  keywords: [
    "bursa yazılım projeleri",
    "web tasarım portfolyo bursa",
    "vaka analizleri bursa",
    "dijital ajans başarı hikayeleri",
    "hexa finans",
    "paninoteca",
    "ömer usta",
    "hira koltuk yıkama",
    "hexa dijital portfolyo",
  ],
  alternates: {
    canonical: "https://hexadijital.com/projeler",
  },
  openGraph: {
    title: "Başarı Hikayeleri & Portfolyo | Hexa Dijital Bursa",
    description:
      "Müşterilerimiz için tasarladığımız premium projelerden, kendi içimizde kurguladığımız otonom SaaS ürünlerine kadar Hexa vizyonu.",
    url: "https://hexadijital.com/projeler",
    siteName: "Hexa Dijital",
    images: [
      {
        url: "https://hexadijital.com/assets/logos/hexa_logo.svg",
        width: 1200,
        height: 630,
        alt: "Hexa Dijital Projeler",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Başarı Hikayeleri & Portfolyo | Hexa Dijital",
    description:
      "Sıfırdan inşa ettiğimiz fütüristik web projeleri, mobil uygulamalar ve dijital dönüşüm vaka analizleri.",
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

export default function ProjectsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Hexa Dijital Proje Portfolyosu ve Başarı Hikayeleri",
    description:
      "Müşterilerimiz için sıfırdan inşa ettiğimiz fütüristik web siteleri, mobil uygulamalar ve dijital dönüşüm vaka analizleri.",
    url: "https://hexadijital.com/projeler",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projectsData.length,
      itemListElement: projectsData.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        description: project.description,
        url: `https://hexadijital.com/projeler/${project.slug}`,
        image: `https://hexadijital.com${project.image}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Projects />
    </>
  );
}
