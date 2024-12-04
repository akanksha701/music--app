import React from "react";
import Sidebar from "./Browse/UI/UtilityComponent/Sidebar";
const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="lg:grid grid-cols-12 gap-2">
        <div className="col-span-2 ">
          <Sidebar />
        </div>
        <div className="col-span-10 p-4 bg-gradient-to-b min-h-screen">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
