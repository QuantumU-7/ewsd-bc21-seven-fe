// In MostPopularTable.jsx
import React from "react";
import CommonTable from "@/components/shared/common/Table"; // Changed from destructuring import
import { TableCell, TableRow } from "@/components/ui/table";

const MostPopularTable = ({ ideas, loading }) => {
  const tableBody = ideas?.map((idea, index) => (
    <TableRow key={index} className="border-b">
      <TableCell className="font-medium">{idea.title}</TableCell>
      <TableCell>{`${idea.posted_by.firstname} ${idea.posted_by.lastname}`}</TableCell>
      <TableCell>{idea.department.name}</TableCell>
      {/* <TableCell>{idea.likes_count}</TableCell> */}
      <TableCell>{idea.category.name}</TableCell>
    </TableRow>
  ));

  return (
    <div className="max-w-7xl mx-auto space-y-2 my-8 px-4">
      <h2 className="text-2xl font-bold">Most Popular Ideas</h2>
      <CommonTable
        columns={["Title", "Author", "Department", "Category"]}
        loading={loading}
        tableBody={tableBody}
      />
    </div>
  );
};

export default MostPopularTable;
