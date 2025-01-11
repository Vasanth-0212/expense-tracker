"use client";
import { useState, useEffect, useMemo } from "react";
import useStore from "../lib/useStockStore";
import { PieChart, Pie, Tooltip } from 'recharts';

interface HistoryEntry {
    label: string;
    amount: number;
    category: string | null; 
}

interface StoreState {
    budget: number;
    expenses: number;
    balance: number;
    history: HistoryEntry[];
}

const Overview = () => {
    const history = useStore((state: StoreState) => state.history);
    const [pieChartData, setPieChartData] = useState<any>([]);

    const data = useMemo(() => {
        return history
            .filter((entry) => entry.category !== null)
            .map((entry) => ({ name: entry.category, value: entry.amount }));
    }, [history]);

    useEffect(() => {
        const categoryData: { [key: string]: number } = {};

        if (data) {
            data.forEach(item => {
                if (item.name && categoryData[item.name]) {
                    categoryData[item.name] += item.value;
                } else {
                    if (item.name) {
                        categoryData[item.name] = item.value;
                    }
                }
            });
        }

        const formattedData = Object.keys(categoryData).map(key => ({
            name: key,
            value: categoryData[key]
        }));

        setPieChartData((prevData : any) => {
            if (JSON.stringify(prevData) !== JSON.stringify(formattedData)) {
                return formattedData;
            }
            return prevData;
        });
    }, [data]);

    return (
        <div className="absolute top-[100px] left-[600px] flex flex-col space-y-12 items-center justify-center">
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                />
                <Tooltip />
            </PieChart>
        </div>
    );
};

export default Overview;
