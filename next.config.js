/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    title: process.env.TITLE,
    description: process.env.DESCRIPTION,
  },
};

module.exports = nextConfig;
