import { create } from "zustand";

interface States {
  language: string | null;
}

interface Actions {
  setSelectedLanguage: (value: string) => void;
}

export const useNewRelease = create<States & Actions>((set) => ({
  language: null,
  setSelectedLanguage: (value) => {
    set({ language: value });
  },
}));
