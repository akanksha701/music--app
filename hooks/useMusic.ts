import { create } from 'zustand';
import { IMusicProps } from '@/app/(BrowsePage)/Browse/types/types';
import { generateUrl } from '@/utils/helpers';
import { redirect } from 'next/navigation';

interface States {
  currentTrack: IMusicProps;
  isPlaying: boolean;
  currentSongIndex: number;
  volume: number;
  duration: number;
  currentTime: number;
  
}
interface Actions {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setCurrentTrack: Function;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setCurrentSongIndex:Function;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  handleMusicClick: Function;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setCurrentTime: Function;
}
export const formatTime =  (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

export const useMusic = create<States & Actions>((set) => ({
  currentTrack: {
    _id: '',
    name: '',
    artists: '',
    audioUrl: '',
    currency: 'string',
    description: 'string',
    email: 'string',
    imageUrl: 'string',
    price: 0,
    liked: false,
    duration: 0,
  },
  isPlaying: false,
  currentSongIndex: 0,
  volume: 1,
  duration: 0,
  currentTime: 0,

  setCurrentTrack: (track:IMusicProps) => set({ currentTrack: track, isPlaying: true }),
  setCurrentSongIndex: (index: number) => set({ currentSongIndex: index }),
  setCurrentTime: (time:number) => set({ currentTime: time }),
  handleMusicClick: async (music: IMusicProps, name: string) => {
    const url = await generateUrl('/Music', {
      name: music?.name as string,
      id: music?._id as string,
      type: name,
    });
    set({ currentTrack: music, isPlaying: true });
    redirect(url);
  },
}));
