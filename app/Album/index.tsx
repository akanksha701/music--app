"use client"; 
import { useGetAlbumByArtistIdQuery, useGetAlbumsQuery } from "@/services/album";
import AlbumGrid from "./UI/UtilityComponent/Grid";

import { IoAddCircleOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const Index = () => {
 
  const { data: albumData } = useGetAlbumsQuery({});
  // const { data: albumData } = useGetAlbumByArtistIdQuery("675ab45ad8496e8fd5fb50db");
 
  if (!albumData) {
    // return <Loading />;
  }
 
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-8 pb-8">
      <div className="w-[75%] px-4">
        <div className="head-container flex justify-between items-center">
          <h2 className="text-3xl font-bold underline text-slate-500">Albums</h2>
          <Link href="/AddAlbum">
            <Button className="border-2 border-[#9333ea] flex justify-between items-center text-white bg-[#9333ea] rounded-full hover:bg-white hover:text-black hover:border-[#9333ea]">
              <IoAddCircleOutline
                style={{
                  height: "1.8rem",
                  width: "1.8rem",
                }}
            />
              <span className="text-lg">New Album</span>
            </Button>
          </Link>
        </div>
        <AlbumGrid
          data={albumData?.data}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 grid-auto-flow-row"
          message={"musics not found"}
        />
      </div>
    </div>
  );
};

export default Index;
