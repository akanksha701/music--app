import Cover from '@/app/Home/UI/UtilityComponent/Cover';
import Section from '@/app/Home/UI/UtilityComponent//Section';
import PopularTrackCoverPage from '@/app/Home/UI/UtilityComponent/PopularTrackCoverPage';
import Questions from '@/app/FAQ/UI/Questions';
import { fetchApi } from '@/utils/helpers';
import ReadMore from '@/app/Home/UI/UtilityComponent/ReadMore';
import Views from '@/app/Home/UI/UtilityComponent/Views';
import { Method } from '@/app/About/types/types';
import { getGenreDetails, getMarketingDetails } from '@/utils/apiRoutes';
import CategoryCard from '@/app/Home/UI/UtilityComponent//CategoryCard';
import Artists from '@/app/Home/UI/UtilityComponent//Artists';
import Next from'@/app/Home/UI/UtilityComponent/Next';
import CreatorsAndArtists from '@/app/Home/UI/UtilityComponent/CreatorsAndArtists';

const Marketing = async () => {
  const data = await fetchApi(getMarketingDetails, Method.GET);
  const genre = await fetchApi(getGenreDetails, Method.GET);
  return (
    <>
      <div className="min-h-screen scroll-smooth">
        <Cover data={data.coverTitle} />
        <PopularTrackCoverPage
          data={data?.popularTrackVideos}
          users={data?.users}
          title={data.sliderTitle}
          popularTrackTitle={data.popularTracksTitle}
        />
        <Views
          title={data?.views[0].title}
          viewImg={data?.views[0]?.viewImg || null}
          views={data?.views[1].views}
          points={data?.views[2].points}
        />
        <CreatorsAndArtists
          creatorsAndArtists={data.creatorsAndArtists}
          title={data.creatorArtistTitle}
        />
        <Section data={data.feature} />

        <CategoryCard genreList={genre.data} title={data.categoryTitle} />
        <Artists artistsData={data.artistList} title={data.artistTitle} />
        <Next />
        <Questions
          data={data?.questions.slice(0, 5)}
          faqDescription={data?.faqDescription}
        />
        <ReadMore />
      </div>
    </>
  );
};

export default Marketing;
