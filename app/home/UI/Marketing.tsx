import Cover from "./UtilityComponent/Cover";
import Section from "./UtilityComponent/Section";
import PopularTrackCoverPage from "./UtilityComponent/PopularTrackCoverPage";
import Questions from "@/app/FAQ/UI/UtilityComponent/Questions";

const MusicPage = async () => {
  const res = await fetch("http://localhost:3000/api/marketing");
  const data = await res.json();
  return (
    <div className="min-h-screen scroll-smooth">
      <Cover data={data.coverTitle} />
      <PopularTrackCoverPage data={data?.popularTrackVideos} />
      <Section data={data.feature} />
      <Questions data={data?.questions} />
    </div>
  );
};

export default MusicPage;
