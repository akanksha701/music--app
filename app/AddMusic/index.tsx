"use client";
import React from "react";
import Addmusic from "./UI/UtilityComponent/Addmusic";
import TabComp from "@/common/tab/TabComp";
import TableComp from "@/common/table/TableComp";
import { useMusic } from "@/hooks/useMusic";
import { useGetAllMusicsQuery } from "@/services/music";
import { useGetLanguageQuery } from "@/services/languages";
import { useGetArtistsQuery } from "@/services/artists";
import { useGetGenreQuery } from "@/services/genre";

const columns = [
  { header: "Song Title", accessor: "name" },
  { header: "Artist(s)", accessor: "artists" },
  { header: "Price", accessor: "price", className: "text-right" },
  {
    header: "Edit",
    accessor: "edit",
    className: "text-center",
  },
];

const recordsPerPage = 5;

const Index = () => {
  const { page } = useMusic();

  const { data: musicData } = useGetAllMusicsQuery({ page, recordsPerPage });
  const { data: languageData } = useGetLanguageQuery(undefined);
  const { data: artistData } = useGetArtistsQuery(undefined);
  const { data: genreData } = useGetGenreQuery(undefined);
  const { data: albumData } = useGetGenreQuery(undefined);

  if (!languageData || !artistData || !genreData || !albumData || !musicData) {
    return null;
  }
  const tabsData = [
    {
      value: "musics",
      label: "Musics",
      content: (
        <TableComp
          message="A list of your recent invoices."
          columns={columns}
          data={musicData.data.data}
          paginationData={musicData.data.pagination}
        />
      ),
    },
    {
      value: "createmusic",
      label: "Create music",
      content: (
        <Addmusic
          languageList={languageData.data}
          genreList={genreData.data}
          artistList={artistData.data}
          albumList={albumData.data}
        />
      ),
    },
  ];

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-8">
      <div className="w-full sm:w-[500px] md:w-[600px] lg:w-[700px] px-4">
        <TabComp tabsData={tabsData} />
      </div>
    </div>
  );
};

export default Index;
