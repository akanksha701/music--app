export const MediaType = {
  MUSIC: "Musics" as string,
  ALBUM: "Albums" as string,
  GENRE: "Genres" as string,
};

export const TAGS = {
  MUSIC: "Musics",
  NEW_RELEASE: "NewReleases",
  TOP_HITS: "TopHits",
  ALBUMS: "Albums",
  TOP_ALBUMS: "TopAlbums",
  GENRE: "Genres",
} as const;

export interface IMusicProps {
  _id: string;
  name: string;
  artists: string;
  audioUrl: string;
  currency: string;
  description: string;
  email: string;
  imageUrl: string;
  price: number;
  liked: boolean;
  duration?:number
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
