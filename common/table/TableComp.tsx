import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { ITableProps } from "../types/types";
import PaginationComp from "../pagination/paginationComp";

const TableComp = ({ message, columns, data }: ITableProps) => {
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
                  {row[column.accessor] || "-"}{" "}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationComp page={1} totalPages={7} onPageChange={()=>{} } />
    </>
  );
};

export default TableComp;
