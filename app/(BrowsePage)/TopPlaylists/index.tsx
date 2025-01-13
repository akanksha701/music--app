'use client';
import React, { useCallback } from 'react';
import { useGetLanguageQuery } from '@/services/languages';
import MenubarComponent from '@/common/menubar/Menubar';
import { useNewRelease } from '@/hooks/useNewRelease';
import { redirect } from 'next/navigation';
import TopPlayList from './UI/UtilityComponents/TopPlayList';
import { topPlaylists } from '@/utils/apiRoutes';
import { generateUrl } from '@/utils/helpers';

const Index = () => {
  const { data: languageList, isLoading } = useGetLanguageQuery(undefined);
  const { setSelectedLanguage } = useNewRelease();

  const handleClick = useCallback(
    async (value?: string | null, index?: number | null) => {
      if (!value || index === null || index === undefined) {
        return; // Handle the case where value or index is invalid.
      }
      const newUrl = await generateUrl(topPlaylists, { language: value });
      setSelectedLanguage(value, index);
      redirect(newUrl);
    },
    [setSelectedLanguage]
  );
  if (isLoading) {
    // return <Loading />;
  }
  return (
    <div className="p-10">
      <div className="relative mx-10">
        <hr className="w-full border-gray-600" />
        <MenubarComponent
          data={languageList?.data}
          handleClick={handleClick as (value?: string | null, index?: number | null) => Promise<never>}
        />
        <hr className="w-full border-gray-600" /> 
        <TopPlayList />
      </div>
    </div>
  );
};

export default Index;
