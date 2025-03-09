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
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              </TableCell>
            </TableRow>
          ) : (
            tableBody
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommonTable;
