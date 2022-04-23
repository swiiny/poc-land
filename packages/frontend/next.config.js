const path = require('path');

module.exports = {
  env: {
    SERVER_URL: process.env.SERVER_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    FRONTEND_PORT: process.env.FRONTEND_PORT,
    SERVER_PORT: process.env.SERVER_PORT,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, os: false, path: false };
    config.resolve.modules.push(path.resolve('./'));
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
};
