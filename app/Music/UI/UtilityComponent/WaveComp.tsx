import React from "react";

const WaveComp = ({ ref, handleClick,seekPercentage}: any) => {
  return (
    <>
      <div
        ref={ref}
        className="cursor-pointer bg-gray-600 mx-4 rounded-lg w-full h-50"
        // style={{ width: `${seekPercentage}%` }}
        onClick={handleClick}
      ></div>
    </>
  );
};

export default WaveComp;
