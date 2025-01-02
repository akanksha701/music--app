"use client";
import React from "react";

import TableComp from "@/common/table/TableComp";
import { usePagination } from "@/hooks/usePagination";
import Loading from "../loading";
import { useGetAllGenreQuery } from "@/services/genre";


import { Breadcrumb } from "@/common/BreadCrumb/BreadCrumb";

import SmallGrid from "@/common/grid/SmallGrid";
import TabComp from "@/common/tab/TabComp";
import { AddMoreButton } from "../LanguageAndGenre/UtilityComponent/NavigateButton";



const genereColumns = [
  { header: "Genre Name", accessor: "name" },
  {
    header: "Edit",
    accessor: "edit",
    className: "text-center",
  },
];

const AllGenereIndex = () => {


  const { page, setPage } = usePagination();
  const { data: genreData } = useGetAllGenreQuery();
  console.log("ALLADATA", genreData)
  if (!genreData) {
    // return <Loading />;
  }

  const GenreData = [
    {
      value: "Genres",
      label: "Genres",
      content: (
        <SmallGrid

          label="genre"
          columns={genereColumns}
          data={genreData?.data}

          moreBox={<div className="hidden"></div>}
          addBox={<AddMoreButton label={"genre"}></AddMoreButton>}
        />
      ),
    },

  ];
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "LanguageAndGenre", href: "/LanguageAndGenre" },
    { label: `${GenreData[0].label}`, href: null },
  ];

  return (
    <div className="flex justify-center items-start min-h-screen  bg-gray-100 pt-8">
      <div className="w-full sm:w-[500px] md:w-[600px] lg:w-[75%] px-4">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        {/* <TabComp tabsData={GenreData} /> */}

        <h1 className="text-2xl font-bold  underline">Genres :</h1>

        <SmallGrid

          label="genre"
          columns={genereColumns}
          data={genreData?.data}

          moreBox={<div className="hidden"></div>}
          addBox={<AddMoreButton label={"genre"}></AddMoreButton>}
        />
      </div>
    </div>
  );
};

export default AllGenereIndex;
