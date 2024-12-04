"use client";
import Box from "@/app/(BrowsePage)/Browse/UI/UtilityComponent/Card";
import MusicPlayCard from "@/app/(BrowsePage)/Browse/UI/UtilityComponent/MusicPlayCard";
import React from "react";
export const dummyMusics = [
  {
    name: "Shape of You",
    image:
      "https://media.gettyimages.com/id/1044689348/video/bursts-and-sparks-2.jpg?s=640x640&k=20&c=GXSeLYveMa46PZazrmiJC-_MHMGmLSzb5ruhjWNPYPc=", // Ed Sheeran
    artist: "Ed Sheeran",
  },
  {
    name: "Blinding Lights",
    image: "https://wallpapercave.com/dwp2x/wp3537459.jpg", // Ed Sheeran

    artist: "The Weeknd",
  },
  {
    name: "Dil Bechara",
    image:
      "https://www.bollywoodhungama.com/wp-content/uploads/2020/07/Dil-Bechara-14.jpg", // Ed Sheeran

    artist: "A.R. Rahman",
  },
  {
    name: "Tum Hi Ho",
    image: "https://wallpapercave.com/dwp2x/wp3537459.jpg", // Ed Sheeran

    artist: "Arijit Singh",
  },
  {
    name: "Señorita",
    image: "https://wallpapercave.com/dwp2x/wp3537459.jpg", // Ed Sheeran

    artist: "Shawn Mendes & Camila Cabello",
  },
  {
    name: "Kabira",
    image: "https://wallpapercave.com/dwp2x/wp3537459.jpg", // Ed Sheeran

    artist: "Aditi Rao Hydari",
  },
  {
    name: "Someone You Loved",
    image: "https://wallpapercave.com/dwp2x/wp3537459.jpg", // Ed Sheeran

    artist: "Lewis Capaldi",
  },
  {
    name: "Channa Mereya",
    image:
      "https://stat4.bollywoodhungama.in/wp-content/uploads/2021/10/Ranbir-Kapoor-Aishwarya-Rai-is-like-a-GODDESS-that-woman-is-so...-Anushka-Sharma-ADHM-480x360.jpg", // Ed Sheeran
    artist: "Arijit Singh",
  },
  {
    name: "Channa Mereya",
    image:
      "https://stat4.bollywoodhungama.in/wp-content/uploads/2021/10/Ranbir-Kapoor-Aishwarya-Rai-is-like-a-GODDESS-that-woman-is-so...-Anushka-Sharma-ADHM-480x360.jpg", // Ed Sheeran
    artist: "Arijit Singh",
  },
];
const NewRelease = () => {
  return (
    <div className="mt-3">
      <Box
        title="New Musics"
        data={dummyMusics}
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      />
    </div>
  );
};

export default NewRelease;
