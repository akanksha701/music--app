// Index.tsx (Server Component)
import React from "react";
import Addmusic from "./UI/UtilityComponent/Addmusic";
import { fetchGenresAndLanguages } from "../actions/getGenresAndLanguage";
import TabComp from "@/common/tab/TabComp";
import TableComp from "@/common/table/TableComp";
import { fetchApi } from "@/utils/helpers";
import { music } from "@/utils/apiRoutes";
import { Method } from "../About/types/types";

const columns = [
  { header: "Song Title", accessor: "name" },
  { header: "Artist(s)", accessor: "artists" },
  { header: "Price", accessor: "price", className: "text-right" },
  {
    header: "Edit",
    accessor: "edit", 
    className: "text-center", // Center align the edit button
  },
];


const Index = async () => {
  const { genreList, languageList, artistList, albumList } =
    await fetchGenresAndLanguages();
  const { data } = await fetchApi(music, Method.GET);
  if (!genreList || !languageList || !artistList || !albumList || !data) {
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
          data={data}
          // handleEdit={handleEdit} // Pass the handleEdit function to the TableComp
        />
      ),
    },
    {
      value: "createmusic",
      label: "Create music",
      content: (
        <Addmusic
          languageList={languageList}
          genreList={genreList}
          artistList={artistList}
          albumList={albumList}
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
