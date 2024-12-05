"use client";
import React, { useCallback } from "react";
import NewRelease from "./UI/UtilityComponent/NewRelease";
import MenubarComponent from "@/common/menubar/Menubar";
import { useGetLanguageQuery } from "@/services/languages";
import Loading from "@/app/loading";
import { useNewRelease } from "@/hooks/useNewRelease";
import queryString from "query-string";
import { redirect } from "next/navigation";
import { newRelease } from "@/utils/apiRoutes";

const Index = () => {
  const { data: languageList, isLoading } = useGetLanguageQuery(undefined);
  const { setSelectedLanguage } = useNewRelease();
  const handleClick = useCallback(
    (value: string, index: number) => {
      const newUrl = queryString.stringifyUrl(
        {
          url: newRelease,
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
        <NewRelease />
      </div>
    </div>
  );
};

export default Index;
