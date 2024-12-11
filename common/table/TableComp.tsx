"use client";
import React from "react";
import { ITableProps } from "../types/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationComp from "../pagination/paginationComp";
import { FaEdit } from "react-icons/fa";

const TableComp = ({
  message,
  columns,
  data,
  paginationData,
  page,
  setPage,
}: ITableProps) => {
  const handleEdit = (rowData: any) => {
    console.log("Editing row:", rowData);
  };
  return (
    <>
      <Table>
        <TableCaption>{message}</TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex} className={column.className}>
                  {column.accessor === "edit" ? (
                    <button
                      className="text-purple-500"
                      onClick={() => handleEdit(row)}
                    >
                      <FaEdit />
                    </button>
                  ) : (
                    row[column.accessor] || "-"
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-10">
        <PaginationComp
          totalPages={paginationData?.totalPages}
          page={page}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default TableComp;
