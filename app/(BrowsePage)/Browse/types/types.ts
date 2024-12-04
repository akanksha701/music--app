export interface ImusicProps {
  musicId?: string;
  name?: string;
  coverUrl?: string;
  artist?: string;
}
export interface IBoxTypes {
  data: Array<{ name: string; image: string }>;
  className: string;
}
export interface IMusicPlayCardProps {
  data: Array<ImusicProps>;
}
