import React, { forwardRef, Ref } from 'react';
import { IWaveProps } from '../../types/types';

const WaveComp = forwardRef<any, IWaveProps>(
  ({  handleClick }, ref) => {
    return (
      <div
        ref={ref}
        onClick={handleClick}
        className="cursor-pointer mx-4 rounded-lg w-1/2 h-50"
      ></div>
    );
  }
);


export default WaveComp;
