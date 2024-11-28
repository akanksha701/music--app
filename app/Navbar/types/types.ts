export interface IItem {
  label?: string;
  route?: any;
  key?: string;
}
export interface IDropDownItemProps {
    menus: IItem[]; 
}