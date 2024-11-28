import { DropdownItem } from '@nextui-org/react';
import React from 'react';
import { redirect } from 'next/navigation';
import { IDropDownItemProps, IItem } from '../../types/types';

const DropDownItem = ({ menus }: IDropDownItemProps) => {
  return (
    <>
      {menus.length > 0 &&
        menus.map((ele: IItem, index: number) => (
          <DropdownItem key={ele.key} onClick={() => redirect(ele.route)}>
            {ele.label}
          </DropdownItem>
        ))}
    </>
  );
};

export default DropDownItem;
