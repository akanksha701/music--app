const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  reactStrictMode: true,
  experimental: {
    after:true,
    serverActions: {
      bodySizeLimit: '15mb',
    },
  },
  images: {
    domains: [
      'www.gettyimages.in',
      "media.istockphoto.com" ,
      'images.pexels.com',
      'plus.unsplash.com',
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
      'i1.sndcdn.com',
      'upload.wikimedia.org',
      'encrypted-tbn0.gstatic.com',
      'lh3.googleusercontent.com'
      // Added for Pinterest images
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dfm6prn5y/**',
      },
    ],
  },

  webpack: (config) => {
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
