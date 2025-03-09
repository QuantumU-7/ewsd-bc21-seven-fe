"use client";

import { useEffect, useState } from "react";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ideasByDepartmentService } from "@/services/ideasByDepartmentService";

// Predefined color palette for departments
const colorPalette = [
  "hsl(var(--chart-1))", // blue
  "hsl(var(--chart-2))", // green
  "hsl(var(--chart-3))", // yellow
  "hsl(var(--chart-4))", // red
  "hsl(var(--chart-5))", // purple
  "hsl(var(--chart-6))", // cyan
  "hsl(var(--chart-7))", // orange
  "hsl(var(--chart-8))", // pink
];

export function DepartmentChart() {
  const [chartData, setChartData] = useState([]);
  const [chartConfig, setChartConfig] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const departmentData = await ideasByDepartmentService();

        if (departmentData && departmentData.labels && departmentData.data) {
          // Create dynamic chart config based on API response
          const dynamicConfig = {};

          // Generate formatted chart data with colors
          const formattedData = departmentData.labels.map((label, index) => {
            // Assign a color from palette (loop around if more departments than colors)
            const colorIndex = index % colorPalette.length;
            const color = colorPalette[colorIndex];

            // Add to config
            dynamicConfig[label] = {
              label: label,
              color: color,
            };

            return {
              department: label,
              visitors: departmentData.data[index],
              fill: color,
            };
          });

          setChartData(formattedData);
          setChartConfig(dynamicConfig);
        } else {
          setChartData([]);
          setChartConfig({});
        }
        setError("");
      } catch (err) {
        setError("Failed to load department data. Please try again later.");
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
          <CardTitle>Ideas By Department</CardTitle>
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
          <CardTitle>Ideas By Department</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-64">
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  const totalIdeas = chartData.reduce((acc, curr) => acc + curr.visitors, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ideas By Department</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="department"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalIdeas.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
