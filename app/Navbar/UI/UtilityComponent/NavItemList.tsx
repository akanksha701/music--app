import { NavbarItem, Link } from '@nextui-org/react';
import { redirect } from 'next/navigation';
import React from 'react';

interface Item {
  label: string;
  route: string;
}

const NavItemList: React.FC = () => {
  const navItems: Item[] = [
    { label: 'Home', route: '/Home' },
  ];

  return (
    <>
      {navItems.map((item: Item) => (
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
