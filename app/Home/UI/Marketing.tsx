import { fetchApi } from '@/utils/helpers';
import { Method } from '@/app/About/types/types';
import { getGenreDetails, getMarketingDetails } from '@/utils/apiRoutes';
import Cover from './UtilityComponent/Cover';
import PopularTrackCoverPage from './UtilityComponent/PopularTrackCoverPage';
import Views from './UtilityComponent/Views';
import CreatorsAndArtists from './UtilityComponent/CreatorsAndArtists';
import Section from './UtilityComponent/Section';
import CategoryCard from './UtilityComponent/CategoryCard';
import Artists from './UtilityComponent/Artists';
import Next from './UtilityComponent/Next';
import Questions from '@/app/FAQ/UI/Questions';
import ReadMore from './UtilityComponent/ReadMore';

const Marketing = async () => {
  const data = await fetchApi(getMarketingDetails, Method.GET);
  const genre = await fetchApi(getGenreDetails, Method.GET);
  return (
    <>
      <div className="min-h-screen scroll-smooth">
        <Cover data={data.coverTitle} appURL={process.env.APP_URL?.toString() || ''}/>
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
        <Next appURL={process.env.APP_URL?.toString() || ''}/>
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
