'use client';
import { removeSession } from '@/app/actions/auth';
import { IUserDetails } from '@/app/MyProfile/types/types';
import { IItem } from '@/app/Navbar/types/types';
import { signOutWithGoogle } from '@/lib/firebase/auth';
import { RootState } from '@/Redux/store';
import { useFetchUserProfileQuery } from '@/services/user';
import { DropdownItem, DropdownMenu } from '@nextui-org/react';
import { redirect } from 'next/navigation';
import React from 'react';
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
  const { data: userSession } = useFetchUserProfileQuery({});
  const handleSignOut = async () => {
    await signOutWithGoogle();
    await removeSession();
    localStorage.clear();
    deleteCookie('accessToken');
  };
  const name = useSelector<RootState , IUserDetails|null>((state) => state?.session?.loggedInUser);
  if (!userSession) {
    return null;
  }
  return (
    <>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2 ">
          <p className="font-semibold ">Signed in as</p>
          <p className="font-semibold ">
            {name?.firstName + ' ' + name?.lastName}
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
