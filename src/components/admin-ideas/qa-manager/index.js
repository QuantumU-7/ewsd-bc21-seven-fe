"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllIdeaService } from "@/services/getAllIdeas";
import IdeaTable from "./components/IdeaTable";
import { exportIdeaToCSV } from "@/services/exportIdeaToCSV";
import LoadingButton from "@/components/shared/common/Button";
import { downloadAttachments } from "@/services/downloadAttachments";
import { toast } from "sonner";

const QAManagerIdeasList = () => {

  // Separate states for each tab
  const [allIdeas, setAllIdeas] = useState([]);
  const [popularIdeas, setPopularIdeas] = useState([]);
  const [viewedIdeas, setViewedIdeas] = useState([]);
  const [reportedIdeas, setReportedIdeas] = useState([]);
  const [anonymousIdeas, setAnonymousIdeas] = useState([]);
  const [noCommentedIdeas, setNoCommentedIdeas] = useState([]);

  // Separate loading states
  const [allIdeasLoading, setAllIdeasLoading] = useState(true);
  const [popularIdeasLoading, setPopularIdeasLoading] = useState(true);
  const [viewedIdeasLoading, setViewedIdeasLoading] = useState(true);
  const [reportedIdeasLoading, setReportedIdeasLoading] = useState(true);
  const [anonymousIdeasLoading, setAnonymousIdeasLoading] = useState(true);
  const [noCommentedIdeasLoading, setNoCommentedIdeasLoading] = useState(true);
  const [exportCSVLoading, setExportCSVLoading] = useState(false);
  const [downloadAttachmentsLoading, setDownloadAttachmentsLoading] = useState(false);

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
  const [reportedPagination, setReportedPagination] = useState({
    totalRecords: 0,
    currentPage: 1,
    totalPages: 1,
    nextPage: null,
    prevPage: null,
  });

  const [anonymousePagination, setAnonymousPagination] = useState({
    totalRecords: 0,
    currentPage: 1,
    totalPages: 1,
    nextPage: null,
    prevPage: null,
  });

  const [noCommentedPagination, setnoCommentedPagination] = useState({
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
    fetchReportedIdeas(1);
    fetchAnonymousIdeas(1);
    featchNoCommentIdeas(1);
  }, []);
  const fetchAllIdeas = async (page) => {
    setAllIdeasLoading(true);
    try {
      const response = await getAllIdeaService({ page: page });
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
      const response = await getAllIdeaService({ page: page, sortPopularity: -1 });
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
      const response = await getAllIdeaService({ page: page, most_viewed: -1 });
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

  const fetchReportedIdeas = async (page) => {
    setViewedIdeasLoading(true);
    try {
      const response = await getAllIdeaService({ page: page, reported: -1 });
      setReportedIdeas(response.data);
      setReportedPagination({
        totalRecords: response.pagination.total_records,
        currentPage: response.pagination.current_page,
        totalPages: response.pagination.total_pages,
        nextPage: response.pagination.next_page,
        prevPage: response.pagination.prev_page,
      });
    } catch (error) {
      console.error("Error fetching reported ideas:", error);
    } finally {
      setReportedIdeasLoading(false);
    }
  };

  const fetchAnonymousIdeas = async (page) => {
    setAnonymousIdeasLoading(true);
    try {
      const response = await getAllIdeaService({ page: page, anonymous: -1 });
      setAnonymousIdeas(response.data);
      setAnonymousPagination({
        totalRecords: response.pagination.total_records,
        currentPage: response.pagination.current_page,
        totalPages: response.pagination.total_pages,
        nextPage: response.pagination.next_page,
        prevPage: response.pagination.prev_page,
      });
    } catch (error) {
      console.error("Error fetching popular ideas:", error);
    } finally {
      setAnonymousIdeasLoading(false);
    }
  };
  const featchNoCommentIdeas = async (page) => {
    setNoCommentedIdeasLoading(true);
    try {
      const response = await getAllIdeaService({ page: page, no_comment: -1 });
      setNoCommentedIdeas(response.data);
      setnoCommentedPagination({
        totalRecords: response.pagination.total_records,
        currentPage: response.pagination.current_page,
        totalPages: response.pagination.total_pages,
        nextPage: response.pagination.next_page,
        prevPage: response.pagination.prev_page,
      });
    } catch (error) {
      console.error("Error fetching popular ideas:", error);
    } finally {
      setNoCommentedIdeasLoading(false);
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
      case "reported":
        fetchReportedIdeas(page);
        break
      case "anonymous":
        fetchAnonymousIdeas(page); break;
      default:
        fetchAllIdeas(page);
        break;
    }
  };

  const handleExportCSV = async () => {
    try {
      setExportCSVLoading(true);
      await exportIdeaToCSV();
      setExportCSVLoading(false);
      toast.success("CSV exported successfully!");
    } catch (error) {
      toast.error("Error exporting CSV");
      console.error("Error exporting CSV:", error);
    }
  };

  const handleDownloadAttachments = async () => {
    try {
      setDownloadAttachmentsLoading(true);
      await downloadAttachments();
      toast.success("Attachments downloaded successfully!");
    } catch (error) {
      toast.error("Error downloading attachments");
      console.error("Error downloading attachments:", error);
    } finally {
      setDownloadAttachmentsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
        <h2 className="text-xl font-bold">Ideas</h2>
        <div className="flex gap-2">
          <div className="min-w-[100px]"><LoadingButton label="Export (.csv)" isLoading={exportCSVLoading} onClick={handleExportCSV} /></div>
          <div className="min-w-[150px]"><LoadingButton label="Download Attachments" isLoading={downloadAttachmentsLoading} onClick={handleDownloadAttachments} /></div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex overflow-x-auto whitespace-nowrap mb-4 gap-2 lg:w-fit justify-normal">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="popular">Most Popular</TabsTrigger>
          <TabsTrigger value="viewed">Most Viewed</TabsTrigger>
          <TabsTrigger value="reported">Reported Ideas</TabsTrigger>
          <TabsTrigger value="anonymous">Anonymous Ideas</TabsTrigger>
          <TabsTrigger value="no_comment">No Commented Ideas</TabsTrigger>
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

        <TabsContent value="reported">
          <IdeaTable
            ideas={reportedIdeas}
            loading={reportedIdeasLoading}
            pagination={reportedPagination}
            handlePageChange={(page) => handlePageChange(page, "reported")}
          />
        </TabsContent>

        <TabsContent value="anonymous">
          <IdeaTable
            ideas={anonymousIdeas}
            loading={anonymousIdeasLoading}
            pagination={anonymousePagination}
            handlePageChange={(page) => handlePageChange(page, "anonymous")}
          />
        </TabsContent>
        <TabsContent value="no_comment">
          <IdeaTable
            ideas={noCommentedIdeas}
            loading={noCommentedIdeasLoading}
            pagination={noCommentedPagination}
            handlePageChange={(page) => handlePageChange(page, "no_comment")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QAManagerIdeasList;
