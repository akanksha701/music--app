'use client';
import React from 'react';
import { useGetAllGenreQuery } from '@/services/genre';
import { Breadcrumb } from '@/common/BreadCrumb/BreadCrumb';
import SmallGrid from '@/common/grid/SmallGrid';
import { AddMoreButton } from '../LanguageAndGenre/UtilityComponent/NavigateButton';
import Loading from './loading';
import { Column } from '@/common/types/types';



const genereColumns = [
  { header: 'Genre Name', accessor: 'name' },
  {
    header: 'Edit',
    accessor: 'edit',
    className: 'text-center',
  },
];

const AllGenereIndex = () => {
  const { data: genreData } = useGetAllGenreQuery({});
  if (!genreData) {
    return <Loading/>;
  }

  const GenreData = [
    {
      value: 'Genres',
      label: 'Genres',
      content: (
        <SmallGrid
          label="genre"
          columns={genereColumns as Column[]}
          data={genreData?.data}
          moreBox={<div className="hidden"></div>}
          addBox={<AddMoreButton label={'genre'}></AddMoreButton>}
        />
      ),
    },

  ];
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'LanguageAndGenre', href: '/LanguageAndGenre' },
    { label: `${GenreData[0].label}`, href: null },
  ];

  return (
    <div className="flex justify-center items-start min-h-screen  bg-gray-100 pt-8">
      <div className="w-full sm:w-[500px] md:w-[600px] lg:w-[75%] px-4">
        <Breadcrumb items={breadcrumbItems as Array<{ href: string; label: string }>} className="mb-6" />
        <h1 className="text-2xl font-bold  underline">Genres :</h1>
        <SmallGrid
          label="genre"
          columns={genereColumns as Column[]}
          data={genreData?.data}
          moreBox={<div className="hidden"></div>}
          addBox={<AddMoreButton label={'genre'}></AddMoreButton>}
        />
      </div>
    </div>
  );
};

export default AllGenereIndex;
