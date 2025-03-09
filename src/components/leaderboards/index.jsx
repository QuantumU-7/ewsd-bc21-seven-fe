"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MostPopularTable from "./components/MostPopularTable";
import { CategoryChart } from "./components/CategoryChart";
import { DepartmentChart } from "./components/DepartmentChart";
import { getAllIdeaService } from "@/services/getAllIdeas";
import MostViewedTable from "./components/MostViewdTable";

const IdeasDashboard = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const response = await getAllIdeaService();
      setIdeas(response.data);
    } catch (error) {
      console.error("Error fetching ideas:", error);
    } finally {
      setLoading(false);
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
          <MostPopularTable ideas={ideas} loading={loading} />
        </TabsContent>

        <TabsContent value="viewed" className="border rounded-md">
          <MostViewedTable ideas={ideas} loading={loading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IdeasDashboard;
