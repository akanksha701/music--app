import { LIST_NAME, TAGS } from "@/app/(BrowsePage)/Browse/types/types";
import {
  useGetAllMusicsQuery,
  useGetTopHitsMusicsQuery,
} from "@/services/like";
import { useSearchParams } from "next/navigation";
const useFetchMusicData = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  let data = null;
  let error = null;
  let name=''
  switch (type) {
    case TAGS.MUSIC:
      const { data: topHits, error: topHitsError } = useGetTopHitsMusicsQuery(
        undefined,
        { skip: type !== TAGS.MUSIC }
      );
      data = topHits?.data;
      name=LIST_NAME.TOP_HITS
      error = topHitsError;
      break;
    case TAGS.NEW_RELEASE:
      const { data: newReleases, error: newReleasesError } =
        useGetAllMusicsQuery({ skip: type !== TAGS.NEW_RELEASE });
      name=LIST_NAME.NEW_RELEASE
      data = newReleases?.data?.data;
      error = newReleasesError;
      break;

    default:
      data = null;
      name=''
      error = new Error("Invalid media type");
      break;
  }
  return { data, name,error };
};

export default useFetchMusicData;
