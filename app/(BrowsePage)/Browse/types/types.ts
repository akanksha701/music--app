export const MediaType = {
  MUSIC: "music" as string,
  ALBUM: "album" as string,
  GENRE: "genre" as string,
};
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
  liked:boolean
}
export interface IBoxTypes {
  data: Array<{ name: string; imageUrl: string }>;
  className: string;
  title?: string;
  name: string;
}
export interface IMusicPlayCardProps {
  data: Array<IMusicProps>;
  name: string;
}
