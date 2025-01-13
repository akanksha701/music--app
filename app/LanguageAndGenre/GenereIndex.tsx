'use client';
import React from 'react';
  
import { usePagination } from '@/hooks/usePagination';
import { useGetGenreQuery } from '@/services/genre';
  
import SmallGrid from '@/common/grid/SmallGrid'; 
import { AddMoreButton, SeeMoreButton } from './UtilityComponent/NavigateButton';
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

const  GenereIndex = () => {
 
  const recordsPerPage = 6;
  const { page} = usePagination();
  const { data: genreData } = useGetGenreQuery({ page, recordsPerPage }); 
 
  if (!genreData) {
    return <Loading/>;
  }
 
  
   
  return (
    <div className="flex justify-center items-start   bg-gray-100 pt-8 pb-8">
      <div className="w-full sm:w-[500px] md:w-[600px] lg:w-[75%] px-4">
              
        <h1 className="text-2xl font-bold  underline">Genres :</h1>

        <SmallGrid
          label="genre"
          columns={genereColumns as Column[]}
          data={genreData?.data}
          moreBox={<SeeMoreButton url={'/allGenre'}/>}
          addBox={<AddMoreButton label={'genre'}/>}
        />
  
      </div>
    </div>
  );
};

export default  GenereIndex;
