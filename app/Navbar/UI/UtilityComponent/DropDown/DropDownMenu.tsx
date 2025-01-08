'use client';
import { removeSession } from '@/app/actions/auth';
import { IItem } from '@/app/Navbar/types/types';
import { signOutWithGoogle } from '@/lib/firebase/auth';
import { useFetchUserProfileQuery } from '@/services/user';
import { DropdownItem, DropdownMenu } from '@nextui-org/react';
import { redirect } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';

const menus: any = [
  { label: 'My Profile', key: 'my_profile', route: '/MyProfile' },
  { label: 'Add Language', key: 'add_language', route: '/AddLanguage' },
  { label: 'Add Genre', key: 'add_genre', route: '/AddGenre' },
  { label: 'Add Album', key: 'add_album', route: '/AddAlbum' },
  { label: 'Add Music', key: 'add_music', route: '/AddMusic' },
];
const DropDownMenu = () => {
  const {
    data: userSession,
    isLoading,
    isError,
  } = useFetchUserProfileQuery({});
  const handleSignOut = async () => {
    await signOutWithGoogle();
    await removeSession();
    localStorage.clear();
  };
  const name: any = useSelector<any | any>(
    (state) => state?.session?.loggedInUser
  );
  if (!userSession) {
    return null;
  }
  return (
    <>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2 ">
          <p className="font-semibold ">Signed in as</p>
          <p className="font-semibold ">
            {name.firstName + ' ' + name?.lastName}
          </p>
        </DropdownItem>

        {menus.map((ele: IItem, index: number) => (
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
