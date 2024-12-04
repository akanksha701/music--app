import React from "react";
import NewRelease from "./UI/UtilityComponent/NewRelease";
import MenubarComponent from "@/common/menubar/Menubar";

const Index = () => {
  return (
    <div className="p-10 ">
      <div className="relative mx-10">
        <MenubarComponent />
        <NewRelease />
      </div>
    </div>
  );
};

export default Index;
