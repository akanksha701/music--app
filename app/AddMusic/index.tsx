import React from "react";
import Addmusic from "./UI/UtilityComponent/Addmusic";
import { fetchGenresAndLanguages } from "../actions/getGenresAndLanguage";

const Index = async () => {
  const { genreList,languageList,artistList,albumList} = await fetchGenresAndLanguages();
  if (!genreList || !languageList || !artistList || !albumList) {
    return null;
  }
  return (
    <div>
      <Addmusic languageList={languageList} genreList={genreList} artistList={artistList} albumList={albumList}/>
    </div>
  );
};

export default Index;
