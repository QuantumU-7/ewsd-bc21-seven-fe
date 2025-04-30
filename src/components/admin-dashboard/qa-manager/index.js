'use client'
import { ContributorsByDepartment } from "@/components/leaderboards/components/ContributorsByDepartment";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryByDepartment } from "./components/CategoryByDepartment";
import { TokenKeys } from "@/constants/tokenKeys";
import { ideasByDepartmentService } from "@/services/ideasByDepartmentService";

const QaManagerDashboard = () => {
  const [department, setDepartmentIdeas] = useState(null);
  const [ideasCount, setIdeasCount] = useState(0);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem(TokenKeys.user));
    if (userData) {
      setDepartmentIdeas(userData.department);
      fetchData(userData.department.id);
    }
  }, []);

  const fetchData = async (id) => {
    try {
      const response = await ideasByDepartmentService(id);
      if (response && response.data && response.data.length > 0) {
        setIdeasCount(response.data[0]);
      } else {
        setIdeasCount(0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 my-8 px-4 h-full overflow-auto pb-12">

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="shadow-md w-full h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">
            Total Ideas in {department?.name || "Department"} Department
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[90%]">
          <span className="text-6xl font-bold block py-2 text-center">{ideasCount}</span>
        </CardContent>
      </Card>
        {department && (
          <CategoryByDepartment id={department.id} />
        )}

        <ContributorsByDepartment />
      </div>
    </div>
  );
};

export default QaManagerDashboard;