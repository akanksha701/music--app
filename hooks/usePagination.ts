import { create } from "zustand/react";

interface States {
  page: number;
  data: any[] | null;
  paginationData: any | null;
}

interface Actions {
  setPage: (page: number) => void;
  setData: (data: any[]) => void;
  setPaginationData: (paginationData: any) => void;
}

export const usePagination = create<States & Actions>((set) => ({
  page: 1,
  data: null,
  paginationData: null,
  setPage: (page: number) => set({ page }),
  setData: (data: any[]) => set({ data }),
  setPaginationData: (paginationData: any) => set({ paginationData }),
}));
