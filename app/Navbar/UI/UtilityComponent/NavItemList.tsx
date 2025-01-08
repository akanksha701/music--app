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

const navItems: IItem[] = [
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
      <NavigationMenu>
        <NavigationMenuList>
          <Button
            onClick={() => redirect('/Browse')}
            className={`${
              pathname === '/Browse' ? 'text-purple-600' : 'text-black'
            } cursor-pointer hidden sm:block`} // Hide on mobile
          >
            Browse
          </Button>

          <div className="sm:hidden flex items-center">
            <Button className="text-black p-2" onClick={toggleMobileMenu}>
              <FaBars size={24} />
            </Button>
          </div>

          {isMobileMenuOpen && (
            <div className="sm:hidden flex flex-col mt-20">
              <Button
                onClick={() => redirect('/Browse')}
                className={`${
                  pathname === '/Browse' ? 'text-purple-600' : 'text-black'
                } block px-4 py-2 text-sm`}
              >
                Browse
              </Button>

              {navItems.map((item: IItem) => {
                const isActive = pathname === item.route;
                return (
                  <Button
                    key={item.route}
                    onClick={() => redirect(item.route)}
                    className={`${
                      isActive ? 'text-purple-600' : 'text-black'
                    } block px-4 py-2 text-sm`}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </div>
          )}

          {/* Desktop Navigation Items */}
          <div className="hidden sm:flex space-x-4 sm:space-x-8 px-4 sm:px-0">
            {navItems.map((item: IItem) => {
              const isActive = pathname === item.route;
              return (
                <NavigationMenuItem key={item.route}>
                  <NavigationMenuLink asChild>
                    <Button
                      onClick={() => redirect(item.route)}
                      className={`${
                        isActive ? 'text-purple-600' : 'text-black'
                      } cursor-pointer`}
                    >
                      {item.label}
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavItemList;
