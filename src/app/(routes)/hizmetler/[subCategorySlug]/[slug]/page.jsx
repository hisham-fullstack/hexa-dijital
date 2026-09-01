import ServiceDetail from "@/components/sections/Services/ServiceDetail";
import { servicesData } from "@/data/servicesData";
import { slugify } from "@/utils/formatters";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const params = [];
  servicesData.forEach((cat) => {
    cat.subCategories.forEach((sub) => {
      const subCategorySlug = slugify(sub.title);
      sub.items.forEach((item) => {
        params.push({ subCategorySlug, slug: item.slug });
      });
    });
  });
  return params;
}

export async function generateMetadata({ params }) {
  const { subCategorySlug, slug } = await params;

  let serviceItem = null;
  let parentCategory = null;

  for (const cat of servicesData) {
    for (const sub of cat.subCategories) {
      const found = sub.items.find((item) => item.slug === slug);
      if (found) {
        serviceItem = found;
        parentCategory = sub;
        break;
      }
    }
    if (serviceItem) break;
  }

  if (!serviceItem) {
    return { title: "Hizmet Bulunamadı | Hexa Dijital" };
  }

  const pageTitle =
    serviceItem.seoTitle || `Bursa ${serviceItem.name} | Hexa Dijital`;

  const pageKeywords = serviceItem.seoKeywords || [
    `bursa ${serviceItem.name.toLowerCase()}`,
    `${parentCategory?.title.toLowerCase()} bursa`,
    "hexa dijital bursa",
    "bursa dijital dönüşüm",
  ];

  return {
    title: pageTitle,
    description: serviceItem.description,
    keywords: pageKeywords,
    alternates: {
      canonical: `https://hexadijital.com/hizmetler/${subCategorySlug}/${slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: serviceItem.introText,
      url: `https://hexadijital.com/hizmetler/${subCategorySlug}/${slug}`,
      siteName: "Hexa Dijital",
      images: [
        {
          url: `https://hexadijital.com${serviceItem.image}`,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      locale: "tr_TR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: serviceItem.introText,
      images: [`https://hexadijital.com${serviceItem.image}`],
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { subCategorySlug, slug } = await params;

  let category = null;
  let currentService = null;
  let relatedServices = [];

  for (const cat of servicesData) {
    const sub = cat.subCategories.find(
      (s) => slugify(s.title) === subCategorySlug,
    );
    if (sub) {
      const foundItem = sub.items.find((item) => item.slug === slug);
      if (foundItem) {
        category = cat;
        currentService = foundItem;
        relatedServices = sub.items.filter((item) => item.slug !== slug);
        break;
      }
    }
  }

  if (!currentService) {
    notFound();
  }

  const schemaName = currentService.seoTitle
    ? currentService.seoTitle.split(" |")[0]
    : `Bursa ${currentService.name}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: schemaName,
    description: currentService.description,
    provider: {
      "@type": "ProfessionalService",
      name: "Hexa Dijital",
      url: "https://hexadijital.com",
    },
    url: `https://hexadijital.com/hizmetler/${subCategorySlug}/${slug}`,
    image: `https://hexadijital.com${currentService.image}`,
    ...(currentService.price &&
    currentService.price !== "Fiyat Alın" &&
    currentService.price !== ""
      ? {
          offers: {
            "@type": "Offer",
            price: currentService.price.replace(/\./g, ""),
            priceCurrency: "TRY",
            url: `https://hexadijital.com/hizmetler/${subCategorySlug}/${slug}`,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetail
        currentService={currentService}
        category={category}
        relatedServices={relatedServices}
        subCategorySlug={subCategorySlug}
      />
    </>
  );
}
