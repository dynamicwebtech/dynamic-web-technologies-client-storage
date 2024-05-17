const isProd = process.env.NODE_ENV === "production";
const fs = require("fs-extra");

module.exports = {
  reactStrictMode: true,
  webpack5: true,

  // Fixes fs issue
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },

  //! This added clean urls and eliminates the .html extension aswell as linking
  //! CSS and JS with the trailingSlash
  assetPrefix: isProd ? "https://imaginative-elf-147987.netlify.app/" : "",
  trailingSlash: true,

  // This adds the _headers file after npm run build
  async afterBuild({ utils }) {
    await fs.copy("_headers", ".next/_headers");
  },
};
