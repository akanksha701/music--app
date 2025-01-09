export const TAGS = {
  MUSIC: 'Musics',
  NEW_RELEASE: 'NewReleases',
  TOP_HITS: 'Top Hits',
  ALBUMS: 'Album',
  TOP_ALBUMS: 'Top Albums',
  GENRE: 'Genres',
  ALBUM_SONGS : 'AlbumSongs'
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
  name?: string | null;
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
  genre?:string,
  album?:string,
  language?:string
}
export interface IBoxTypes {
  data?: Array<{ _id: string; name: string; imageUrl?: string | null; liked: boolean }>;
  className?: string;
  title?: string;
  name?: string;
  showLikeIcon?: boolean;
  message?: string;
  handleLikeToggle?: (id: string, name: string) => void;
}
export interface IMusicPlayCardProps {
  data: Array<IMusicProps>;
  name: string;
  handleLikeToggle: (id: string, name: string) => void;
}

export interface IMemoizedCard {
  index: number;
  item: { _id: string; name: string; imageUrl?: string | null; liked: boolean };
  handleMusicClick: any;
  showLikeIcon?: boolean | undefined;
  handleLikeToggle?: (id: string, name: string) => void;
  NAME:string | undefined;
}


export interface IMemoizedMusicCard {
  index: number;
  item: IMusicProps;
  handleMusicClick: any;
  showLikeIcon?: boolean | undefined;
  handleLikeToggle?: (id: string , name: string) => void;
  NAME:string | undefined;
}