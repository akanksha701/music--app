import React  from 'react';
import Image from 'next/image';
import CarouselPopularTracks from '@/app/Home/UI/UtilityComponent/CarouselPopularTracks';
interface IPopularTracksTypes {
  data: Array<string>;
  users: Array<string>;
  title:string
  popularTrackTitle:string
}
const PopularTrackCoverPage = (props: IPopularTracksTypes) => {
  const { data, users,title,popularTrackTitle } = props;
  return (
    <section>
      <div className="flex flex-col items-center justify-center  text-balance">
        <p className="text-xl py-10">{popularTrackTitle}</p>
        <div className="flex flex-row items-center justify-center ">
          {users.map((ele, index) => (
            <div className="px-5" key={index}>
              <Image
                key={index}
                src={ele}
                alt="play"
                width={80}
                height={80}
              />
            </div>
          ))}
        </div>

        <div className="px-20 py-20">
          <h3 className="text-3xl font-semibold
            text-slate-900 mb-8 sm:text-4xl md:text-5xl lg:text-4xl text-transparent bg-gradient-to-r 
            from-indigo-500 via-pink-500 to-purple-600 bg-clip-text
            ">
            {title}
          </h3>
          <hr className="my-5 border-t border-purple-600" />
          <CarouselPopularTracks data={data} />

        </div>
      </div>
    </section>
  );


};

export default PopularTrackCoverPage;
