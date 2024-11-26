'use client';
import SpotifyLogo from '@/public/spotify.svg';
import Image from 'next/image';
import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import NavItemList from './UtilityComponent/NavItemList';
import useFetchUserDetails from '@/hooks/customHooks/useFetchUserDetails';
import { useState } from 'react';
import DropDown from './UtilityComponent/DropDown/DropDown';

export default function NavbarPage() {
  const [user, setUser] = useState();
  useFetchUserDetails(setUser);

  return (
    <Navbar isBordered>
      <NavbarContent justify='start'>
        <NavbarBrand className='mr-4'>
          <Image
            src={SpotifyLogo}
            alt='Spotify Logo'
            width={30}
            height={30}
            className='justify-start mr-2'
          />

          <p className='sm:block font-bold text-inherit'>Spotify</p>
        </NavbarBrand>
        <NavbarContent className='sm:flex gap-7'>
          <NavItemList />
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as='div' className='items-center ' justify='end'>
        <DropDown />
      </NavbarContent>
    </Navbar>
  );
}
