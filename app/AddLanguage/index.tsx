'use client';
import React from 'react';
import TabComp from '@/common/tab/TabComp';
import TableComp from '@/common/table/TableComp';
import { usePagination } from '@/hooks/usePagination';
import { useGetLanguageQuery } from '@/services/languages';
import AddLanguage from './UI/UtilityComponent/AddLanguage';

const columns = [
  { header: 'Language Name', accessor: 'name' },
  {
    header: 'Edit',
    accessor: 'edit',
    className: 'text-center',
  },
];

const Index = () => {
  const recordsPerPage = 5;
  const { page, setPage } = usePagination();
  const { data: languageData ,error:isError,isLoading} = useGetLanguageQuery({ page, recordsPerPage });

  if (!languageData || isError ||isLoading) {
    return <></>;
  }

  const tabsData = [
    {
      value: 'languages',
      label: 'Languages',
      content: (
        <TableComp
          message="A list of your recent languages."
          columns={columns}
          data={languageData.data}
          setPage={setPage}
          page={page}
          paginationData={languageData.pagination}
        />
      ),
    },
    {
      value: 'createlanguage',
      label: 'Create Language',
      content: <AddLanguage />,
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
