/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repoName = "hexa-dijital";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath:
    process.env.NEXT_PUBLIC_BASE_PATH !== undefined
      ? process.env.NEXT_PUBLIC_BASE_PATH
      : isProd
        ? `/${repoName}`
        : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
