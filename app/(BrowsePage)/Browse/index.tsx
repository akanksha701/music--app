"use client";
import { useUser } from "@clerk/nextjs";
import Loading from "@/app/loading";
import HeadLine from "./UI/UtilityComponent/HeadLine";
import MusicPlayCard from "./UI/UtilityComponent/MusicPlayCard";
import Box from "./UI/UtilityComponent/Card";
import { useGetTopHitsMusicsQuery } from "@/services/music";
import { useGetTopAlbumsQuery } from "@/services/album";

const Index = () => {
  const { user } = useUser();
  const { data: topHits } = useGetTopHitsMusicsQuery(undefined);
  const { data: topAlbums } = useGetTopAlbumsQuery(undefined);

  if (!user || !topHits || !topAlbums) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <div className="flex flex-col ">
      <HeadLine title="Top hits" subTitle="2024" />
      <hr className="w-full p-2 border-gray-600" />
      <MusicPlayCard data={topHits.data} />

      <div className="mt-8 p-3">
        <HeadLine
          title="Popular Albums"
          subTitle="Discover popular album musics"
        />
        <Box
          data={topAlbums.data}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        />
      </div>

      {/* <div className="mt-8 p-3 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white text-black rounded-lg shadow-lg p-4">
          <HeadLine title="Featured Artists" subTitle="Discover new music" />
          <Box
            data={songs}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          />
        </div>
        <div className="bg-white text-black rounded-lg shadow-lg p-4">
          <HeadLine title="Upcoming Releases" subTitle="Don't miss out!" />
          <Box
            data={albums}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          />
        </div>
      </div> */}
    </div>
  );
};

export default Index;
