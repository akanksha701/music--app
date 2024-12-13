"use client";
import React from "react";
import TabComp from "@/common/tab/TabComp";
import TableComp from "@/common/table/TableComp";
import { usePagination } from "@/hooks/usePagination";
import Loading from "../loading";
import { useGetAlbumsQuery } from "@/services/album";
import AddAlbum from "./UI/UtilityComponent/AddAlbum";

const columns = [
  { header: "Album Name", accessor: "name" },
  {
    header: "Edit",
    accessor: "edit",
    className: "text-center",
  },
];

const Index = () => {
  const recordsPerPage = 5;
  const { page, setPage } = usePagination();
  const { data: albumData } = useGetAlbumsQuery({page,recordsPerPage});

  if (!albumData) {
    return <Loading />;
  }

  const tabsData = [
    {
      value: "albums",
      label: "Albums",
      content: (
        <TableComp
          message="A list of your recent languages."
          columns={columns}
          data={albumData.data}
          setPage={setPage}
          page={page}
          paginationData={albumData.pagination}
        />
      ),
    },
    {
      value: "createalbum",
      label: "Create Album",
      content: <AddAlbum />,
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
