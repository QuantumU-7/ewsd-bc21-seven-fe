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

const MostViewedTable = ({ ideas, loading }) => {
  return (
    <div className="max-w-7xl h-[40vh] overflow-auto mx-auto space-y-8 my-8 px-4">
      <h2 className="text-2xl font-bold my-4">Most Viewed Ideas</h2>
      <div className="border rounded-md">
        <Table>
          <TableHeader className="bg-primary">
            <TableRow>
              <TableHead className="text-white">Title</TableHead>
              <TableHead className="text-white">Author</TableHead>
              <TableHead className="text-white">Department</TableHead>
              <TableHead className="text-white">Total Views</TableHead>
              <TableHead className="text-white">Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : ideas.length > 0 ? (
              ideas.map((idea, index) => (
                <TableRow key={index} className="border-b">
                  <TableCell className="font-medium">{idea.title}</TableCell>
                  <TableCell>{`${idea.posted_by.firstname} ${idea.posted_by.lastname}`}</TableCell>
                  <TableCell>{idea.department.name}</TableCell>
                  <TableCell>{idea.views_count || 0}</TableCell>
                  <TableCell>{idea.category.name}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No viewed ideas found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MostViewedTable;
