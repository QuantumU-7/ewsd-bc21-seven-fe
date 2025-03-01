import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Ellipsis } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const MyIdeasListForm = () => {
  // Sample data - in a real app this would come from props or an API
  const ideas = Array(10).fill({
    title: "Improve Communication Channel",
    likes: 200,
    dislikes: 35,
    comments: 400,
    category: "Facility",
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 my-8 px-4">
      <h2 className="text-2xl font-bold my-4">My Ideas</h2>

      <div className="border rounded-md">
        <Table>
          <TableHeader className="bg-primary">
            <TableRow>
              <TableHead className="text-white">Title</TableHead>
              <TableHead className="text-white">Total Likes</TableHead>
              <TableHead className="text-white">Total Dislikes</TableHead>
              <TableHead className="text-white">Total Comments</TableHead>
              <TableHead className="text-white">Category</TableHead>
              <TableHead className="text-white"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ideas.map((idea, index) => (
              <TableRow key={index} className="border-b">
                <TableCell>{idea.title}</TableCell>
                <TableCell>{idea.likes}</TableCell>
                <TableCell>{idea.dislikes}</TableCell>
                <TableCell>{idea.comments}</TableCell>
                <TableCell>{idea.category}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="cursor-pointer">
                        <Ellipsis className="text-gray-500 ml-auto" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[110px] rounded-xl p-0 flex flex-col text-center">
                      <p className="text-sm p-2 cursor-pointer hover:bg-gray-100">
                        View
                      </p>
                      <div className="border-t"></div>
                      <p className="text-sm p-2 cursor-pointer hover:bg-gray-100">
                        Edit
                      </p>
                      <div className="border-t"></div>
                      <p className="text-sm p-2 cursor-pointer hover:bg-gray-100">
                        Delete
                      </p>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex w-full">
        <Pagination className={"justify-end"}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive
                className="bg-primary text-white"
              >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">11</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default MyIdeasListForm;
