export interface IItem {
  key: string;
  label: string;
  route: string;
}
export interface IDropDownItemProps {
  menus: IItem[];
}

export interface IHoverCardProps {
  whatsHot?: Array<string>;
  topPlaylists: Array<string>;
  topArtists: Array<string>;
}
