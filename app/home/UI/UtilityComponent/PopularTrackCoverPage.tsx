import React, { useMemo } from "react";
import CarouselPopularTracks from "./CarouselPopularTracks";
import { IPopularTracksTypes } from "../../types/types";

const PopularTrackCoverPage = (props: IPopularTracksTypes) => {
  const { data } = props;

  const memoizedContent = useMemo(() => {
    return (
      <section className="text-black">
        <div className="p-20">
          <CarouselPopularTracks data={data} />
        </div>
      </section>
    );
  }, [data]); 

  return memoizedContent;
};

export default PopularTrackCoverPage;
