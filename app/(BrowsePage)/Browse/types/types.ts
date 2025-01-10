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
  language?: string | null;
  duration?: string | number;
  description?: string;
  artists?: string;
  liked?: boolean;
  email?: string | null;
  price?: number;
  currency?: string;
  imageUrl?: string;
  audioUrl?: string;
  peaks?: Float32Array[] | Float32Array | null;
  playCount?: number;
  createdAt?: string;
  genre?:string,
  album?:string,
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
  handleMusicClick: (index:number) => void;
  showLikeIcon?: boolean | undefined;
  handleLikeToggle?: (id: string, name: string) => void;
  NAME:string | undefined;
}


export interface IMemoizedMusicCard {
  index: number;
  item: IMusicProps;
  handleMusicClick: (index:number,item:IMusicProps) => void;
  showLikeIcon?: boolean | undefined;
  handleLikeToggle?: (id: string , name: string) => void;
  NAME:string | undefined;
}




type Music = {
  _id: string;
  name: string;
  language?: string | null;
  duration: string | number;
  description: string;
  artists: string;
  liked: boolean;
  email?: string | null;
  price: number;
  currency: string;
  imageUrl: string;
  audioUrl: string;
  peaks?: Float32Array | null;
  playCount?: number;
  createdAt?: string;
};

type Album = {
  _id: string;
  name: string;
  liked: boolean;
  imageUrl: string;
  description: string;
  count: number;
};

type Genre = {
  _id: string;
  name: string;
  imageUrl: string;
  liked: boolean;
  musics: { id: string }[];
  totalPlayTime: number;
};

type ApiResponse<T> = {
  status: number;
  data: T;
};

type MusicApiResponse = ApiResponse<Music[]>;
type AlbumApiResponse = ApiResponse<Album[]>;
type GenreApiResponse = ApiResponse<Genre[]>;
type NewReleasesResponse = ApiResponse<{ data: Music[] }>;

export interface MusicDataResponse {
  topHits: MusicApiResponse;
  topAlbums: AlbumApiResponse;
  newReleases: NewReleasesResponse;
  topGenres: GenreApiResponse;
};
