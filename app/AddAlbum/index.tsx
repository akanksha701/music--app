'use client';
import React, { useEffect, useState } from 'react';
import { useGetAlbumByIdQuery } from '@/services/album';
import { useGetMusicsOfArtistsQuery } from '@/services/music';
import MusicList from '@/common/MusicList/MusicList';
import { useSearchParams } from 'next/navigation';
import { MusicData } from './types/types';
import { IPrevData } from '@/common/types/types';
import Loading from '../Album/loading';
import { useGetArtistsQuery } from '@/services/artists';

const Index = () => {
  const searchParams = useSearchParams();
  const albumId = searchParams.get('albumId');

  const { data: artists, error: artistsError, isLoading: isArtistsLoading } = useGetArtistsQuery({});
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [prevData, setPrevData] = useState<IPrevData | null>(null);

  const handleLoadingOrError = () => {
    if (isArtistsLoading || isMusicLoading) return <Loading />;
    if (artistsError || isMusicError) return <>Something went wrong</>;
    return null;
  };

  const artistId = artists?.data?.[0]?.id || ''; // Handle undefined artists safely
  const { data: musicData, isLoading: isMusicLoading, error: isMusicError } = useGetMusicsOfArtistsQuery(artistId, { skip: !artistId });
  const { data: albumByIdData } = useGetAlbumByIdQuery(albumId || '', { skip: !albumId });

  const updatePrevData = () => {
    if (albumByIdData?.data) {
      setPrevData({
        albumDescription: albumByIdData.data.description,
        albumId: albumId || '',
        albumImage: albumByIdData.data.imageUrl,
        albumMusicIds: albumByIdData.data.musicDetails,
        albumName: albumByIdData.data.name,
        albumPrice: albumByIdData.data.Price,
      });

      const songs = albumByIdData.data.musicDetails.map((song: MusicData) => song?._id);
      setSelectedSongs(songs);
    }
  };

  useEffect(() => {
    updatePrevData();
  }, [albumByIdData, albumId]);

  const loadingErrorComponent = handleLoadingOrError();
  if (loadingErrorComponent) return loadingErrorComponent;

  return (
    <div className="flex justify-center items-start min-h-screen pt-8">
      <div className="w-full">
        {musicData && (
          <MusicList
            data={musicData.data || []}
            mode={albumId ? 'edit' : 'create'}
            prevData={prevData as IPrevData}
            MyselectedSongs={selectedSongs}
          />
        )}
      </div>
    </div>
  );
};


export default Index;
