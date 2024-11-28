import { NavbarItem, Link } from '@nextui-org/react';
import { redirect } from 'next/navigation';
import React from 'react';
import { IItem } from '../../types/types';


const NavItemList: React.FC = () => {
  const navItems: IItem[] = [
    { label: 'Browse', route: '/Browse' },
  ];

  return (
    <>
      {navItems.map((item: IItem) => (
        <NavbarItem key={item.route}> {/* Use a unique identifier as the key */}
          <Link
            onClick={() => redirect(item.route)}
            className='cursor-pointer'
            color='foreground'
          >
            {item.label}
          </Link>
        </NavbarItem>
      ))}
    </>
  );
};

export default NavItemList;
