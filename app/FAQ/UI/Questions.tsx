"use client";
import React, { useMemo } from "react";
import AccordionCard from "./UtilityComponent/AccordionCard";
import Button from "@/common/buttons/Button";
import { IQuestionProps } from "../types/types";
const Questions = (props: IQuestionProps) => {
  const { data,faqDescription } = props;
  const memoizedComponent = useMemo(() => {
    return (
      <div className="flex flex-col items-center justify-center p-3 ">
        <div className="rounded p-4 relative w-full md:w-1/2">
          <div className="flex flex-col items-center justify-center">
            <p className="text-5xl ml-12 font-semibold ">
              Frequently <span className="text-purple-600">Asked</span>
              <span className="ml-2">Questions</span>
            </p>
            <p className="px-30 mt-4">
              {faqDescription?.description}
            </p>
          </div>
          <AccordionCard data={data} />
        </div>
      </div>
    );
  }, [data,faqDescription]);

  return memoizedComponent;
};

export default Questions;
