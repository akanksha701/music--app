import { IItem } from '@/app/Navbar/types/types';
import { useClerk, useUser } from '@clerk/nextjs';
import { DropdownItem, DropdownMenu } from '@nextui-org/react';
import { redirect } from 'next/navigation';
import React from 'react';

const menus: any = [
  { label: 'My profile', key: 'my_profile', route: '/MyProfile' },
];
const DropDownMenu = () => {
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <>
      <DropdownMenu aria-label='Profile Actions' variant='flat'>
        <DropdownItem key='profile' className='h-14 gap-2 '>
          <p className='font-semibold '>Signed in as</p>
          <p className='font-semibold '>
            {user?.firstName} {user?.lastName}
          </p>
        </DropdownItem>

        {menus.map((ele: IItem, index: number) => (
          <DropdownItem key={ele.key} onClick={() => redirect(ele.route)}>
            {ele.label}
          </DropdownItem>
        ))}

        <DropdownItem
          key='logout'
          color='danger'
          onClick={() => signOut({ redirectUrl: '/Signin' })}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </>
  );
};

export default DropDownMenu;
