'use client';
import { useUser } from '@clerk/nextjs';
import Skeleton from '@mui/material/Skeleton';
import HeadLine from './UI/UtilityComponent/HeadLine';
import MusicPlayCard from './UI/UtilityComponent/MusicPlayCard';
import Box from './UI/UtilityComponent/Card';
import {
  useGetAllMusicsQuery,
  useGetTopAlbumsQuery,
  useGetTopGenreQuery,
  useGetTopHitsMusicsQuery,
  useToggleLikeMutation,
} from '@/services/like';
import { handleLikeToggle } from '@/hooks/useLike';
import { IMusicProps, TAGS } from './types/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Redux/features/musicPlayer/types/types';

const SkeletonGrid = ({ count }: { count: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="p-4">
        <Skeleton variant="rectangular" width="100%" height={150} />
        <Skeleton variant="text" className="mt-2" />
        <Skeleton variant="text" />
      </div>
    ))}
  </div>
);

const Index = () => {
  const { user } = useUser();
  const { data: topHits, isLoading: isLoadingTopHits } = useGetTopHitsMusicsQuery(undefined);
  const { data: topAlbums, isLoading: isLoadingTopAlbums } = useGetTopAlbumsQuery(undefined);
  const { data: newReleases, isLoading: isLoadingNewReleases } = useGetAllMusicsQuery({});
  const { data: topGenres, isLoading: isLoadingTopGenres } = useGetTopGenreQuery({});
  const [toggleLike] = useToggleLikeMutation();
  const dispatch = useDispatch();
  const currentTrack = useSelector<RootState, IMusicProps | null>(
    (state) => state.musicPlayerSlice.currentTrack
  );

  return (
    <div className="flex flex-col ">
      <HeadLine title="Top Hits" subTitle="2024" />
      <hr className="w-full p-2 border-gray-600" />
      {isLoadingTopHits ? (
        <SkeletonGrid count={10} />
      ) : (
        <MusicPlayCard
          data={topHits?.data}
          name={TAGS.MUSIC}
          handleLikeToggle={(itemId) =>
            handleLikeToggle(itemId, TAGS.MUSIC, toggleLike, currentTrack as IMusicProps, dispatch)
          }
        />
      )}

      <div className="mt-8 p-3">
        <HeadLine title="Popular Albums" subTitle="Discover popular album musics" />
        {isLoadingTopAlbums ? (
          <SkeletonGrid count={4} />
        ) : (
          <Box
            data={topAlbums?.data}
            name={TAGS.ALBUMS}
            handleLikeToggle={(itemId) =>
              handleLikeToggle(itemId, TAGS.ALBUMS, toggleLike)
            }
            showLikeIcon={true}
            message="albums not found"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          />
        )}
      </div>

      <HeadLine title="New Releases" subTitle="2024" />
      <hr className="w-full p-2 border-gray-600" />
      {isLoadingNewReleases ? (
        <SkeletonGrid count={8} />
      ) : (
        <MusicPlayCard
          data={newReleases?.data?.data.slice(0, 8)}
          name={TAGS.NEW_RELEASE}
          handleLikeToggle={(itemId) =>
            handleLikeToggle(itemId, TAGS.MUSIC, toggleLike, currentTrack as IMusicProps, dispatch)
          }
        />
      )}

      <div className="mt-8 p-3">
        <HeadLine title="Top Genres & Moods" subTitle="Discover popular genres musics" />
        {isLoadingTopGenres ? (
          <SkeletonGrid count={4} />
        ) : (
          <Box
            name={TAGS.GENRE}
            data={topGenres?.data}
            handleLikeToggle={(itemId) =>
              handleLikeToggle(itemId, TAGS.GENRE, toggleLike)
            }
            showLikeIcon={true}
            message="genres not found"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          />
        )}
      </div>
    </div>
  );
};

export default Index;
