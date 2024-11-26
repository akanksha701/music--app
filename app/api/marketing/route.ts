import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const features = [
      {
        id: 1,
        title: 'High Quality Audio',
        description:
          'Experience crystal clear sound with our HD streaming quality',
        image: '/images/Audio Waves.png',
      },
      {
        id: 2,
        title: 'Offline Mode',
        description: 'Download your favorite tracks and listen offline',
        image: '/images/offline.png',
      },
      {
        id: 3,
        title: 'Smart Playlists',
        description: 'Personalized playlists based on your taste',
        image: '/images/video-file.png',
      },
    ];

    const pricingPlans = [
      {
        id: 1,
        title: 'Free',
        description: 'Perfect for casual listeners',
        price: '$0',
        features: [
          '✓ Ad-supported listening',
          '✓ Basic audio quality',
          '✓ Shuffle play',
        ],
      },
      // You can add more plans here
    ];

    return NextResponse.json({ status: 200, features, pricingPlans });
  } catch (error) {
    console.error('Error fetching marketing data:', error);
    return NextResponse.json({ status: 500, message: 'Internal Server Error' });
  }
}
