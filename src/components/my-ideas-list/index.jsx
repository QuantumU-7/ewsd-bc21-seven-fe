"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getAllIdeaService } from "@/services/getAllIdeas";
import IdeaTable from "./components/IdeaTable";
import IdeaPagination from "./components/IdeaPagination";

const MyIdeasListForm = () => {
  const router = useRouter();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    totalRecords: 0,
    currentPage: 1,
    totalPages: 1,
    nextPage: null,
    prevPage: null,
  });

  useEffect(() => {
    fetchIdeas(1);
  }, []);

  const fetchIdeas = async (page) => {
    setLoading(true);
    try {
      const response = await getAllIdeaService(page);
      setIdeas(response.data);
      setPagination({
        totalRecords: response.pagination.total_records,
        currentPage: response.pagination.current_page,
        totalPages: response.pagination.total_pages,
        nextPage: response.pagination.next_page,
        prevPage: response.pagination.prev_page,
      });
    } catch (error) {
      console.error("Error fetching ideas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    fetchIdeas(page);
  };

  const handleViewIdea = (ideaId) => {
    router.push(`/my-ideas/${ideaId}`);
  };

  const handleEditIdea = (ideaId) => {
    router.push(`/my-ideas/edit/${ideaId}`);
  };

  const handleDeleteIdea = async (ideaId) => {
    try {
      // Implement delete service call here
      // const response = await deleteIdeaService(ideaId);
      console.log("Idea deleted:", ideaId);
      // Refresh the ideas list after deletion
      fetchIdeas(pagination.currentPage);
    } catch (error) {
      console.error("Error deleting idea:", error);
    }
  };

  return (
    <div className="max-w-7xl h-[77.5vh] overflow-auto mx-auto space-y-8 my-8 px-4">
      <h2 className="text-2xl font-bold my-4">My Ideas</h2>

      {/**table */}
      <div className="border rounded-md">
        <IdeaTable
          ideas={ideas}
          loading={loading}
          handleViewIdea={handleViewIdea}
          handleEditIdea={handleEditIdea}
          handleDeleteIdea={handleDeleteIdea}
        />
      </div>

      {/**pagination */}
      {!loading && pagination.totalPages > 0 && (
        <div className="flex w-full">
          <IdeaPagination
            pagination={pagination}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default MyIdeasListForm;
