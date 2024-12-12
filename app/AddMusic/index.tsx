"use client";
import React from "react";
import Loading from "../loading";
import TabComp from "@/common/tab/TabComp";
import TableComp from "@/common/table/TableComp";
import { usePagination } from "@/hooks/usePagination";
import { useGetLanguageQuery } from "@/services/languages";
import { useGetArtistsQuery } from "@/services/artists";
import { useGetGenreQuery } from "@/services/genre";
import { useGetAlbumsQuery } from "@/services/album";
import AddMusic from "./UI/UtilityComponent/AddMusic";
import { useGetAllMusicsQuery } from "@/services/like";

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

const Index = () => {
  const recordsPerPage = 5;
  const { page, setPage } = usePagination();
  const { data: musicData } = useGetAllMusicsQuery({ page, recordsPerPage });
  const { data: languageData } = useGetLanguageQuery({});
  const { data: artistData } = useGetArtistsQuery({});
  const { data: genreData } = useGetGenreQuery({});
  const { data: albumData } = useGetAlbumsQuery({});
  if (!languageData || !artistData || !genreData || !albumData || !musicData) {
    return <Loading />;
  }

  const tabsData = [
    {
      value: "musics",
      label: "Musics",
      content: (
        <TableComp
          message="A list of your recent musics."
          columns={columns}
          data={musicData.data.data}
          setPage={setPage}
          page={page}
          paginationData={musicData.data.pagination}
        />
      ),
    },
    {
      value: "createmusic",
      label: "Create music",
      content: (
        <AddMusic
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
