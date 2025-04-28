import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllIdeaService } from "@/services/getAllIdeas";
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
import { deleteIdeaService } from "@/services/ideaManagementService";
import { toast } from "sonner";

const IdeaTable = ({ ideas, loading, pagination, handlePageChange }) => {
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const router = useRouter();

  // If props are not provided, use local state and fetch data
  const [localIdeas, setLocalIdeas] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);
  const [localPagination, setLocalPagination] = useState({
    totalRecords: 0,
    currentPage: 1,
    totalPages: 1,
    nextPage: null,
    prevPage: null,
  });

  // Fetch ideas based on page number (for standalone mode)
  const fetchIdeas = async (page) => {
    setLocalLoading(true);
    try {
      const response = await getAllIdeaService({ page, myIdeas: true });
      setLocalIdeas(response.data);
      setLocalPagination({
        totalRecords: response.pagination.total_records,
        currentPage: response.pagination.current_page,
        totalPages: response.pagination.total_pages,
        nextPage: response.pagination.next_page,
        prevPage: response.pagination.prev_page,
      });
    } catch (error) {
      console.error("Error fetching ideas:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  // Handle page change in standalone mode
  const handleLocalPageChange = async (page) => {
    fetchIdeas(page);
  };

  // Initial fetch on component mount (only if used in standalone mode)
  useEffect(() => {
    if (!ideas) {
      fetchIdeas(1);
    }
  }, [ideas]);

  const handleView = (ideaId) => {
    router.push(`/ideas/${ideaId}`);
  };

  const handleEdit = (ideaId) => {
    router.push(`/ideas/edit/${ideaId}`);
  };

  const handleDelete = async (ideaId) => {
    try {
      await deleteIdeaService(ideaId);

      toast.success("Idea deleted successfully");

      // Refresh the current page data - use appropriate function based on mode
      console.log(ideaId);
      if (handlePageChange) {
        handlePageChange(pagination.currentPage);
      } else {
        fetchIdeas(localPagination.currentPage);
      }
    } catch (error) {
      console.error("Error deleting idea:", error);
    }
  };

  // Determine which data to use - props or local state
  const displayIdeas = ideas || localIdeas;
  const isLoading = loading !== undefined ? loading : localLoading;
  const currentPagination = pagination || localPagination;
  const pageChangeHandler = handlePageChange || handleLocalPageChange;

  // Generate table body based on ideas data
  const renderTableBody = () => {
    if (displayIdeas.length === 0 && !isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={7} className="text-center py-8">
            No ideas found
          </TableCell>
        </TableRow>
      );
    }

    return displayIdeas.map((idea) => (
      <TableRow key={idea.id} className="border-b">
        <TableCell>{idea.title}</TableCell>
        <TableCell>{idea.likes_count}</TableCell>
        <TableCell>{idea.dislikes_count}</TableCell>
        <TableCell>{idea.comments_count}</TableCell>
        <TableCell>{idea.category?.name || "Uncategorized"}</TableCell>
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
    ));
  };

  return (
    <>
      <CommonTable
        columns={[
          "Title",
          "Total Likes",
          "Total Dislikes",
          "Total Comments",
          "Category",
          "Posted On",
          "",
        ]}
        loading={isLoading}
        tableBody={renderTableBody()}
      />
      {/** Pagination */}
      {currentPagination.totalPages > 0 && (
        <div className="flex w-full mt-3">
          <CommonPagination
            currentPage={currentPagination.currentPage}
            totalPages={currentPagination.totalPages}
            onPageChange={pageChangeHandler}
            position="center"
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
