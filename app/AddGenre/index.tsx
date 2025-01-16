'use client';
import React from 'react';
import TabComp from '@/common/tab/TabComp';
import TableComp from '@/common/table/TableComp';
import { usePagination } from '@/hooks/usePagination';
import AddGenre from './UI/UtilityComponent/AddGenre';
import { useGetGenreQuery } from '@/services/genre';

const columns = [
  { header: 'Genre Name', accessor: 'name' },
  {
    header: 'Edit',
    accessor: 'edit',
    className: 'text-center',
  },
];

const Index = () => {
  const recordsPerPage = 5;
  const { page, setPage } = usePagination();
  const { data: genreData ,error:isGenreError,isLoading} = useGetGenreQuery({ page, recordsPerPage });

  if (!genreData || isGenreError || isLoading) {
    return <></>;
  }

  const tabsData = [
    {
      value: 'Genres',
      label: 'Genres',
      content: (
        <TableComp
          message="A list of your recent languages."
          columns={columns}
          data={genreData.data}
          setPage={setPage}
          page={page}
          paginationData={genreData.pagination}
        />
      ),
    },
    {
      value: 'createGenre',
      label: 'Create Genre',
      content: <AddGenre />,
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
