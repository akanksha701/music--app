import { fetchApi } from "@/utils/helpers";
import {
  getAlbumDetails,
  getArtistDetails,
  getGenreDetails,
  getLanguageDetails,
} from "@/utils/apiRoutes";
import { Method } from "../About/types/types";

export const fetchGenresAndLanguages = async () => {
  try {
    const genreList = await fetchApi(getGenreDetails, Method.GET);
    const languageList = await fetchApi(getLanguageDetails, Method.GET);
    const artistList = await fetchApi(getArtistDetails, Method.GET);
    const albumList= await fetchApi(getAlbumDetails,Method.GET)

    return {
      genreList: genreList.data || [],
      languageList: languageList.data || [],
      artistList: artistList.data || [],
      albumList: albumList.data||[]
    };
  } catch (error) {
    console.error("Error fetching genres or languages or artists:", error);
    return {
      genreList: [],
      languageList: [],
      artistList: [],
      albumList:[]

    };
  }
};
