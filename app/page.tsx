"use client";
import React, { useEffect } from "react";
import Marketing from "./Dashboard/UI/Marketing";
import { fetchApi } from "@/utils/helpers";

const Page = async () => {
  useEffect(() => {
      fetchApi("/api/user");
  }, []);
  return <Marketing />;
};

export default Page;
