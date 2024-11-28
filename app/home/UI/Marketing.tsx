import { usePathname } from "next/navigation";
import Cover from "./UtilityComponent/Cover";
import { DowloadSection } from "./UtilityComponent/DowloadSection";
import Footer from "../../Footer/Footer";
import Plans from "./UtilityComponent/Plans";
import Section from "./UtilityComponent/Section";
import PopularTrackCoverPage from "./UtilityComponent/PopularTrackCoverPage";
import Questions from "@/app/FAQ/UI/UtilityComponent/Questions";

const MusicPage = async () => {
  const res = await fetch("http://localhost:3000/api/marketing");
  const data = await res.json();
  return (
    <div className="min-h-screen scroll-smooth">
      <Cover data={data.coverTitle}/>
      <PopularTrackCoverPage  data={data?.popularTrackVideos}/>
      <Section data={data.feature} />
      {/* <Plans data={data?.pricingPlans} /> */}
      <Questions data={data?.questions} />
      {/* <DowloadSection /> */}
    </div>
  );
};

export default MusicPage;
