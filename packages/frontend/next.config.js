module.exports = {
  env: {
    SERVER_URL: process.env.SERVER_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    FRONTEND_PORT: process.env.FRONTEND_PORT,
    SERVER_PORT: process.env.SERVER_PORT,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
};
