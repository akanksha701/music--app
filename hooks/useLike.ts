import { create } from "zustand";
import { useToggleLikeMutation } from "@/services/like"; // Import the mutation hook

interface States {
  likedItems: Record<string, boolean>;
}

interface Actions {
  toggleLocalLike: (id: string) => void; // Renamed to avoid conflict
  setLike: (id: string, liked: boolean) => void; // Optionally, directly set like status
}

export const useLike = create<States & Actions>((set) => ({
  likedItems: {},
  
  // Local state toggle, which just updates UI optimistically
  toggleLocalLike: (id) =>
    set((state) => ({
      likedItems: {
        ...state.likedItems,
        [id]: !state.likedItems[id],
      },
    })),

  // Directly update the like status
  setLike: (id, liked) => 
    set((state) => ({
      likedItems: {
        ...state.likedItems,
        [id]: liked,
      },
    })),
}));

export const handleLikeToggle = async (id: string, name: string, toggleLike: Function) => {
  try {

    const { toggleLocalLike } = useLike.getState();
    toggleLocalLike(id);
    await toggleLike({ id, name }).unwrap();
  } catch (error) {
    console.error("Error toggling like status:", error);
   
  }
};
