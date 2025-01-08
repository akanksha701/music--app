"use client";
import React, { useEffect, useState } from "react";
import { usePagination } from "@/hooks/usePagination";
import { useGetAlbumByIdQuery, useGetAlbumsQuery } from "@/services/album";
import { useGetMusicsOfArtistsQuery } from "@/services/music";
import MusicList from "@/common/MusicList/MusicList";
import { useSearchParams } from "next/navigation";
import { MusicData } from "./types/types";

const Index = () => {
  // Get the 'albumId' query parameter
  const searchParams = useSearchParams();
  const albumId = searchParams.get('albumId');

  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [prevData, setPrevData] = useState<{}>({});
  const recordsPerPage = 5;
  const { page } = usePagination();
  const { data: musicData, isLoading: isMusicLoading } = useGetMusicsOfArtistsQuery("6756a19a5833867b6aba2a54");
    const { data: albumByIdData, isLoading: isAlbumLoading } = useGetAlbumByIdQuery(albumId, {
    skip: !albumId, // Skip the request if no albumId is provided
  });

  useEffect(() => {
    if (albumByIdData) {
      setPrevData({
        albumDescription: albumByIdData.data.description,
        albumId: albumId,
        albumImage: albumByIdData.data.imageUrl,
        albumMusicIds: albumByIdData.data.musicDetails,
        albumName: albumByIdData.data.name,
        albumPrice: albumByIdData.data.Price,
      });
      const Songs = albumByIdData.data.musicDetails.map((song: MusicData) => song._id);
      setSelectedSongs(Songs || []);
    }
  }, [albumByIdData]);

  if (isAlbumLoading  || isMusicLoading ) return <></>;

  return (
    <div className="flex justify-center items-start min-h-screen pt-8">
      <div className="w-full">
        {musicData && <MusicList data={musicData?.data} mode={albumId ? "edit" : "create"} prevData={prevData} MyselectedSongs={selectedSongs} />}
      </div>
    </div>
  );
};

export default Index;
