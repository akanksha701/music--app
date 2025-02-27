'use client';
import React, { useEffect, useState } from 'react';
import { useGetAlbumByIdQuery } from '@/services/album';
import { useGetMusicsOfArtistsQuery } from '@/services/music';
import MusicList from '@/common/MusicList/MusicList';
import { useSearchParams } from 'next/navigation';
import { MusicData } from './types/types';
import { IPrevData } from '@/common/types/types';
import Loading from '../Album/loading';
const Index = () => {
  const searchParams = useSearchParams();
  const albumId = searchParams.get('albumId');
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [prevData, setPrevData] = useState<IPrevData | null>(null);
  const { data: musicData, isLoading: isMusicLoading,error:isMusicError } = useGetMusicsOfArtistsQuery(albumId);
  const { data: albumByIdData, isLoading: isAlbumLoading,error:isAlbumError } = useGetAlbumByIdQuery(albumId || '', {
    skip: !albumId,
  });

  useEffect(() => {
    if (albumByIdData?.data || albumId || !isMusicError || !isAlbumError || (!isAlbumLoading && !isMusicLoading)) {
      setPrevData({
        albumDescription: albumByIdData?.data?.description,
        albumId: albumId || '',
        albumImage: albumByIdData?.data?.imageUrl,
        albumMusicIds: albumByIdData?.data?.musicDetails,
        albumName: albumByIdData?.data?.name,
        albumPrice: albumByIdData?.data?.Price,
      });

      const Songs = albumByIdData?.data?.musicDetails.map((song: MusicData) => song?._id);
      setSelectedSongs(Songs);
    }
  }, [albumByIdData, albumId]);

  if (isAlbumLoading || isMusicLoading || isMusicError) return <Loading />;

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
