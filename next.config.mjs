/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  // Özel domain bağlandığında kök dizinden çalışması için basePath temizlendi
  basePath: "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
