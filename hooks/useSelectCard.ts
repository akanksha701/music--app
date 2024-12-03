import { create } from "zustand";

export enum Name {
  Category = "category",
  Artist = "artist",
}

interface States {
  selectedIndexCategory: number | null;
  selectedIndexArtist: number | null;
  artist: string | null;
  category: string | null;
  bgColor: string;
  selectedValues: {
    category: string | null;
    artist: string | null;
  };
}

interface Actions {
  setSelectedIndex: (index: number, name: Name, value: string) => void;
}

export const useSelectCard = create<States & Actions>((set) => ({
  selectedIndexCategory: null,
  selectedIndexArtist: null,
  category: null,
  artist: null,
  bgColor: "bg-white",
  selectedValues: { category: null, artist: null },

  setSelectedIndex: (index, name, value) => {
    set((state) => {
      let updatedSelectedIndexCategory = state.selectedIndexCategory;
      let updatedSelectedIndexArtist = state.selectedIndexArtist;
      let updatedCategory = state.category;
      let updatedArtist = state.artist;
      let updatedSelectedValues = { ...state.selectedValues };

      if (name === Name.Category) {
        updatedSelectedIndexCategory = updatedSelectedIndexCategory === index ? null : index;
        updatedCategory = updatedSelectedIndexCategory === null ? null : value;
        updatedSelectedValues.category = updatedCategory;
      }

      if (name === Name.Artist) {
        updatedSelectedIndexArtist =
          updatedSelectedIndexArtist === index ? null : index;
        updatedArtist = updatedSelectedIndexArtist === null ? null : value;
        updatedSelectedValues.artist = updatedArtist;
      }

      return {
        selectedIndexCategory: updatedSelectedIndexCategory,
        selectedIndexArtist: updatedSelectedIndexArtist,
        category: updatedCategory,
        artist: updatedArtist,
        selectedValues: updatedSelectedValues,
      };
    });
  },
}));
