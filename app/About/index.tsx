import React from "react";
import Image from "next/image";
import { fetchApi } from "@/utils/helpers";
import CustomerSupport from "./UI/UtilityComponent/CustomerSupport";
import { getAboutDetails } from "@/utils/apiRoutes";
import { Method } from "./types/types";
export const Index = async () => {
  const data = await fetchApi(getAboutDetails, Method.GET);
  return (
    <div>
      <div className="p-20">
        <div className="grid grid-cols-2 gap-8 ">
          <div className=" text-6xl p-10 text-white font-semibold bg-purple-600 transform transition duration-1000 hover:scale-105 bg-purple-500 rounded-md">
            {data.aboutTitle}
          </div>
          <div className="text-6xl bg-slate-200 rounded-md">
            <Image
              src={data.aboutImage}
              alt="Music App"
              width={600}
              height={400}
              className="w-full h-full object-cover rounded-md "
            />
          </div>
        </div>
        <div className="bg-neutral-300 my-5 rounded-md p-10 text-2xl">
          {data.aboutDescription}
        </div>
        <CustomerSupport
          CustomerServiceAndSupport={data.CustomerServiceAndSupport}
          serviceTitle={data.serviceTitle}
        />
      </div>
    </div>
  );
};

export default Index;
