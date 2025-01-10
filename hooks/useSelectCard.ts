import { create } from 'zustand';

export enum Name {
  // eslint-disable-next-line no-unused-vars
  Category = 'category',
  // eslint-disable-next-line no-unused-vars
  Artist = 'artist',
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setSelectedIndex: Function
}

export const useSelectCard = create<States & Actions>((set) => ({
  selectedIndexCategory: null,
  selectedIndexArtist: null,
  category: null,
  artist: null,
  bgColor: 'bg-white',
  selectedValues: { category: null, artist: null },

  setSelectedIndex: (index:number, name:string, value:string) => {
    set((state) => {
      let updatedSelectedIndexCategory = state.selectedIndexCategory;
      let updatedSelectedIndexArtist = state.selectedIndexArtist;
      let updatedCategory = state.category;
      let updatedArtist = state.artist;
      const updatedSelectedValues = { ...state.selectedValues };

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
