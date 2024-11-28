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
      <Plans data={data?.pricingPlans} />
      <Questions data={data?.questions} />
      <DowloadSection/>
      <Footer data={data?.footerContent}/>
    </div>
  );
};

export default MusicPage;
