// next.config.mjs
import withPWA from "next-pwa";

const nextConfig = {
  // Other Next.js config options can go here
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);
