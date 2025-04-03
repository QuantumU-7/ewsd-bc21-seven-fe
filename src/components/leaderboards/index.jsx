"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MostPopularTable from "./components/MostPopularTable";
import { CategoryChart } from "./components/CategoryChart";
import { DepartmentChart } from "./components/DepartmentChart";
import { getAllIdeaService } from "@/services/getAllIdeas";
import MostViewedTable from "./components/MostViewdTable";

const IdeasDashboard = () => {
  const [popularIdeas, setPopularIdeas] = useState([]);
  const [viewedIdeas, setViewedIdeas] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingViewed, setLoadingViewed] = useState(true);

  useEffect(() => {
    fetchPopularIdeas();
    fetchViewedIdeas();
  }, []);

  const fetchPopularIdeas = async () => {
    setLoadingPopular(true);
    try {
      const response = await getAllIdeaService({
        sortPopularity: -1, // Sort by likes in descending order
        limit: 10
      });
      setPopularIdeas(response.data);
    } catch (error) {
      console.error("Error fetching popular ideas:", error);
    } finally {
      setLoadingPopular(false);
    }
  };

  const fetchViewedIdeas = async () => {
    setLoadingViewed(true);
    try {
      const response = await getAllIdeaService({
        most_viewed: -1,
        limit: 10
      });
      setViewedIdeas(response.data);
    } catch (error) {
      console.error("Error fetching viewed ideas:", error);
    } finally {
      setLoadingViewed(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 my-8 px-4 h-[85vh] overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <DepartmentChart />
        <CategoryChart />
      </div>

      <Tabs defaultValue="popular" className="w-full">
        <TabsList className="grid w-[15vw] grid-cols-2 mb-2">
          <TabsTrigger value="popular">Most Popular</TabsTrigger>
          <TabsTrigger value="viewed">Most Viewed</TabsTrigger>
        </TabsList>

        <TabsContent value="popular" className="border rounded-md">
          <MostPopularTable ideas={popularIdeas} loading={loadingPopular} />
        </TabsContent>

        <TabsContent value="viewed" className="border rounded-md">
          <MostViewedTable ideas={viewedIdeas} loading={loadingViewed} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IdeasDashboard;
