'use client'
import { CategoryChart } from "@/components/leaderboards/components/CategoryChart";
import { DepartmentChart } from "@/components/leaderboards/components/DepartmentChart";
import { ContributorsByDepartment } from "@/components/leaderboards/components/ContributorsByDepartment";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAnonymousStatus } from "@/services/getAnonymousStatus";

const AdminDashboard = () => {

  const [anonymousStatus, setAnonymousStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const res = await getAnonymousStatus();
        console.log(res);
        setAnonymousStatus(res);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8 my-8 px-4 h-[85vh] overflow-auto">
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <DepartmentChart />
        <CategoryChart />
        <ContributorsByDepartment />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Total Ideas by Anonymous Users</CardTitle>
          </CardHeader>

          <CardContent>
            <span className="text-4xl font-bold">{anonymousStatus?.ideasCount || 0}</span>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Total Anonymous Comments</CardTitle>
          </CardHeader>

          <CardContent>
            <span className="text-4xl font-bold">{anonymousStatus?.commentsCount || 0}</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
