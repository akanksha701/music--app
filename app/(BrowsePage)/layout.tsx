import React from 'react';
import Sidebar from './Browse/UI/UtilityComponent/Sidebar';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="lg:grid grid-cols-12 gap-2 lg:min-h-screen scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
      <div className="col-span-2 lg:sticky top-0 h-screen">
        <Sidebar />
      </div>
      <div className="col-span-10 p-4 bg-gradient-to-b lg:h-screen lg:overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
