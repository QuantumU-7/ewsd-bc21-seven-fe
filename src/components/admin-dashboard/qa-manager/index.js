'use client'
import { CategoryChart } from "@/components/leaderboards/components/CategoryChart";
import { DepartmentChart } from "@/components/leaderboards/components/DepartmentChart";
import { ContributorsByDepartment } from "@/components/leaderboards/components/ContributorsByDepartment";
import { HorizontalBarChart } from "@/components/shared/common/Chart/HorizontalBarChart";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAnonymousStatus } from "@/services/getAnonymousStatus";

const QaMangerDashboard = () => {

  const [loadingAnonymousStatus, setLoadingAnonymousStatus] = useState(false);
  const [anonymousStatus, setAnonymousStatus] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      setLoadingAnonymousStatus(true);

      try {
        const res = await getAnonymousStatus();
        setAnonymousStatus(res);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingAnonymousStatus(false);
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
            <span className="text-4xl font-bold">{anonymousStatus?.ideas || 0}</span>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Total Anonymous</CardTitle>
          </CardHeader>

          <CardContent>
            <span className="text-4xl font-bold">{anonymousStatus?.users || 0}</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QaMangerDashboard;
