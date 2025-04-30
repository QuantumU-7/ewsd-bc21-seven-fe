"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartContainer,
} from "@/components/ui/chart";
import { ideasByCategoryService } from "@/services/ideasByCategoryService";
import { Skeleton } from "@/components/ui/skeleton";

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
const chartConfig = {
    count: {
        label: "Ideas Count",
    },
};

// Custom tooltip component
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 border rounded shadow-lg">
                <p className="font-bold">{payload[0].payload.category}</p>
                <p>Ideas: {payload[0].value}</p>
            </div>
        );
    }
    return null;
};

export function CategoryByDepartment({ id }) {
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const categoryData = await ideasByCategoryService(id);
                if (categoryData) {
                    const formattedData = categoryData.labels.map((label, index) => ({
                        category: label,
                        count: categoryData.data[index],
                        color: colorPalette[index % colorPalette.length]
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
            {isLoading ? (
                <CardContent className="space-y-4">
                    <Skeleton className="h-[8vw] w-full" />
                </CardContent>
            ) : (
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
                            <Tooltip content={<CustomTooltip />} cursor={false} />
                            <Bar
                                dataKey="count"
                                radius={4}
                                fill={'hsl(var(--chart-5))'}
                            >
                                <LabelList
                                    dataKey="count"
                                    position="top"
                                    offset={12}
                                    className="text-foreground"
                                    fontSize={12}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            )}
        </Card>
    );
}