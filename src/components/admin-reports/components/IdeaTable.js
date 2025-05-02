import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Ellipsis } from "lucide-react";
import { ConfirmationBox } from "@/components/shared/common/Dialog/ConfirmationBox";
import { TableCell, TableRow } from "@/components/ui/table";
import CommonTable from "@/components/shared/common/Table";
import CommonPagination from "@/components/shared/common/Pagination";
import { useState } from "react";

const IdeaTable = ({ ideas, loading, pagination, handlePageChange }) => {
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const router = useRouter();

  const handleView = (ideaId) => {
    router.push(`/ideas/${ideaId}`);
  };

  const handleEdit = (ideaId) => {
    router.push(`/ideas/edit/${ideaId}`);
  };

  const handleDelete = async (ideaId) => {
    console.log(ideaId)
    try {
      // After successful deletion, refresh the current page
      handlePageChange(pagination.currentPage);
    } catch (error) {
      console.error("Error deleting idea:", error);
    }
  };

  const tableBody = (
    <>
      {ideas?.map((idea) => (
        <TableRow key={idea.id} className="border-b">
          <TableCell>{idea.title}</TableCell>
          <TableCell>{`${idea.posted_by.firstname} ${idea.posted_by.lastname}`}</TableCell>
          <TableCell>{idea.department.name}</TableCell>
          <TableCell>{idea.likes_count}</TableCell>
          <TableCell>{idea.views_count}</TableCell>
          <TableCell>{idea.category.name}</TableCell>
          <TableCell>{new Date(idea.posted_on).toLocaleDateString()}</TableCell>
          <TableCell>
            <Popover>
              <PopoverTrigger asChild>
                <div className="cursor-pointer flex justify-end">
                  <Ellipsis className="text-gray-500" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[110px] rounded-xl p-0 flex flex-col text-center">
                <p
                  className="text-sm p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleView(idea.id)}
                >
                  View
                </p>
                <div className="border-t"></div>
                <p
                  className="text-sm p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleEdit(idea.id)}
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
      ))}
    </>
  );

  return (
    <>
      <CommonTable
        columns={[
          "Title",
          "Author",
          "Department",
          "Total Likes",
          "Total Views",
          "Category",
          "Posted On",
          "",
        ]}
        loading={loading}
        tableBody={tableBody}
      />
      {/** Pagination */}
      {pagination.totalPages > 0 && (
        <div className="flex w-full mt-3">
          <CommonPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            position="end"
          />
        </div>
      )}
      <ConfirmationBox
        title="Delete Idea"
        description="Are you sure you want to delete this idea?"
        onConfirm={() => {
          if (deleteId) {
            handleDelete(deleteId);
            setDeleteId(null);
            setOpenConfirmBox(false);
          }
        }}
        onCancel={() => setOpenConfirmBox(false)}
        isOpen={openConfirmBox}
        setIsOpen={setOpenConfirmBox}
      />
    </>
  );
};

export default IdeaTable;
