import React from 'react';
import Sidebar from './UtilityComponent/Sidebar';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid grid-cols-[290px_1fr]">
      <div className="p-4 mx-2 mt-2 lg:sticky top-0 h-screen border-r border-gray-300">
        <Sidebar />
      </div>
      <div className="col-span-1 mx-2">
        {children}
      </div>
    </div>
  );
};

export default Layout;
