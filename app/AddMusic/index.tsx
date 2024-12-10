import React from "react";
import Addmusic from "./UI/UtilityComponent/Addmusic";
import { fetchGenresAndLanguages } from "../actions/getGenresAndLanguage";
import TabComp from "@/common/tab/TabComp";
import TableComp from "@/common/table/TableComp";
const columns = [
  { header: "Invoice", accessor: "invoice", className: "w-[100px]" },
  { header: "Status", accessor: "status" },
  { header: "Method", accessor: "method" },
  { header: "Amount", accessor: "amount", className: "text-right" },
];

const data = [
  {
    invoice: "INV001",
    status: "Paid",
    method: "Credit Card",
    amount: "$250.00",
  },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$180.00" },
  {
    invoice: "INV003",
    status: "Paid",
    method: "Bank Transfer",
    amount: "$400.00",
  },
];
const Index = async () => {
  const { genreList, languageList, artistList, albumList } =
    await fetchGenresAndLanguages();
  if (!genreList || !languageList || !artistList || !albumList) {
    return null;
  }
  const tabsData = [
    {
      value: "musics",
      label: "Musics",
      content: (
        <TableComp
          message="A list of your recent invoices."
          columns={columns}
          data={data}
        />
      ),
    },
    {
      value: "createmusic",
      label: "Create music",
      content: (
        <Addmusic
          languageList={languageList}
          genreList={genreList}
          artistList={artistList}
          albumList={albumList}
        />
      ),
    },
  ];
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-8">
      <div className="w-full sm:w-[500px] md:w-[600px] lg:w-[700px] px-4">
        <TabComp tabsData={tabsData} />
      </div>
    </div>
  );
};

export default Index;
