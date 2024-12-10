export interface ImusicProps {
  _id: string; // unique identifier for the music
  name: string; // name of the song
  artists: string; // artists names as a comma-separated string
  audioUrl: string; // URL of the audio file
  currency: string; // currency for price, e.g., "USD"
  description: string; // description of the music
  email: string; // email associated with the music
  imageUrl: string; // URL for the image associated with the music
  price: number; // price of the
}
export interface IBoxTypes {
  data: Array<{ name: string; image: string }>;
  className: string;
  title?: string;
}
export interface IMusicPlayCardProps {
  data: Array<ImusicProps>;
}
