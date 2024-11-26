export interface Item {
  label?: string;
  route?: any;
  key?: string;
}
export interface DropDownItemProps {
    menus: Item[]; 
}