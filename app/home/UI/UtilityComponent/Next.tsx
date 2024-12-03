"use client";
import Button from "@/common/buttons/Button";
import { useSelectCard } from "@/hooks/useSelectCard";
import { redirect } from "next/navigation";
import queryString from "query-string";
import React from "react";

const Next = () => {
  const { artist, category } = useSelectCard();
  const url = queryString.stringifyUrl(
    {
      url: `http://localhost:3000/Browse`,
      query: {
        artist: artist,
        catgeory: category,
      },
    },
    { skipNull: true }
  );

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-30 p-2">
        <Button name="Next" onClick={() => redirect(url)} />
      </div>
    </div>
  );
};

export default Next;
