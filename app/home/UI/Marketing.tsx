import Cover from "./UtilityComponent/Cover";
import Section from "./UtilityComponent/Section";
import PopularTrackCoverPage from "./UtilityComponent/PopularTrackCoverPage";
import Questions from "@/app/FAQ/UI/Questions";
import { fetchApi } from "@/utils/helpers";
import ReadMore from "./UtilityComponent/ReadMore";
import Views from "./UtilityComponent/Views";

const Marketing = async () => {
  const data = await fetchApi("/api/marketing", "GET");
  return (
    <>
      <div className="min-h-screen scroll-smooth">
        <Cover data={data.coverTitle} />
        <PopularTrackCoverPage
          data={data?.popularTrackVideos}
          users={data?.users}
        />
        <Views
          title={data?.views[0].title}
          viewImg={data?.views[0]?.viewImg || null}
          views={data?.views[1].views}
          points={data?.views[2].points}
        />
        <Section data={data.feature} />
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
