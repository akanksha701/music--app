"use client";
import React from "react";  
import Loading from "../loading";  
 
import { Breadcrumb } from "@/common/BreadCrumb/BreadCrumb";
 
import SmallGrid from "@/common/grid/SmallGrid";
import TabComp from "@/common/tab/TabComp";
import { useGetAllLanguageQuery } from "@/services/languages";
import { AddMoreButton } from "../LanguageAndGenre/UtilityComponent/NavigateButton";

 

const langugageColumns = [
  { header: "Langugage Name", accessor: "name" },
  {
    header: "Edit",
    accessor: "edit",
    className: "text-center",
  },
];

const  AllLanguageIndex = () => {
  
  const { data: languageData } =  useGetAllLanguageQuery({}); 
 

  if (!languageData) {
    // return <Loading />;
  }
 
  const LangData = [
    {
      value: "Languages",
      label: "Languages",
      content: (
        <SmallGrid
          label="language"
          columns={langugageColumns}
          data={languageData?.data}
          moreBox={<div className="hidden"></div>}
          addBox={<AddMoreButton label={"language"}></AddMoreButton>}
        />
      ),
    },
    
  ];
      const breadcrumbItems = [
          { label: "Home", href: "/" },
          { label: "LanguageAndGenre", href: "/LanguageAndGenre" },
          { label: `${LangData[0].label}`, href: null },
        ];

  return (
    <div className="flex justify-center items-start min-h-screen  bg-gray-100 pt-8">
      <div className="w-full sm:w-[500px] md:w-[600px] lg:w-[75%] px-4">
              <Breadcrumb items={breadcrumbItems} className="mb-6" />
              <h1 className="text-2xl font-bold  underline">Languages :</h1>

              <SmallGrid
          label="language"
          columns={langugageColumns}
          data={languageData?.data}
          moreBox={<div className="hidden"></div>}
          addBox={<AddMoreButton label={"language"}></AddMoreButton>}
        />
  
      </div>
    </div>
  );
};

export default  AllLanguageIndex;
