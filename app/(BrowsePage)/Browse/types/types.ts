export const TAGS = {
  MUSIC: 'Musics',
  NEW_RELEASE: 'NewReleases',
  TOP_HITS: 'Top Hits',
  ALBUMS: 'Albums',
  TOP_ALBUMS: 'Top Albums',
  GENRE: 'Genres',
} as const;

export const LIST_NAME = {
  MUSIC: 'New Musics',
  NEW_RELEASE: 'NewReleases',
  TOP_HITS: 'Top Hits',
  ALBUMS: 'Albums',
  TOP_ALBUMS: 'Top Albums',
  GENRE: 'Top Genres',
} as const;

export interface IMusicProps {
  _id?: string;
  name?: string;
  artists?: string;
  audioUrl?: string;
  currency?: string;
  description?: string;
  email?: string;
  imageUrl?: string;
  price?: number;
  liked?: boolean;
  duration?: number;
  peaks?: Float32Array[];
}
export interface IBoxTypes {
  data: Array<{ _id: string; name: string; imageUrl: string; liked: boolean }>;
  className: string;
  title?: string;
  name: string;
  showLikeIcon: boolean;
  message: string;
  handleLikeToggle?: (id: string, name: string) => void;
}
export interface IMusicPlayCardProps {
  data: Array<IMusicProps>;
  name: string;
  handleLikeToggle: (id: string, name: string) => void;
}
