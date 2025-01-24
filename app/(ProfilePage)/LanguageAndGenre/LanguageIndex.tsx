'use client';
import React from 'react';
import { usePagination } from '@/hooks/usePagination';
import { useGetLanguageQuery } from '@/services/languages';
import SmallGrid from '@/common/grid/SmallGrid';
import { AddMoreButton, SeeMoreButton } from './UtilityComponent/NavigateButton';
import Loading from './loading';
import { Column } from '@/common/types/types';
 
const languageColumns:Column[] = [
  { header: 'Language Name', accessor: 'name' },
  { header: 'Edit', accessor: 'edit',className: 'text-center'},
]; 

const LanguageIndex = () => {

  const recordsPerPage = 6;
  const { page } = usePagination();
  const { data: languageData, isLoading, isError } = useGetLanguageQuery({ page, recordsPerPage });
  if (isLoading) {
    return <Loading/>;
  }  
  if (isError) {
    return <div>No Language Found</div>;
  }  

  return (
    <div className="flex justify-center items-start  bg-gray-100 pt-16 pb-8 ">
      <div className="w-full sm:w-[500px] md:w-[600px] lg:w-[75%] px-4">
        <h1 className="text-2xl font-bold  underline">Languages :</h1>
        <SmallGrid
          label="language"
          columns={languageColumns}
          data={languageData?.data}
          moreBox={<SeeMoreButton url={'/allLanguage'}/>}
          addBox={<AddMoreButton label={'language'}/>}
        />
      </div>
    </div>
  );
};

export default LanguageIndex;

