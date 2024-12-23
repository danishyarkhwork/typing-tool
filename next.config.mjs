import withPWA from "next-pwa";

const config = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/middleware-manifest.json$/],
});

export default {
  ...config,
  swcMinify: true, // You can enable minification
  compiler: {
    styledComponents: true,
  },
};
