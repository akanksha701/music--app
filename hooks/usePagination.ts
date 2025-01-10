import { IMusicProps } from '@/app/(BrowsePage)/Browse/types/types';
import { create } from 'zustand/react';

interface States {
  page: number;
  data: IMusicProps[] | null;
  // paginationData: any | null;
}

interface Actions {
  // eslint-disable-next-line no-unused-vars
  setPage: (page: number) => void; 
  // eslint-disable-next-line no-unused-vars
  setData: (data: IMusicProps[]) => void; 
  // setPaginationData: (paginationData: any) => void; // specify the type of `paginationData` and return type `void`
}

export const usePagination = create<States & Actions>((set) => ({
  page: 1,
  data: null,
  paginationData: null,
  setPage: (page: number) => set({ page }),
  setData: (data: IMusicProps[]) => set({ data }),
  // setPaginationData: (paginationData: any) => set({ paginationData }),
}));
