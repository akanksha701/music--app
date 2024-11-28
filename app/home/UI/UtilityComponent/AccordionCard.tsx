"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IAccoridionProps } from "../../types/types";
const AccordionCard = (props: IAccoridionProps) => {
  const { data } = props;
  return (
    <>
      <Accordion type="single" collapsible className="w-full mt-4  rounded ">
        {data?.map((question, index: number) => (
          <div key={index}>
            <AccordionItem value={question?.question}>
              <AccordionTrigger>{question?.question}</AccordionTrigger>
              <AccordionContent>{question?.description}</AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>
    </>
  );
};

export default AccordionCard;
