"use client";
import React from "react";
import Loading from "../loading";
import TabComp from "@/common/tab/TabComp";
import { usePagination } from "@/hooks/usePagination";
import { useGetLanguageQuery } from "@/services/languages";
import { useGetArtistsQuery } from "@/services/artists";
import { useGetGenreQuery } from "@/services/genre";
import { useGetAlbumsQuery } from "@/services/album";
import AddMusic from "./UI/UtilityComponent/AddMusic";
import HeadLine from "../(BrowsePage)/Browse/UI/UtilityComponent/HeadLine";
import Box from "../(BrowsePage)/Browse/UI/UtilityComponent/Card";
import { MediaType } from "../(BrowsePage)/Browse/types/types";
import { useGetMusicsByUserIdQuery } from "@/services/music";

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
  const { data: musicData } = useGetMusicsByUserIdQuery({ slug: ""});
  const { data: languageData } = useGetLanguageQuery({});
  const { data: artistData } = useGetArtistsQuery({});
  const { data: genreData } = useGetGenreQuery({});
  const { data: albumData } = useGetAlbumsQuery({});
  if (!languageData || !artistData || !genreData || !albumData || !musicData) {
    return <Loading />;
  }

  const tabsData = [
    {
      value: "mymusics",
      label: "My Musics",
      content: (
        <>
          <HeadLine
            title="My Music"
            subTitle="Discover musics created by you"
          />
          <Box
            name={MediaType.MUSIC}
            data={musicData?.data}
            showLikeIcon={false}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          />
        </>
      ),
    },
    {
      value: "createmusic",
      label: "Create music",
      content: (
        <div className="flex flex-col items-center justify-items-center">
          <AddMusic
            languageList={languageData.data}
            genreList={genreData.data}
            artistList={artistData.data}
            albumList={albumData.data}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-8">
      <div className="lg:w-full sm:w-[500px] md:w-[600px]  px-4">
        <TabComp tabsData={tabsData} />
      </div>
    </div>
  );
};

export default Index;
