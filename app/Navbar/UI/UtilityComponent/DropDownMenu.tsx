import { useClerk, useUser } from '@clerk/nextjs';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import React from 'react';
import DropDownItem from './DropDownItem';
import { IItem } from '../../types/types';

const menus:IItem[] = [
  { label: 'My profile', key: 'my_profile', route: '/myprofile' },
];
const DropDownMenu = () => {
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <>
      <Dropdown placement='bottom-end'>
        <DropdownTrigger>
          <Avatar
            isBordered
            as='button'
            className='transition-transform'
            color='secondary'
            name='Jason Hughes'
            size='sm'
            src={
              (user?.unsafeMetadata?.imageUrl as string) ||
              'data:image/jpeg;base64,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'
            }
          />
        </DropdownTrigger>
        <DropdownMenu aria-label='Profile Actions' variant='flat'>
          <DropdownItem key='profile' className='h-14 gap-2 '>
            <p className='font-semibold '>Signed in as</p>
            <p className='font-semibold '>
              {user?.firstName} {user?.lastName}
            </p>
          </DropdownItem>

          <DropDownItem menus={menus} />

          <DropdownItem
            key='logout'
            color='danger'
            onClick={() => signOut({ redirectUrl: '/Signin' })}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default DropDownMenu;
