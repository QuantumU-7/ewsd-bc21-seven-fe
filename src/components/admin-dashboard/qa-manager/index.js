'use client'
import { CategoryChart } from "@/components/leaderboards/components/CategoryChart";
import { DepartmentChart } from "@/components/leaderboards/components/DepartmentChart";
import { ContributorsByDepartment } from "@/components/leaderboards/components/ContributorsByDepartment";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAnonymousStatus } from "@/services/getAnonymousStatus";

const QaMangerDashboard = () => {

  const [anonymousStatus, setAnonymousStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const res = await getAnonymousStatus();
        setAnonymousStatus(res);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex ">
      {/* Charts */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Total Ideas by Anonymous Users</CardTitle>
          </CardHeader>

          <CardContent>
            <span className="text-4xl font-bold">{anonymousStatus?.ideasCount || 0}</span>
          </CardContent>
        </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* <DepartmentChart /> */}
        <CategoryChart />
        <ContributorsByDepartment />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      </div>
    </div>
  );
};

export default QaMangerDashboard;
