import { Avatar, Dropdown, DropdownTrigger } from '@heroui/react';
import React from 'react';
import DropDownMenu from './DropDownMenu';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/store';

const DropDown = () => {
  const imageUrl = useSelector<RootState, string | undefined>(
    (state) => state?.session?.loggedInUser?.imageUrl
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform border-2 border-purple-500 rounded-full"
          color="secondary"
          name="Jason Hughes"
          size="sm"
          src={imageUrl || 'https://example.com/default-avatar.jpg'} // Use fallback if no imageUrl
        />
      </DropdownTrigger>
      <DropDownMenu />
    </Dropdown>
  );
};

export default DropDown;
