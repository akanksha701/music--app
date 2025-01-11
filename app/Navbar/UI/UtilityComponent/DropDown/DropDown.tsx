import { Avatar, Dropdown, DropdownTrigger } from '@nextui-org/react';
import React from 'react';
import DropDownMenu from './DropDownMenu';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/store';

const DropDown = () => {
  const imageUrl = useSelector<RootState,string | undefined>((state) => state?.session?.loggedInUser?.imageUrl);
  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            name="Jason Hughes"
            size="sm"
            src={imageUrl as string || ''}
          />
        </DropdownTrigger>
        <DropDownMenu />
      </Dropdown>
    </>
  );
};

export default DropDown;
