"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { contributorsByDepartmentService } from "@/services/contributorsByDepartmentService";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  contributors: {
    label: "Contributors",
    color: "hsl(var(--chart-1))",
  },
};

export function HorizontalBarChart() {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const departmentData = await contributorsByDepartmentService();
        if (departmentData) {
          const formattedData = departmentData.labels.map((label, index) => ({
            department: label,
            contributors: departmentData.data[index],
          }));
          setChartData(formattedData);
        } else {
          setChartData([]);
        }
        setError("");
      } catch (err) {
        setError("Failed to load contributors data. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Contributors By Department</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-64">
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contributors By Department</CardTitle>
      </CardHeader>
      {isLoading ? (
        <CardContent className="space-y-4">
          <Skeleton className="h-[8vw] w-full" />
        </CardContent>
      ) : (
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{ left: 0 }}
            >
              <YAxis
                dataKey="department"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <XAxis dataKey="contributors" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="contributors" layout="vertical" radius={5} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
}
