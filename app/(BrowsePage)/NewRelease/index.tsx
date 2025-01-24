'use client';
import React, { useCallback } from 'react';
import NewRelease from './UI/UtilityComponent/NewRelease';
import { useGetLanguageQuery } from '@/services/languages';
import { useNewRelease } from '@/hooks/useNewRelease';
import { redirect } from 'next/navigation';
import { newRelease } from '@/utils/apiRoutes';
import { generateUrl } from '@/utils/helpers';
import MenubarComponent from '@/common/menubar/Menubar';
const Index = () => {
  const { data: languageList, isLoading } = useGetLanguageQuery({});
  const { setSelectedLanguage } = useNewRelease();
  const handleClick = useCallback(
    async (value: string, index: number) => {
      const newUrl = await generateUrl(newRelease, { language: value });
      setSelectedLanguage(value, index);
      redirect(newUrl);
    },
    [setSelectedLanguage]
  );
  if (isLoading) {
    // return <Loading/>;
  }
  return (
    <div className="">
      <div className="relative mx-10">
        <hr className="w-full border-gray-600 my-2" />
        <MenubarComponent 
          data={languageList?.data } 
          handleClick={handleClick as (value?: string | null, index?: number | null) => Promise<never>} />
        {/* <hr className="w-full border-gray-600" /> */}
        <NewRelease />
      </div>
    </div>
  );
};

export default Index;
