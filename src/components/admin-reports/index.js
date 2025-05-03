"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { getAllIdeaService } from "@/services/getAllIdeas";
// import IdeaTable from "./components/IdeaTable";
import { getMostActiveUsers } from "@/services/getMostActiveUsers";
import { getMostUsedBrowsers } from "@/services/getMostUsedBrowsers";
import MostActiveUsersTable from "./components/MostActiveUsersTable";
import MostUsedBrowsersTable from "./components/MostUsedBrowsersTable";
import { getMostViewedPageService } from "@/services/getMostViewedPageService";
import MostViewedPagesTable from "./components/MostViewedPagesTable";

const AdminReports = () => {
  // Separate states for each tab
  const [selectedTab, setSelectedTab] = useState("most_active_users"); 
  // const [allIdeas, setAllIdeas] = useState([]);
  // const [popularIdeas, setPopularIdeas] = useState([]);
  // const [viewedIdeas, setViewedIdeas] = useState([]);

  // Separate loading states
  // const [allIdeasLoading, setAllIdeasLoading] = useState(false);
  // const [popularIdeasLoading, setPopularIdeasLoading] = useState(true);
  // const [viewedIdeasLoading, setViewedIdeasLoading] = useState(true);
  const [mostActiveUsers, setMostActiveUsers] = useState([]);
  const [mostActiveUsersLoading, setMostActiveUsersLoading] = useState(true);
  const [mostActiveUsersPagination, setMostActiveUsersPagination] = useState({
    totalRecords: 0,
    currentPage: 1,
    totalPages: 1,
    nextPage: null,
    prevPage: null,
  });
  const [mostUsedBrowsers, setMostUsedBrowsers] = useState([]);
  const [mostUsedBrowsersLoading, setMostUsedBrowsersLoading] = useState(true);
  const [mostUsedBrowsersPagination, setMostUsedBrowsersPagination] = useState({
    totalRecords: 0,
    currentPage: 1,
    totalPages: 1,
    nextPage: null,
    prevPage: null,
  });

  const [mostViewedPages, setMostViewedPages] = useState([]);
  const [mostViewedPagesLoading, setMostViewedPagesLoading] = useState(true);
  const [mostViewedPagesPagination, setMostViewedPagesPagination] = useState({
    totalRecords: 0,
    currentPage: 1,
    totalPages: 1,
    nextPage: null,
    prevPage: null,
  });

  // Separate pagination states
  // const [allPagination, setAllPagination] = useState({
  //   totalRecords: 0,
  //   currentPage: 1,
  //   totalPages: 1,
  //   nextPage: null,
  //   prevPage: null,
  // });
  // const [popularPagination, setPopularPagination] = useState({
  //   totalRecords: 0,
  //   currentPage: 1,
  //   totalPages: 1,
  //   nextPage: null,
  //   prevPage: null,
  // });
  // const [viewedPagination, setViewedPagination] = useState({
  //   totalRecords: 0,
  //   currentPage: 1,
  //   totalPages: 1,
  //   nextPage: null,
  //   prevPage: null,
  // });

  // const fetchAllIdeas = async (page) => {
  //   setAllIdeasLoading(true);
  //   try {
  //     const response = await getAllIdeaService({ page: page, limit: 10 });
  //     setAllIdeas(response.data);
  //     setAllPagination({
  //       totalRecords: response.pagination.total_records,
  //       currentPage: response.pagination.current_page,
  //       totalPages: response.pagination.total_pages,
  //       nextPage: response.pagination.next_page,
  //       prevPage: response.pagination.prev_page,
  //     });
  //   } catch (error) {
  //     console.error("Error fetching all ideas:", error);
  //   } finally {
  //     setAllIdeasLoading(false);
  //   }
  // };

  // const fetchPopularIdeas = async (page) => {
  //   setPopularIdeasLoading(true);
  //   try {
  //     const response = await getAllIdeaService({
  //       page: page,
  //       limit: 10,
  //       sortPopularity: -1,
  //     });
  //     setPopularIdeas(response.data);
  //     setPopularPagination({
  //       totalRecords: response.pagination.total_records,
  //       currentPage: response.pagination.current_page,
  //       totalPages: response.pagination.total_pages,
  //       nextPage: response.pagination.next_page,
  //       prevPage: response.pagination.prev_page,
  //     });
  //   } catch (error) {
  //     console.error("Error fetching popular ideas:", error);
  //   } finally {
  //     setPopularIdeasLoading(false);
  //   }
  // };

  // const fetchViewedIdeas = async (page) => {
  //   setViewedIdeasLoading(true);
  //   try {
  //     const response = await getAllIdeaService({
  //       page: page,
  //       limit: 10,
  //       most_viewed: -1,
  //     });
  //     setViewedIdeas(response.data);
  //     setViewedPagination({
  //       totalRecords: response.pagination.total_records,
  //       currentPage: response.pagination.current_page,
  //       totalPages: response.pagination.total_pages,
  //       nextPage: response.pagination.next_page,
  //       prevPage: response.pagination.prev_page,
  //     });
  //   } catch (error) {
  //     console.error("Error fetching most viewed ideas:", error);
  //   } finally {
  //     setViewedIdeasLoading(false);
  //   }
  // };

  const fetchMostActiveUsers = async (page) => {
    setMostActiveUsersLoading(true);
    try {
      const response = await getMostActiveUsers({ page: page });
      setMostActiveUsers(response.data);
      setMostActiveUsersPagination({
        totalRecords: response.pagination.total_records,
        currentPage: response.pagination.current_page,
        totalPages: response.pagination.total_pages,
        nextPage: response.pagination.next_page,
        prevPage: response.pagination.prev_page,
      });
    } catch (error) {
      console.error("Error fetching most active users:", error);
    } finally {
      setMostActiveUsersLoading(false);
    }
  };

  const fetchMostUsedBrowsers = async (page) => {
    setMostUsedBrowsersLoading(true);
    try {
      const response = await getMostUsedBrowsers({ page: page });

      setMostUsedBrowsers(response.data);
      setMostUsedBrowsersPagination({
        totalRecords: response.pagination.total_records,
        currentPage: response.pagination.current_page,
        totalPages: response.pagination.total_pages,
        nextPage: response.pagination.next_page,
        prevPage: response.pagination.prev_page,
      });
    } catch (error) {
      console.error("Error fetching most active users:", error);
    } finally {
      setMostUsedBrowsersLoading(false);
    }
  };

  const fetchMostViewedPages = async (page) => {
    setMostViewedPagesLoading(true);
    try {
      const response = await getMostViewedPageService({ page: page });

      setMostViewedPages(response.data);
      setMostViewedPagesPagination({
        totalRecords: response.pagination.total_records,
        currentPage: response.pagination.current_page,
        totalPages: response.pagination.total_pages,
        nextPage: response.pagination.next_page,
        prevPage: response.pagination.prev_page,
      });
    } catch (error) {
      console.error("Error fetching most active users:", error);
    } finally {
      setMostViewedPagesLoading(false);
    }
  };

   useEffect(() => {
    switch (selectedTab) {
        // case "all":
        //     if (allIdeas.length === 0) fetchAllIdeas(1); 
        //     break;
        // case "popular":
        //     if (popularIdeas.length === 0) fetchPopularIdeas(1);
        //     break;
        // case "viewed":
        //     if (viewedIdeas.length === 0) fetchViewedIdeas(1);
        //     break;
        case "most_active_users":
            if (mostActiveUsers.length === 0) fetchMostActiveUsers(1);
            break;
        case "most_used_browser":
            if (mostUsedBrowsers.length === 0) fetchMostUsedBrowsers(1);
            break;
        case "most_viewed_page":
            if (mostViewedPages.length === 0) fetchMostViewedPages(1);
            break;
    }
}, [selectedTab]); 

  const handlePageChange = (page, tab) => {
    switch (tab) {
      case "most_active_users":
        fetchMostActiveUsers(page);
        break;
      case "most_used_browser":
        fetchMostUsedBrowsers(page);
        break;
      default:
        fetchMostActiveUsers(page);
        break;
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Reports</h2>
      </div>

      <Tabs onValueChange={setSelectedTab} defaultValue="most_active_users" className="w-full">
        <TabsList className="flex overflow-x-auto whitespace-nowrap mb-4 gap-2 lg:w-fit justify-normal">
          {/* <TabsTrigger className="" value="all">
            All
          </TabsTrigger>
          <TabsTrigger className="" value="popular">
            Most Popular
          </TabsTrigger>
          <TabsTrigger className="" value="viewed">
            Most Viewed
          </TabsTrigger> */}
          <TabsTrigger className="" value="most_active_users">
            Most Active Users
          </TabsTrigger>
          <TabsTrigger className="" value="most_used_browser">
            Most Used Browsers
          </TabsTrigger>
          <TabsTrigger className="" value="most_viewed_page">
            Most Viewed Pages
          </TabsTrigger>
        </TabsList>

        {/* <TabsContent value="all">
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
        </TabsContent> */}
        <TabsContent value="most_active_users">
          <MostActiveUsersTable
            users={mostActiveUsers}
            loading={mostActiveUsersLoading}
            pagination={mostActiveUsersPagination}
            handlePageChange={(page) =>
              handlePageChange(page, "most_active_users")
            }
          />
        </TabsContent>

        <TabsContent value="most_used_browser">
          <MostUsedBrowsersTable
            browsers={mostUsedBrowsers}
            loading={mostUsedBrowsersLoading}
            pagination={mostUsedBrowsersPagination}
            handlePageChange={(page) =>
              handlePageChange(page, "most_used_browser")
            }
          />
        </TabsContent>

        <TabsContent value="most_viewed_page">
          <MostViewedPagesTable
            pages={mostViewedPages}
            loading={mostViewedPagesLoading}
            pagination={mostViewedPagesPagination}
            handlePageChange={(page) =>
              handlePageChange(page, "most_viewed_page")
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminReports;
