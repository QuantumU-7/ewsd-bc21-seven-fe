import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import TableLoading from "../TableLoading/TableLoading";

const CommonTable = ({ columns = [], loading = false, tableBody = <></> }) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            {columns.map((col, index) => (
              <TableHead key={index} className="text-white">
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableLoading/>
          ) : (
            tableBody
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommonTable;
