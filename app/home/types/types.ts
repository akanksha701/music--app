export interface musicProps {
  musicId?: string;
  name?: string;
  coverUrl?: string;
  artist?: string;
}
export interface BoxTypes {
  data: Array<{ name: string; image: string }>;
  className: string;
}
export interface MusicPlayCardProps {
  data: Array<musicProps>;
}
