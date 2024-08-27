import withPWA from "next-pwa";

const config = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  buildExcludes: [/middleware-manifest.json$/],
});

export default {
  ...config,
  output: "export", // Ensure static export mode is enabled
};
