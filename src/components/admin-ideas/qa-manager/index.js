"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllIdeaService } from "@/services/getAllIdeas";
import IdeaTable from "./components/IdeaTable";

const QAManagerIdeasList = () => {
  const router = useRouter();

  // Separate states for each tab
  const [allIdeas, setAllIdeas] = useState([]);
  const [popularIdeas, setPopularIdeas] = useState([]);
  const [viewedIdeas, setViewedIdeas] = useState([]);

  // Separate loading states
  const [allIdeasLoading, setAllIdeasLoading] = useState(true);
  const [popularIdeasLoading, setPopularIdeasLoading] = useState(true);
  const [viewedIdeasLoading, setViewedIdeasLoading] = useState(true);

  // Separate pagination states
  const [allPagination, setAllPagination] = useState({
    totalRecords: 0,
    currentPage: 1,
    totalPages: 1,
    nextPage: null,
    prevPage: null,
  });
  const [popularPagination, setPopularPagination] = useState({
    totalRecords: 0,
    currentPage: 1,
    totalPages: 1,
    nextPage: null,
    prevPage: null,
  });
  const [viewedPagination, setViewedPagination] = useState({
    totalRecords: 0,
    currentPage: 1,
    totalPages: 1,
    nextPage: null,
    prevPage: null,
  });

  useEffect(() => {
    fetchAllIdeas(1);
    fetchPopularIdeas(1);
    fetchViewedIdeas(1);
  }, []);

  const fetchAllIdeas = async (page) => {
    setAllIdeasLoading(true);
    try {
      const response = await getAllIdeaService(page);
      setAllIdeas(response.data);
      setAllPagination({
        totalRecords: response.pagination.total_records,
        currentPage: response.pagination.current_page,
        totalPages: response.pagination.total_pages,
        nextPage: response.pagination.next_page,
        prevPage: response.pagination.prev_page,
      });
    } catch (error) {
      console.error("Error fetching all ideas:", error);
    } finally {
      setAllIdeasLoading(false);
    }
  };

  const fetchPopularIdeas = async (page) => {
    setPopularIdeasLoading(true);
    try {
      // In a real implementation, you'd likely use a different endpoint or parameters
      // to fetch popular ideas. For now, we're using the same service.
      const response = await getAllIdeaService(page);
      setPopularIdeas(response.data);
      setPopularPagination({
        totalRecords: response.pagination.total_records,
        currentPage: response.pagination.current_page,
        totalPages: response.pagination.total_pages,
        nextPage: response.pagination.next_page,
        prevPage: response.pagination.prev_page,
      });
    } catch (error) {
      console.error("Error fetching popular ideas:", error);
    } finally {
      setPopularIdeasLoading(false);
    }
  };

  const fetchViewedIdeas = async (page) => {
    setViewedIdeasLoading(true);
    try {
      // In a real implementation, you'd likely use a different endpoint or parameters
      // to fetch most viewed ideas. For now, we're using the same service.
      const response = await getAllIdeaService(page);
      setViewedIdeas(response.data);
      setViewedPagination({
        totalRecords: response.pagination.total_records,
        currentPage: response.pagination.current_page,
        totalPages: response.pagination.total_pages,
        nextPage: response.pagination.next_page,
        prevPage: response.pagination.prev_page,
      });
    } catch (error) {
      console.error("Error fetching most viewed ideas:", error);
    } finally {
      setViewedIdeasLoading(false);
    }
  };

  const handlePageChange = (page, tab) => {
    switch (tab) {
      case "popular":
        fetchPopularIdeas(page);
        break;
      case "viewed":
        fetchViewedIdeas(page);
        break;
      default:
        fetchAllIdeas(page);
        break;
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Ideas</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-black text-white hover:bg-gray-800"
          >
            Export (.csv)
          </Button>
          <Button
            variant="outline"
            className="bg-black text-white hover:bg-gray-800"
          >
            Download Attachments
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-[20vw] grid-cols-3 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="popular">Most Popular</TabsTrigger>
          <TabsTrigger value="viewed">Most Viewed</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <IdeaTable
            ideas={allIdeas}
            loading={allIdeasLoading}
            pagination={allPagination}
            handlePageChange={(page) => handlePageChange(page, "all")}
          />
        </TabsContent>

        <TabsContent value="popular">
          <IdeaTable
            ideas={popularIdeas}
            loading={popularIdeasLoading}
            pagination={popularPagination}
            handlePageChange={(page) => handlePageChange(page, "popular")}
          />
        </TabsContent>

        <TabsContent value="viewed">
          <IdeaTable
            ideas={viewedIdeas}
            loading={viewedIdeasLoading}
            pagination={viewedPagination}
            handlePageChange={(page) => handlePageChange(page, "viewed")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QAManagerIdeasList;
