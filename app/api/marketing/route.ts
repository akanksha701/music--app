import { NextResponse } from 'next/server';
import marketingData from './marketing.json';
export async function GET() {
  try {
    return NextResponse.json({
      status: 200,
      coverTitle:marketingData.coverTitle,
      features:marketingData.features,
      pricingPlans:marketingData.pricingPlans,
      questions:marketingData.questions,
      footerContent:marketingData.footerContent,
      popularTrackVideos:marketingData.popularTrackVideos,
      faqDescription:marketingData.description,
      users:marketingData.users,
      views:marketingData.views,
      // moodList:marketingData.moodList,
      artistList:marketingData.artistList,
      creatorsAndArtists:marketingData.creatorsAndArtists,
      sliderTitle:marketingData.sliderTitle,
      popularTracksTitle:marketingData.popularTrackTitle,
      creatorArtistTitle:marketingData.creatorArtistTitle,
      categoryTitle:marketingData.categoryTitle,
      artistTitle:marketingData.artistTitle
    });
  } catch (error) {
    return NextResponse.json({ status: 500,error:error, message: 'Internal Server Error' });
  }
}
