"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { contributorsByDepartmentService } from "@/services/contributorsByDepartmentService";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const colorPalette = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-6))",
    "hsl(var(--chart-7))",
];

export function ContributorsByDepartment() {
    const [chartData, setChartData] = useState([]);
    const [chartConfig, setChartConfig] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const data = await contributorsByDepartmentService();

                if (data && data.labels && data.data) {
                    // Generate chartConfig dynamically
                    const config = {
                        contributors: {
                            label: "Contributors",
                        }
                    };

                    data.labels.forEach((label, index) => {
                        config[label] = {
                            label: label,
                            color: colorPalette[index % colorPalette.length]
                        };
                    });

                    setChartConfig(config);

                    // Format data for the chart
                    const formattedData = data.labels.map((label, index) => ({
                        department: label,
                        contributors: data.data[index],
                        fill: colorPalette[index % colorPalette.length],
                    }));

                    setChartData(formattedData);
                } else {
                    setChartData([]);
                    setChartConfig({});
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
                    <CardTitle>Contributors By Department (Users)</CardTitle>
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
                <CardTitle>Contributors By Department (Users)</CardTitle>
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
                            margin={{
                                left: 0,
                            }}
                        >
                            <YAxis
                                dataKey="department"
                                type="category"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => chartConfig[value]?.label}
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