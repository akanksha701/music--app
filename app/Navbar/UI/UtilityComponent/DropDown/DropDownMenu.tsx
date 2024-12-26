'use client';
import { IItem } from '@/app/Navbar/types/types';
import Modal from '@/common/modal/modal';
import Tooltip from '@/common/tooltip/Tooltip';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { HoverCard } from '@/components/ui/hover-card';
import { useClerk, useUser } from '@clerk/nextjs';
import { DropdownItem, DropdownMenu } from '@nextui-org/react';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';

const menus: any = [
  { label: 'My Profile', key: 'my_profile', route: '/MyProfile' },
  { label: 'Add Language', key: 'add_language', route: '/AddLanguage' },
  { label: 'Add Genre', key: 'add_genre', route: '/AddGenre' },
  { label: 'Add Album', key: 'add_album', route: '/AddAlbum' },
  { label: 'Add Music', key: 'add_music', route: '/AddMusic' },
];
const DropDownMenu = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2 ">
          <p className="font-semibold ">Signed in as</p>
          <p className="font-semibold ">
            {user?.firstName} {user?.lastName}
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
          onClick={() => signOut({ redirectUrl: '/Signin' })}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </>
  );
};

export default DropDownMenu;
