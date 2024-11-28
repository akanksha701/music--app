"use client";
import React, { useMemo } from "react";
import AccordionCard from "./AccordionCard";
import Button from "@/common/buttons/Button";
import { IQuestionProps } from "../../types/types";
const Questions = (props: IQuestionProps) => {
  const { data } = props;

  const memoizedComponent = useMemo(() => {
    return (
      <div className="flex flex-col items-center justify-center p-3 ">
        <div className="rounded p-4 relative w-full md:w-1/2">
          <div className="flex flex-col items-center justify-center">
            <p className="text-5xl ml-12 ">
              Frequently <span className="text-purple-600">Asked</span>
              <span className="ml-2">Questions</span>
            </p>
            <p className="p-2 mt-4">
              Beat licensing can be confusing. You might have a bunch of
              questions about it. We want to make sure that you're informed
              correctly. If you still have questions, don't hesitate to contact
              us. We're always here to help.
            </p>
          </div>
          <AccordionCard data={data} />
        </div>
        <div className="p-5">
          <Button name="Read More" />
        </div>
      </div>
    );
  }, [data]);

  return memoizedComponent;
};

export default Questions;
