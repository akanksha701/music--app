import { DropdownItem } from '@nextui-org/react';
import React from 'react';
import { redirect } from 'next/navigation';
import { DropDownItemProps, Item } from '../../types/types';

const DropDownItem = ({ menus }: DropDownItemProps) => {
  return (
    <>
      {menus.length > 0 &&
        menus.map((ele: Item, index: number) => (
          <DropdownItem key={ele.key} onClick={() => redirect(ele.route)}>
            {ele.label}
          </DropdownItem>
        ))}
    </>
  );
};

export default DropDownItem;
