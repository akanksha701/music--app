import { ESLint } from 'eslint';
import { after } from 'node:test';

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  experimental: {
    after:true,
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  images: {
    domains: [
      'cdn.pixabay.com',
      'img.clerk.com',
      'wallpapercave.com',
      'via.placeholder.com',
      'images.unsplash.com', // Added for Unsplash images
      'i.pinimg.com',
      'i.imgur.com',
      'media.gettyimages.com',
      'www.bollywoodhungama.com',
      'stat4.bollywoodhungama.in',
      'images.pexels.com',
      "media.istockphoto.com" ,
      "www.gettyimages.in",
      'encrypted-tbn0.gstatic.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dfm6prn5y/**',
      },
    ],
  },

  webpack: (config: any) => {
    config.stats = {
      logging: 'verbose',
    };
    config.cache = false;
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '/_next/static/media/',
          outputPath: 'static/media/',
        },
      },
    });
    return config;
  },
};

module.exports = nextConfig;
