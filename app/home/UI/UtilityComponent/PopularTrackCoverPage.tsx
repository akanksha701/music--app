import React, { useMemo } from "react";
import CarouselPopularTracks from "./CarouselPopularTracks";
import { IPopularTracksTypes } from "../../types/types";
import Pandora from "@/public/pandora.svg";
import Image from "next/image";

const PopularTrackCoverPage = (props: IPopularTracksTypes) => {
  const { data, users } = props;

  const memoizedContent = useMemo(() => {
    return (
      <section>
        <div className="flex flex-col items-center justify-center  text-balance">
          <p className="text-xl py-10">Get your beats featured by our users</p>
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
            <h3 className="text-3xl font-semibold">
              Sound for all types of content
            </h3>
            <hr className="my-5 border-t border-purple-600" />
            <CarouselPopularTracks data={data} />
          </div>
        </div>
      </section>
    );
  }, [data]);

  return memoizedContent;
};

export default PopularTrackCoverPage;
