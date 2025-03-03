"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
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
import actionApi from "@/api/config";
// import { toast } from "@/components/ui/use-toast"; // Assuming you're using shadcn/ui toast

const MyIdeasListForm = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await actionApi().get("/users");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const ideas = Array(10).fill({
    id: Math.floor(Math.random() * 1000),
    title: "Improve Communication Channel",
    likes: 200,
    dislikes: 35,
    comments: 400,
    category: "Facility",
  });

  const handleViewIdea = async (ideaId) => {
    try {
      // const response = await fetch(`/api/ideas/${ideaId}`);

      // if (!response.ok) {
      //   throw new Error("Failed to fetch idea details");
      // }

      // const ideaData = await response.json();

      router.push(`/my-ideas/${ideaId}`);
    } catch (error) {
      // Show error toast if API call fails
      // toast({
      //   title: "Error",
      //   description: "Failed to load idea details. Please try again.",
      //   variant: "destructive",
      // });
      console.error("Error fetching idea details:", error);
    }
  };

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
                      <p
                        className="text-sm p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleViewIdea(idea.id)}
                      >
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
