"use client";
import { useUser } from "@clerk/nextjs";
import Loading from "@/app/loading";
import HeadLine from "./UI/UtilityComponent/HeadLine";
import MusicPlayCard from "./UI/UtilityComponent/MusicPlayCard";
import Box from "./UI/UtilityComponent/Card";
import { useEffect, useState } from "react";
import { fetchApi } from "@/utils/helpers";
import { getTopHits, music } from "@/utils/apiRoutes";
import { Method } from "@/app/About/types/types";
export const dummyMusics = [
  {
    name: "Shape of You",
    coverUrl:
      "https://media.gettyimages.com/id/1044689348/video/bursts-and-sparks-2.jpg?s=640x640&k=20&c=GXSeLYveMa46PZazrmiJC-_MHMGmLSzb5ruhjWNPYPc=", // Ed Sheeran
    artist: "Ed Sheeran",
  },
  {
    name: "Blinding Lights",
    coverUrl: "https://wallpapercave.com/dwp2x/wp3537459.jpg", // Ed Sheeran

    artist: "The Weeknd",
  },
  {
    name: "Dil Bechara",
    coverUrl:
      "https://www.bollywoodhungama.com/wp-content/uploads/2020/07/Dil-Bechara-14.jpg", // Ed Sheeran

    artist: "A.R. Rahman",
  },
  {
    name: "Tum Hi Ho",
    coverUrl: "https://wallpapercave.com/dwp2x/wp3537459.jpg", // Ed Sheeran

    artist: "Arijit Singh",
  },
  {
    name: "Señorita",
    coverUrl: "https://wallpapercave.com/dwp2x/wp3537459.jpg", // Ed Sheeran

    artist: "Shawn Mendes & Camila Cabello",
  },
  {
    name: "Kabira",
    coverUrl: "https://wallpapercave.com/dwp2x/wp3537459.jpg", // Ed Sheeran

    artist: "Aditi Rao Hydari",
  },
  {
    name: "Someone You Loved",
    coverUrl: "https://wallpapercave.com/dwp2x/wp3537459.jpg", // Ed Sheeran

    artist: "Lewis Capaldi",
  },
  {
    name: "Channa Mereya",
    coverUrl:
      "https://stat4.bollywoodhungama.in/wp-content/uploads/2021/10/Ranbir-Kapoor-Aishwarya-Rai-is-like-a-GODDESS-that-woman-is-so...-Anushka-Sharma-ADHM-480x360.jpg", // Ed Sheeran
    artist: "Arijit Singh",
  },
  {
    name: "Channa Mereya",
    coverUrl:
      "https://stat4.bollywoodhungama.in/wp-content/uploads/2021/10/Ranbir-Kapoor-Aishwarya-Rai-is-like-a-GODDESS-that-woman-is-so...-Anushka-Sharma-ADHM-480x360.jpg", // Ed Sheeran
    artist: "Arijit Singh",
  },
];

const Index = () => {
  const [topHits, setTopHits] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchApi(getTopHits, Method.GET);
        if (!data) {
          setTopHits([]);
        } else {
          setTopHits(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);
  if (!user) {
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
      <MusicPlayCard data={topHits} />

      {/* <div className="mt-8 p-3">
        <HeadLine title="Featured Artists" subTitle="Discover new music" />
        <Box
          data={artists}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        />
      </div> */}

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
