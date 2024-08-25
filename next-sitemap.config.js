/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL || "https://asantyping.com",
  generateRobotsTxt: true, // (optional) generate a robots.txt file
  sitemapSize: 7000, // (optional) split the sitemap if it exceeds the size limit
  // You can add more configuration options here
};
