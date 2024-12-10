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
  
  const TableComp = ({ message, columns, data }: ITableProps) => {
    return (
      <Table>
        <TableCaption>{message}</TableCaption>
        <TableHeader>
          <TableRow>
            {/* Dynamically create table headers based on 'columns' prop */}
            {columns.map((column, index) => (
              <TableHead key={index} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Dynamically create rows based on 'data' prop */}
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex} className={column.className}>
                  {row[column.accessor] || "-"} {/* Display the value based on accessor */}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };
  
  export default TableComp;
  