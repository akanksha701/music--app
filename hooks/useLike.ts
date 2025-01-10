import { IMusicProps } from '@/app/(BrowsePage)/Browse/types/types';
import { setCurrentTrack } from '@/Redux/features/musicPlayer/musicPlayerSlice';
import { create } from 'zustand';

interface States {
  likedItems: Record<string, boolean>;
}

interface Actions {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  toggleLocalLike: Function;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setLike: Function;
}

export const useLike = create<States & Actions>((set) => ({
  likedItems: {},

  toggleLocalLike: (id: string) =>
    set((state) => ({
      likedItems: {
        ...state.likedItems,
        [id]: !state.likedItems[id],
      },
    })),

  setLike: (id: string, liked: boolean) =>
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  toggleLike: Function,
  currentTrack?: IMusicProps,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
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
      if(dispatch)
      {
        dispatch(setCurrentTrack(updatedTrack));
      }
    }
    return true;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
