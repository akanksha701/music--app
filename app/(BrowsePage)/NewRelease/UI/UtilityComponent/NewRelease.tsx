"use client";
import Box from "@/app/(BrowsePage)/Browse/UI/UtilityComponent/Card";
import { useGetAllMusicsQuery } from "@/services/like";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";

const NewRelease = () => {
  const searchParams = useSearchParams();
  const language = searchParams.get("language");
  const queryParams = new URLSearchParams();

  
  if (language) queryParams.append("language", language);
  const { data: newReleases } = useGetAllMusicsQuery({
    queryParams: queryParams.toString(),
  });


  const memorizedNewRelease = useMemo(
    () => (
      <>
        <div className="mt-3">
          <Box
            title={`New ${language || "" + "Songs"}`}
            data={newReleases?.data?.data}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            name={""}
            showLikeIcon={false}
            message={""}
          />
        </div>
      </>
    ),
    [newReleases]
  );
  return <> {memorizedNewRelease}</>;
};

export default NewRelease;
