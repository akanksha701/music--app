"use client"; // Add this line to mark the file as a client component

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
import { FaEdit } from "react-icons/fa"; // Import the edit icon

const TableComp = ({ message, columns, data, paginationData }: ITableProps) => {
  const handleEdit = (rowData: any) => {
    console.log("Editing row:", rowData);
  };
console.log("paginationData",paginationData)
  return (
    <>
      <Table>
        {/* <TableCaption>{message}</TableCaption> */}
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
          // page={paginationData.currentPage || 0}
          totalPages={paginationData?.totalPages}
          // onPageChange={() => { }}
        />
      </div>
    </>
  );
};

export default TableComp;
