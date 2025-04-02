import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";

const TableLoading = ({ columns = 5, rows = 6 }) => {
  return (
    <>
      {[...Array(rows)].map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {[...Array(columns)].map((_, colIndex) => (
            <TableCell key={colIndex}>
              <span className="w-28 h-4 animate-pulse bg-gray-300 inline-block rounded"></span>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default TableLoading;
