import React from 'react';
import Image from 'next/image';

interface INoDataFound {
  name: string;
}
export const NoDataFound = (props: INoDataFound) => {
  const { name } = props;
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center p-6   rounded-md">
        <Image
          src="/images/There is no music.jpg"
          alt="No data illustration"
          width={250}
          height={250}
        />
        <h2 className="mt-4 text-xl font-semibold text-gray-700">
          No {name} Found
        </h2>
        <p className="mt-2 text-gray-600">
          {`We couldn't find any ${name.toLowerCase()} to display.`}
        </p>
      </div>
    </div>
  );
};

export default NoDataFound;