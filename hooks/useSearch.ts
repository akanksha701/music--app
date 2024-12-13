import { create } from "zustand/react";

interface States {
  searchQuery: string;
}

interface Actions {
  setSearchQuery: (query: string) => void;
}

export const useSearch = create<States & Actions>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default useSearch;
