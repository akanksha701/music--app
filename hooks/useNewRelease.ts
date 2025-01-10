import { create } from 'zustand/react';

interface States {
  language: string | null;
  activeButtonIndex:number | null
}

interface Actions {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setSelectedLanguage: Function
}

export const useNewRelease = create<States & Actions>((set) => ({
  language: null,
  activeButtonIndex:null,
  setSelectedLanguage: (value:string,index:number) => {
    set({ language: value,activeButtonIndex:index });
  },
}));
