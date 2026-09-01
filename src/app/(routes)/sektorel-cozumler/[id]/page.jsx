import SectoralDetail from "@/components/sections/Sectoral/SectoralDetail";
import { sectoralData } from "@/data/sectoralData";
import { projectsData } from "@/data/projectsData";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return sectoralData.map((sector) => ({
    id: sector.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;

  const sector = sectoralData.find((s) => s.id === id);

  if (!sector) {
    return { title: "Sektörel Çözümler | Hexa Dijital" };
  }

  const title = `${sector.title} Dijital Çözümleri | Hexa Dijital Bursa`;
  const description = sector.description;

  const painPointKeywords = sector.painPoints
    ? sector.painPoints.map((p) => p.title.toLowerCase())
    : [];

  return {
    title,
    description,
    keywords: [
      `bursa ${sector.title.toLowerCase()} web tasarım`,
      `${sector.title.toLowerCase()} dijital pazarlama ajansı`,
      `${sector.title.toLowerCase()} yazılım çözümleri`,
      "hexa dijital bursa",
      ...painPointKeywords,
    ].filter(Boolean),
    alternates: {
      canonical: `https://hexadijital.com/sektorel-cozumler/${id}`,
    },
    openGraph: {
      title: `${sector.title} - ${sector.subtitle}`,
      description: sector.introText,
      url: `https://hexadijital.com/sektorel-cozumler/${id}`,
      siteName: "Hexa Dijital",
      images: [
        {
          url: `https://hexadijital.com${sector.bgImage}`,
          width: 1200,
          height: 630,
          alt: `${sector.title} Çözümleri - Hexa Dijital`,
        },
      ],
      locale: "tr_TR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${sector.title} | Hexa Dijital`,
      description: sector.introText,
      images: [`https://hexadijital.com${sector.bgImage}`],
    },
  };
}

export default async function SectoralDetailPage({ params }) {
  const { id } = await params;
  const sector = sectoralData.find((s) => s.id === id);

  if (!sector) {
    notFound();
  }

  const relatedProjects = projectsData.filter(
    (p) => p.relatedSectors && p.relatedSectors.includes(id),
  );

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${sector.title} Sektörü İçin Dijital Dönüşüm`,
    description: sector.introText,
    provider: {
      "@type": "ProfessionalService",
      name: "Hexa Dijital",
      url: "https://hexadijital.com",
    },
    audience: {
      "@type": "Audience",
      audienceType: sector.title,
    },
    url: `https://hexadijital.com/sektorel-cozumler/${id}`,
    image: `https://hexadijital.com${sector.bgImage}`,
  };

  const faqJsonLd =
    sector.painPoints && sector.painPoints.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: sector.painPoints.map((point) => ({
            "@type": "Question",
            name: `${sector.title} Sektöründe "${point.title}" Sorununu Nasıl Çözüyoruz?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: point.desc,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <SectoralDetail
        currentSector={sector}
        relatedProjects={relatedProjects}
      />
    </>
  );
}
