import React from "react";

const WaveComp = ({ ref, handleClick,seekPercentage}: any) => {
  return (
    <>
      <div
        ref={ref}
        className="cursor-pointer mx-4 rounded-lg w-full h-50"
        onClick={handleClick}
      ></div>
    </>
  );
};

export default WaveComp;
