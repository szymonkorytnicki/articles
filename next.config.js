const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    title: process.env.TITLE,
    description: process.env.DESCRIPTION,
  },
};

module.exports = withVanillaExtract(nextConfig);
