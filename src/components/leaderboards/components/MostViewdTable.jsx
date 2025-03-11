// In MostViewdTable.jsx
import React from "react";
import CommonTable from "@/components/shared/common/Table"; // Changed from destructuring import
import { TableCell, TableRow } from "@/components/ui/table";

const MostViewdTable = ({ ideas, loading }) => {
  const tableBody = ideas?.map((idea, index) => (
    <TableRow key={index} className="border-b">
      <TableCell className="font-medium">{idea.title}</TableCell>
      <TableCell>{`${idea.posted_by.firstname} ${idea.posted_by.lastname}`}</TableCell>
      <TableCell>{idea.department.name}</TableCell>
      <TableCell>{idea.views_count || 0}</TableCell>
      <TableCell>{idea.category.name}</TableCell>
    </TableRow>
  ));

  return (
    <div className="max-w-7xl h-[40vh] overflow-auto mx-auto space-y-8 my-8 px-4">
      <h2 className="text-2xl font-bold my-4">Most Popular Ideas</h2>
      <CommonTable
        columns={["Title", "Author", "Department", "Total Views", "Category"]}
        loading={loading}
        tableBody={tableBody}
      />
    </div>
  );
};

export default MostViewdTable;
