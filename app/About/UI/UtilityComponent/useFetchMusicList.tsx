import { LIST_NAME, TAGS } from "@/app/(BrowsePage)/Browse/types/types";
import { useGetAllMusicsQuery, useGetTopHitsMusicsQuery } from "@/services/like";
import { useSearchParams } from "next/navigation";

const useFetchMusicData = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  let data = null;
  let error = null;
  let name = '';

  const { data: topHits, error: topHitsError } = useGetTopHitsMusicsQuery(
    undefined,
    { skip: type !== TAGS.MUSIC }
  );
  
  const { data: newReleases, error: newReleasesError } = useGetAllMusicsQuery(
    { skip: type !== TAGS.NEW_RELEASE }
  );

  switch (type) {
    case TAGS.MUSIC:
      data = topHits?.data;
      name = LIST_NAME.TOP_HITS;
      error = topHitsError;
      break;
    case TAGS.NEW_RELEASE:
      data = newReleases?.data?.data;
      name = LIST_NAME.NEW_RELEASE;
      error = newReleasesError;
      break;
    default:
      error = new Error("Invalid media type");
      break;
  }

  return { data, name, error };
};

export default useFetchMusicData;
