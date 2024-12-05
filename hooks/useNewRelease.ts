import { create } from "zustand";

interface States {
  language: string | null;
  activeButtonIndex:number | null
}

interface Actions {
  setSelectedLanguage: (value: string,index:number) => void;
}

export const useNewRelease = create<States & Actions>((set) => ({
  language: null,
  activeButtonIndex:null,
  setSelectedLanguage: (value,index) => {
    set({ language: value,activeButtonIndex:index });
  },
}));
