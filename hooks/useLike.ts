import { IMusicProps } from "@/app/(BrowsePage)/Browse/types/types";
import { setCurrentTrack } from "@/Redux/features/musicPlayer/musicPlayerSlice";
import { create } from "zustand";

interface States {
  likedItems: Record<string, boolean>;
}

interface Actions {
  toggleLocalLike: (id: string) => void;
  setLike: (id: string, liked: boolean) => void;
}

export const useLike = create<States & Actions>((set) => ({
  likedItems: {},

  toggleLocalLike: (id) =>
    set((state) => ({
      likedItems: {
        ...state.likedItems,
        [id]: !state.likedItems[id],
      },
    })),

  setLike: (id, liked) =>
    set((state) => ({
      likedItems: {
        ...state.likedItems,
        [id]: liked,
      },
    })),
}));

export const handleLikeToggle = async (
  id: string,
  name: string,
  toggleLike: Function,
  currentTrack?: IMusicProps,
  dispatch?: Function
) => {
  try {
    const { toggleLocalLike } = useLike.getState();
    toggleLocalLike(id);
    await toggleLike({ id, name }).unwrap();
    if (id === currentTrack?._id) {
      const updatedTrack = {
        ...currentTrack,
        liked: !currentTrack?.liked as boolean,
      };
      dispatch && dispatch(setCurrentTrack(updatedTrack));
    }
  } catch (error) {
    console.error("Error toggling like status:", error);
  }
};
