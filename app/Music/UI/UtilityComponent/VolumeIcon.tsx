import React from "react";
import { IoVolumeHighSharp, IoVolumeMuteSharp } from "react-icons/io5";
import { IVolumeProps } from "../../types/types";

const VolumeIcon = (props: IVolumeProps) => {
  const { isMuted, handleClick } = props;
  return (
    <>
      {isMuted ? (
        <IoVolumeMuteSharp size={24} color="white" onClick={handleClick} />
      ) : (
        <IoVolumeHighSharp size={24} color="white" onClick={handleClick} />
      )}
    </>
  );
};

export default VolumeIcon;
