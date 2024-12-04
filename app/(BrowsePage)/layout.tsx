import React from "react";
import Sidebar from "./Browse/UI/UtilityComponent/Sidebar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="lg:grid grid-cols-12 gap-2 min-h-screen">
      <div className="col-span-2 sticky top-0 h-screen">
        <Sidebar />
      </div>
      <div className="col-span-10 p-4 bg-gradient-to-b h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
