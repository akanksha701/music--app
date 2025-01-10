import { create } from 'zustand/react';

interface States {
  searchQuery: string;
}

interface Actions {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setSearchQuery:Function
}

export const useSearch = create<States & Actions>((set) => ({
  searchQuery: '',
  setSearchQuery: (query:string) => set({ searchQuery: query }),
}));

export default useSearch;
