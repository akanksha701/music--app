import React from 'react';
import Image from 'next/image';
import { IViewProps } from '../../types/types';

const Views = (props: IViewProps) => {
  const { title, viewImg, views, points } = props;
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-12 md:py-16  rounded-lg shadow-lg">
      <div className="flex-shrink-0">
        <Image
          className="rounded-lg shadow-lg"
          alt="music"
          width={400}
          height={400}
          src={viewImg}
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-center mt-8 md:mt-0 md:pl-12">
        <div className="text-center text-3xl font-semibold text-slate-900 mb-8 sm:text-4xl md:text-5xl lg:text-4xl text-transparent bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-600 bg-clip-text">
          {title}
        </div>

        <div className="flex flex-wrap mt-4 md:mt-0 md:ml-12 text-sm md:text-base text-gray-600">
          {points.map((point, index) => (
            <div key={index}>
              <div className="px-4 py-2" key={index}>
                <span className="font-semibold text-gray-800">{point}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap mt-10 md:mt-0 md:ml-12">
        {views.length > 0 &&
          views.map((view, index) => {
            return (
              <div
                key={index}
                className={`flex flex-col items-center px-8 py-4 ${view?.color} text-white rounded-lg shadow-md m-2`}
              >
                <div className="text-4xl font-bold">{view.views}</div>
                <div className="text-xl">{view.title}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Views;
