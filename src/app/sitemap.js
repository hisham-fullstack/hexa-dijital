export const dynamic = "force-static";

import { servicesData } from "@/data/servicesData";
import { projectsData } from "@/data/projectsData";
import { sectoralData } from "@/data/sectoralData";
import { slugify } from "@/utils/formatters";

export default async function sitemap() {
  const baseUrl = "https://hexadijital.com";

  const staticRoutes = [
    "",
    "/hizmetler",
    "/projeler",
    "/iletisim",
    "/sektorel-cozumler",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const serviceRoutes = [];
  servicesData.forEach((cat) => {
    cat.subCategories.forEach((sub) => {
      const subCategorySlug = slugify(sub.title);

      serviceRoutes.push({
        url: `${baseUrl}/hizmetler/${subCategorySlug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      });

      sub.items.forEach((item) => {
        serviceRoutes.push({
          url: `${baseUrl}/hizmetler/${subCategorySlug}/${item.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        });
      });
    });
  });

  const projectRoutes = projectsData.map((project) => ({
    url: `${baseUrl}/projeler/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const sectoralRoutes = sectoralData.map((sector) => ({
    url: `${baseUrl}/sektorel-cozumler/${sector.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...projectRoutes,
    ...sectoralRoutes,
  ];
}
