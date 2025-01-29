'use client';

import React, { useState } from 'react';
import { redirect, usePathname } from 'next/navigation';
import { IItem } from '../../types/types';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { FaBars } from 'react-icons/fa'; // Hamburger icon
import { Button } from '@/components/ui/button';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
const navItems: IItem[] = [
  {
    label: 'Browse',
    route: '/Browse',
    key: '',
  },
  {

    label: 'Pricing',
    route: '/Pricing',
    key: '',
  },
  {
    label: 'FAQ',
    route: '/FAQ',
    key: '',
  },
  {
    label: 'About',
    route: '/About',
    key: '',
  },
];

const NavItemList: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to manage mobile menu visibility

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev); // Toggle mobile menu state
  };

  return (
    <div className="w-full">
      <NavbarContent>
        <div className=" flex space-x-4 ">
          {navItems.map((item: IItem) => {
            const isActive = pathname === item.route;
            return (
              <NavbarItem key={item.route}>
                <Link className='mx-6'>
                  <Button
                    onClick={() => redirect(item.route)}
                    className={`${isActive ? 'font-bold text-purple-600' : 'text-black'
                      } cursor-pointer`}
                  >
                    {item.label}
                  </Button>
                </Link>
              </NavbarItem>
            );
          })}
        </div>
      </NavbarContent>
    </div >
  );
};

export default NavItemList;
