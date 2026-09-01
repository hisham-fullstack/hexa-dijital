import SubCategoryDetail from "@/components/sections/Services/SubCategoryDetail";
import { servicesData } from "@/data/servicesData";
import { slugify } from "@/utils/formatters";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const params = [];
  servicesData.forEach((cat) => {
    cat.subCategories.forEach((sub) => {
      params.push({ subCategorySlug: slugify(sub.title) });
    });
  });
  return params;
}

export async function generateMetadata({ params }) {
  const { subCategorySlug } = await params;

  let foundSubCategory = null;
  let parentCategory = null;

  for (const cat of servicesData) {
    const sub = cat.subCategories.find(
      (s) => slugify(s.title) === subCategorySlug,
    );
    if (sub) {
      foundSubCategory = sub;
      parentCategory = cat;
      break;
    }
  }

  if (!foundSubCategory) {
    return { title: "Kategori Bulunamadı | Hexa Dijital" };
  }

  const title =
    foundSubCategory.seoTitle ||
    `Bursa ${foundSubCategory.title} Ajansı | Hexa Dijital`;

  const description =
    foundSubCategory.description || foundSubCategory.introText;
  const cleanHighlight = foundSubCategory.sloganHighlight
    ? foundSubCategory.sloganHighlight.replace(".", "")
    : "";

  const keywords =
    foundSubCategory.seoKeywords ||
    [
      `bursa ${foundSubCategory.title.toLowerCase()}`,
      `bursa ${foundSubCategory.title.toLowerCase()} ajansı`,
      `${parentCategory?.title.toLowerCase()} bursa`,
      "bursa dijital ajans",
      "bursa tasarım ve yazılım",
      "hexa dijital bursa",
      cleanHighlight,
      ...(foundSubCategory.metaTags || []),
    ].filter(Boolean);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://hexadijital.com/hizmetler/${subCategorySlug}`,
    },
    openGraph: {
      title,
      description: foundSubCategory.introText,
      url: `https://hexadijital.com/hizmetler/${subCategorySlug}`,
      siteName: "Hexa Dijital",
      images: [
        {
          url: `https://hexadijital.com${foundSubCategory.image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: foundSubCategory.introText,
      images: [`https://hexadijital.com${foundSubCategory.image}`],
    },
  };
}

export default async function SubCategoryPage({ params }) {
  const { subCategorySlug } = await params;

  let foundSubCategory = null;
  let parentCategory = null;

  for (const cat of servicesData) {
    const sub = cat.subCategories.find(
      (s) => slugify(s.title) === subCategorySlug,
    );
    if (sub) {
      foundSubCategory = sub;
      parentCategory = cat;
      break;
    }
  }

  if (!foundSubCategory) {
    notFound();
  }

  const schemaName = foundSubCategory.seoTitle
    ? foundSubCategory.seoTitle.split(" |")[0]
    : `Bursa ${foundSubCategory.title} Hizmetleri`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: schemaName,
    description: foundSubCategory.description || foundSubCategory.introText,
    url: `https://hexadijital.com/hizmetler/${subCategorySlug}`,
    numberOfItems: foundSubCategory.items?.length || 0,
    itemListElement: foundSubCategory.items?.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.seoTitle ? item.seoTitle.split(" |")[0] : `Bursa ${item.name}`,
      url: `https://hexadijital.com/hizmetler/${subCategorySlug}/${item.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubCategoryDetail
        subCategory={foundSubCategory}
        category={parentCategory}
        subCategorySlug={subCategorySlug}
      />
    </>
  );
}
