'use client';
import { removeSession } from '@/app/actions/auth';
<<<<<<< HEAD
import { IItem } from '@/app/Navbar/types/types';
import Modal from '@/common/modal/modal';
import Tooltip from '@/common/tooltip/Tooltip';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { HoverCard } from '@/components/ui/hover-card';
import { useUserSession } from '@/hooks/customHooks/use-user-session';
import { signOutWithGoogle } from '@/lib/firebase/auth';
import { useFetchUserProfileQuery } from '@/services/user';
import { useClerk, useUser } from '@clerk/nextjs';
import { DropdownItem, DropdownMenu } from '@nextui-org/react';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
=======
import { IUserDetails } from '@/app/MyProfile/types/types';
import { IItem } from '@/app/Navbar/types/types';
import { signOutWithGoogle } from '@/lib/firebase/auth';
import { RootState } from '@/Redux/store';
import { useFetchUserProfileQuery } from '@/services/user';
import { DropdownItem, DropdownMenu } from '@nextui-org/react';
import { redirect } from 'next/navigation';
import React from 'react';
>>>>>>> f6869aab30e9b84697a9d105ef09db87074fe67b
import { useSelector } from 'react-redux';

const menus: any = [
  { label: 'My Profile', key: 'my_profile', route: '/MyProfile' },
  {
    label: 'Language & Genre',
    key: 'LanguageAndGenre',
    route: '/LanguageAndGenre',
  },
  { label: 'Add Album', key: 'add_album', route: '/Album' },
  { label: 'Add Music', key: 'add_music', route: '/AddMusic' },
];
const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`; // Expire the cookie immediately
};
const DropDownMenu = () => {
<<<<<<< HEAD
  const {
    data: userSession,
    isLoading,
    isError,
  } = useFetchUserProfileQuery({});
=======
  const { data: userSession } = useFetchUserProfileQuery({});
>>>>>>> f6869aab30e9b84697a9d105ef09db87074fe67b
  const handleSignOut = async () => {
    await signOutWithGoogle();
    await removeSession();
    localStorage.clear();
<<<<<<< HEAD
  };
  const name: any = useSelector<any | any>(
    (state) => state?.session?.loggedInUser
  );
=======
    deleteCookie('accessToken');
  };
  const name = useSelector<RootState , IUserDetails|null>((state) => state?.session?.loggedInUser);
>>>>>>> f6869aab30e9b84697a9d105ef09db87074fe67b
  if (!userSession) {
    return null;
  }
  return (
    <>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2 ">
          <p className="font-semibold ">Signed in as</p>
          <p className="font-semibold ">
<<<<<<< HEAD
            {name.firstName + ' ' + name?.lastName}
=======
            {name?.firstName + ' ' + name?.lastName}
>>>>>>> f6869aab30e9b84697a9d105ef09db87074fe67b
          </p>
        </DropdownItem>

        {menus.map((ele: IItem) => (
          <DropdownItem
            key={ele.key}
            onClick={() => {
              redirect(ele.route);
            }}
          >
            {ele.label}
          </DropdownItem>
        ))}

        <DropdownItem
          key="logout"
          color="danger"
          onClick={() => handleSignOut()}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </>
  );
};

export default DropDownMenu;
