import Cover from "./UtilityComponent/Cover";
import { DowloadSection } from "./UtilityComponent/DowloadSection";
import Footer from "./UtilityComponent/Footer";
import Plans from "./UtilityComponent/Plans";
import Questions from "./UtilityComponent/Questions";
import Section from "./UtilityComponent/Section";

const MusicPage = async () => {
  const res = await fetch("http://localhost:3000/api/marketing");
  const data = await res.json();
  return (
    <div className="min-h-screen">
      <Cover />
      <Section data={data.feature} />
      <Questions data={data?.questions} />
      <DowloadSection/>
      <Plans data={data?.pricingPlans} />
      <Footer data={data?.footerContent}/>
    </div>
  );
};

export default MusicPage;
