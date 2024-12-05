"use client";
import React, { useCallback } from "react";
import { useGetLanguageQuery } from "@/services/languages";
import Loading from "@/app/loading";
import MenubarComponent from "@/common/menubar/Menubar";
import NewRelease from "../NewRelease";
import { useNewRelease } from "@/hooks/useNewRelease";
import { redirect } from "next/navigation";
import queryString from "query-string";
import TopPlayList from "./UI/UtilityComponents/TopPlayList";

const Index = () => {
  const { data: languageList, isLoading } = useGetLanguageQuery(undefined);
  const { setSelectedLanguage } = useNewRelease();
  
  const handleClick = useCallback(
    (value: string, index: number) => {
      const newUrl = queryString.stringifyUrl(
        {
          url: "http://localhost:3000/TopPlaylists",
          query: { language: value },
        },
        { skipNull: true }
      );
      setSelectedLanguage(value, index);
      redirect(newUrl);
    },
    [setSelectedLanguage, redirect]
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-10">
      <div className="relative mx-10">
        <hr className="w-full border-gray-600" />
        <MenubarComponent
          data={languageList?.languageList}
          handleClick={handleClick}
        />
        <hr className="w-full border-gray-600" />
        <TopPlayList />
      </div>
    </div>
  );
};

export default Index;
