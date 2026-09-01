import ProjectDetail from "@/components/sections/Projects/ProjectDetail";
import { projectsData } from "@/data/projectsData";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Proje Bulunamadı | Hexa Dijital" };
  }

  const title = `${project.title} - Vaka Analizi | Hexa Dijital Bursa`;

  return {
    title,
    description: project.description,
    keywords: [
      project.title.toLowerCase(),
      project.client.toLowerCase(),
      `${project.category.toLowerCase()} bursa`,
      "vaka analizi",
      "hexa dijital projeler",
      "bursa yazılım ajansı portfolyo",
    ].filter(Boolean),
    alternates: {
      canonical: `https://hexadijital.com/projeler/${slug}`,
    },
    openGraph: {
      title,
      description: project.description,
      url: `https://hexadijital.com/projeler/${slug}`,
      siteName: "Hexa Dijital",
      images: [
        {
          url: `https://hexadijital.com${project.image}`,
          width: 1200,
          height: 630,
          alt: `${project.title} - Hexa Dijital Projesi`,
        },
      ],
      locale: "tr_TR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      images: [`https://hexadijital.com${project.image}`],
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const projectIndex = projectsData.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projectsData[projectIndex];
  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${project.title} - Dijital Dönüşüm Vaka Analizi`,
    description: project.description,
    image: `https://hexadijital.com${project.image}`,
    author: {
      "@type": "Organization",
      name: "Hexa Dijital",
      url: "https://hexadijital.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Hexa Dijital",
      logo: {
        "@type": "ImageObject",
        url: "https://hexadijital.com/assets/logos/hexa_logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://hexadijital.com/projeler/${slug}`,
    },
    articleBody: `${project.challenge} ${project.solution}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetail project={project} nextProject={nextProject} />
    </>
  );
}
