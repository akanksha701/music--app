"use client";
import React, { useEffect } from "react";
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
import { IMusicProps, MediaType } from "../(BrowsePage)/Browse/types/types";
import { useGetMusicsByUserIdQuery } from "@/services/music";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import useSearch from "@/hooks/useSearch";

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
  const { data: musicData } = useGetMusicsByUserIdQuery({ slug: "" });
  const { data: languageData } = useGetLanguageQuery({});
  const { data: artistData } = useGetArtistsQuery({});
  const { data: genreData } = useGetGenreQuery({});
  const { data: albumData } = useGetAlbumsQuery({});
  const { searchQuery, setSearchQuery } = useSearch();

  if (!languageData || !artistData || !genreData || !albumData || !musicData) {
    return <Loading />;
  }

  const debouncedSearch = debounce((query) => setSearchQuery(query), 100);

  const filteredMusicData = musicData?.data.filter((music: IMusicProps) =>
    music.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabsData = [
    {
      value: "mymusics",
      label: "My Musics",
      content: (
        <>
          <div className="flex items-center mb-6 space-x-20">
            <div>
              <HeadLine
                title="My Musics"
                subTitle="Discover musics created by you"
              />
            </div>
            <div className="lg:w-1/2 sm:w-1/4 md:w-1/6">
              <div className="w-1/2 flex items-center p-2 bg-white dark:bg-gray-800 rounded-lg shadow">
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => debouncedSearch(e.target.value)}
                  className="flex-1 text-gray-900 dark:text-white bg-transparent border-none focus:ring-0"
                />
              </div>
            </div>
          </div>

          {/* Pass filtered music data to the Box component */}
          <Box
            name={MediaType.MUSIC}
            data={filteredMusicData} // Use filtered data
            showLikeIcon={false}
            message={filteredMusicData?.length === 0 ? "No musics found" : ""}
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
