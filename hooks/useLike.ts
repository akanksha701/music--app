import { create } from "zustand";

interface States {
  likedItems: Record<string, boolean>;
}

interface Actions {
  toggleLike: (id: string, name: string) => void;
}
export const useLike = create<States & Actions>((set) => ({
  likedItems: {},
  toggleLike: (id, name) =>
    set((state) => ({
      likedItems: {
        ...state.likedItems,
        [id]: !state.likedItems[id],
      },
    })),
}));
