import React from "react";
import Addmusic from "./UI/UtilityComponent/Addmusic";
import { fetchGenresAndLanguages } from "../actions/getGenresAndLanguage";

const Index = async () => {
  const { genreList,languageList} = await fetchGenresAndLanguages();
  if (!genreList || !languageList) {
    return null;
  }
  return (
    <div>
      <Addmusic languageList={languageList} genreList={genreList} />
    </div>
  );
};

export default Index;
