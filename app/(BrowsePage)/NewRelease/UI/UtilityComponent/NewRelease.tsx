"use client";
import Box from "@/app/(BrowsePage)/Browse/UI/UtilityComponent/Card";
import { useGetnewMusicsQuery } from "@/services/music";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";

const NewRelease = () => {
  const searchParams = useSearchParams();
  const language = searchParams.get("language");
  const { data: newMusics } = useGetnewMusicsQuery(language);

  const memorizedNewRelease = useMemo(
    () => (
      <>
        <div className="mt-3">
          <Box
            title={`New ${language || "" + "Songs"}`}
            data={newMusics?.data}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          />
        </div>
      </>
    ),
    [newMusics]
  );
  return <> {memorizedNewRelease}</>;
};

export default NewRelease;
