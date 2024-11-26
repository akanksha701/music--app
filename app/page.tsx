"use client";
import React from "react";
import Marketing from "./Dashboard/UI/Marketing";
import { useFetchUserProfileQuery } from "@/services/user";

const Page = () => {
  const { data: user } = useFetchUserProfileQuery();

  return (
    <div>
      <Marketing />
    </div>
  );
};

export default Page;
