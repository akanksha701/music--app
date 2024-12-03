import Cover from './UtilityComponent/Cover';
import Section from './UtilityComponent/Section';
import PopularTrackCoverPage from './UtilityComponent/PopularTrackCoverPage';
import Questions from '@/app/FAQ/UI/Questions';
import { fetchApi } from '@/utils/helpers';
import ReadMore from './UtilityComponent/ReadMore';
import Views from './UtilityComponent/Views';
import { Method } from '@/app/About/types/types';
import { getMarketingDetails } from '@/utils/apiRoutes';
import CategoryCard from './UtilityComponent/CategoryCard';
import Artists from './UtilityComponent/Artists';
import Next from './UtilityComponent/Next';
import CreatorsAndArtists from './UtilityComponent/CreatorsAndArtists';
const Marketing = async () => {
  const data = await fetchApi(getMarketingDetails, Method.GET);

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
        <Questions
          data={data?.questions.slice(0, 5)}
          faqDescription={data?.faqDescription}
        />
        <ReadMore />
        <CategoryCard moodList={data.moodList} title={data.categoryTitle} />
        <Artists artistsData={data.artistList} title={data.artistTitle}/>
        <Next />
      </div>
    </>
  );
};

export default Marketing;
