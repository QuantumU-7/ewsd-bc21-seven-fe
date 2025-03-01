import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MostPopularTable from "./components/MostPopularTable";
import MostViewdTable from "./components/MostViewdTable";
import { CategoryChart } from "./components/CategoryChart";
import { DepartmentChart } from "./components/DepartmentChart";

const IdeasDashboard = () => {
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
          <MostPopularTable />
        </TabsContent>

        <TabsContent value="viewed" className="border rounded-md">
          <MostViewdTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IdeasDashboard;
