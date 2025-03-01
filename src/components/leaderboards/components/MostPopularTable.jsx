import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const MostPopularTable = () => {
  const popularIdeas = Array(10).fill({
    title: "Improve Communication Channel",
    author: "PHYO",
    department: "Finance",
    total_likes: 200,
    category: "Facility",
  });
  return (
    <Table>
      <TableHeader className="bg-primary">
        <TableRow>
          <TableHead className="text-white">Title</TableHead>
          <TableHead className="text-white">Author</TableHead>
          <TableHead className="text-white">Department</TableHead>
          <TableHead className="text-white">Total Likes</TableHead>
          <TableHead className="text-white">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {popularIdeas.map((idea, index) => (
          <TableRow key={index} className="border-b">
            <TableCell className="font-medium">{idea.title}</TableCell>
            <TableCell>{idea.author}</TableCell>
            <TableCell>{idea.department}</TableCell>
            <TableCell>{idea.total_likes}</TableCell>
            <TableCell>{idea.category}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MostPopularTable;
