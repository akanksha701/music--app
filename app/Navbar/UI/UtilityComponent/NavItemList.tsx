import { NavbarItem, Link } from '@nextui-org/react';
import { redirect } from 'next/navigation';
import React from 'react';
import { IItem } from '../../types/types';

const NavItemList: React.FC = () => {
  const navItems: IItem[] = [
    { label: 'Pricing', route: '/Pricing' },
    { label: 'FAQ', route: '/FAQ' },
    { label: 'Browse', route: '/Browse' },
    { label: 'About', route: '/About' },
  ];

  return (
    <>
      {navItems.map((item: IItem) => (
        <NavbarItem key={item.route}>
          <Link
            onClick={() => redirect(item.route)}
            className="cursor-pointer"
            color="foreground"
          >
            {item.label}
          </Link>
        </NavbarItem>
      ))}
    </>
  );
};

export default NavItemList;
