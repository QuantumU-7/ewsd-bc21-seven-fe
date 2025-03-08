"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ideasByCategoryService } from "@/services/ideasByCategoryService";

const chartConfig = {
  count: {
    label: "Ideas Count",
    color: "hsl(var(--chart-1))",
  },
};

export function CategoryChart() {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const categoryData = await ideasByCategoryService();
        if (categoryData) {
          const formattedData = categoryData.labels.map((label, index) => ({
            category: label,
            count: categoryData.data[index],
          }));
          setChartData(formattedData);
        } else {
          setChartData([]);
        }
        setError("");
      } catch (err) {
        setError("Failed to load category data. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ideas By Category</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-64">
          <p>Loading data...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ideas By Category</CardTitle>
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
        <CardTitle>Ideas By Category</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="text-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
