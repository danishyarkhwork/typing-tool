/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: "export",
  async rewrites() {
    return [
      {
        source: "/:path*/assets/:file",
        destination: "/assets/:file", // Map any assets folder to the root assets folder
      },
    ];
  },
};

export default nextConfig;
