import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ConfirmationBox } from "@/components/shared/common/Dialog/ConfirmationBox";

// Format date to a more readable format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const IdeaTable = ({
  ideas,
  loading,
  handleViewIdea,
  handleEditIdea,
  handleDeleteIdea,
}) => {
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleConfirm = () => {
    if (deleteId) {
      handleDeleteIdea(deleteId);
      setDeleteId(null);
      setOpenConfirmBox(false);
    }
  };

  const handleCancel = () => {
    setDeleteId(null);
    setOpenConfirmBox(false);
  };

  return (
    <>
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">Title</TableHead>
            <TableHead className="text-white">Total Likes</TableHead>
            <TableHead className="text-white">Total Dislikes</TableHead>
            <TableHead className="text-white">Total Comments</TableHead>
            <TableHead className="text-white">Category</TableHead>
            <TableHead className="text-white">Posted On</TableHead>
            <TableHead className="text-white"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                <div className="flex justify-center">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              </TableCell>
            </TableRow>
          ) : ideas.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                No ideas found.
              </TableCell>
            </TableRow>
          ) : (
            ideas.map((idea) => (
              <TableRow key={idea.id} className="border-b">
                <TableCell>{idea.title}</TableCell>
                <TableCell>{idea.likes_count}</TableCell>
                <TableCell>{idea.dislikes_count}</TableCell>
                <TableCell>{idea.comments_count}</TableCell>
                <TableCell>{idea.category.name}</TableCell>
                <TableCell>{formatDate(idea.posted_on)}</TableCell>
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
                      <p
                        className="text-sm p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleEditIdea(idea.id)}
                      >
                        Edit
                      </p>
                      <div className="border-t"></div>
                      <p
                        className="text-sm p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setDeleteId(idea.id);
                          setOpenConfirmBox(true);
                        }}
                      >
                        Delete
                      </p>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <ConfirmationBox
        title="Delete Idea"
        description="Are you sure you want to delete this idea?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isOpen={openConfirmBox}
        setIsOpen={setOpenConfirmBox}
      />
    </>
  );
};

export default IdeaTable;
