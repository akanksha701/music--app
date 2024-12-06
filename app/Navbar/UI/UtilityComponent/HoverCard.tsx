import React from "react";
import { IHoverCardProps } from "../../types/types";

const HoverCard = (props: IHoverCardProps) => {
  const { topPlaylists, topArtists } = props;
  return (
    <div className="p-2 mx-10">
      <h2 className="text-2xl font-semibold ">What's Hot on SoundScape</h2>
      <div className="grid grid-cols-2 mt-3 ">
        <div>
          <div>New Releases</div>
          {topPlaylists.length > 0 &&
            topPlaylists.map((item, index) => (
              <p key={index} className="break-words whitespace-normal">
                {item}
              </p>
            ))}
        </div>
        <div>
          <div>New Releases</div>
          {topArtists.length > 0 &&
            topArtists.map((item, index) => (
              <p key={index} className=" break-words whitespace-normal">
                {item}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HoverCard;
