'use client';
import SoundScapeLogo from '@/public/images/SoundScapeLogo.png';
import Image from 'next/image';
import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import DropDown from './UtilityComponent/DropDown/DropDown';
import { redirect } from 'next/navigation';
import NavItemList from './UtilityComponent/NavItemList';
import { useUserSession } from '@/hooks/customHooks/use-user-session';

export default function NavbarPage({ session }: { session: string | null; }) {
  const userSession = useUserSession(session);
  return (
    <>
      <Navbar  >
        <NavbarBrand
          className="flex items-center justify-start text-left cursor-pointer"
          onClick={() => redirect('/')}
        >
          <Image
            src={SoundScapeLogo}
            alt="SoundScape Logo"
            width={50}
            height={50}
            className="mr-2"
          />
          <p className="font-bold text-inherit">SoundScape</p>
        </NavbarBrand>
        <NavbarContent className="flex gap-6">
          <NavItemList />
        </NavbarContent>
        <NavbarContent as="div" className="flex items-center gap-4" justify="end">
          <DropDown />
        </NavbarContent>
      </Navbar>
    </>
  );
}
