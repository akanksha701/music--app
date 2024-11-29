import React from "react";
import Questions from "./UI/Questions";
import { fetchApi } from "@/utils/helpers";

const Index = async () => {
  const data = await fetchApi("/api/marketing", "GET");
  return (
    <>
      <Questions data={data?.questions} faqDescription={data?.faqDescription} />
    </>
  );
};

export default Index;
