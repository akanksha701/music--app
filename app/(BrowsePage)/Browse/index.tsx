"use client";
import { useUser } from "@clerk/nextjs";
import Loading from "@/app/loading";
import HeadLine from "./UI/UtilityComponent/HeadLine";
import MusicPlayCard from "./UI/UtilityComponent/MusicPlayCard";
import Box from "./UI/UtilityComponent/Card";
import {
  useGetAllMusicsQuery,
  useGetTopAlbumsQuery,
  useGetTopGenreQuery,
  useGetTopHitsMusicsQuery,
  useToggleLikeMutation,
} from "@/services/like";
import { handleLikeToggle } from "@/hooks/useLike";
import { TAGS } from "./types/types";

const Index = () => {
  const { user } = useUser();
  const { data: topHits } = useGetTopHitsMusicsQuery(undefined);
  const { data: topAlbums } = useGetTopAlbumsQuery(undefined);
  const { data: newReleases } = useGetAllMusicsQuery({});
  const { data: topGenres } = useGetTopGenreQuery({});
  const [toggleLike] = useToggleLikeMutation();

  if (!user || !topHits || !topAlbums || !newReleases || !topGenres) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col ">
      <HeadLine title="Top Hits" subTitle="2024" />
      <hr className="w-full p-2 border-gray-600" />
      <MusicPlayCard
        data={topHits.data}
        name={TAGS.MUSIC}
        handleLikeToggle={(itemId) =>handleLikeToggle(itemId, TAGS.MUSIC, toggleLike)}
      />

      <div className="mt-8 p-3">
        <HeadLine
          title="Popular Albums"
          subTitle="Discover popular album musics"
        />
        <Box
          data={topAlbums.data}
          name={TAGS.ALBUMS}
          handleLikeToggle={(itemId) =>
            handleLikeToggle(itemId, TAGS.ALBUMS, toggleLike)
          }
          showLikeIcon={true}
          message="albums not found"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        />
      </div>
      <HeadLine title="New Releases" subTitle="2024" />
      <hr className="w-full p-2 border-gray-600" />
      <MusicPlayCard
        data={newReleases?.data?.data}
        name={TAGS.NEW_RELEASE}
        handleLikeToggle={(itemId) =>
          handleLikeToggle(itemId, TAGS.NEW_RELEASE, toggleLike)
        }
      />
      <div className="mt-8 p-3">
        <HeadLine
          title="Top Genres & Moods"
          subTitle="Discover popular genres musics"
        />
        <Box
          name={TAGS.GENRE}
          data={topGenres.data}
          handleLikeToggle={(itemId) =>handleLikeToggle(itemId, TAGS.GENRE, toggleLike)}
          showLikeIcon={true}
          message="genres not found"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        />
      </div>
    </div>
  );
};

export default Index;
