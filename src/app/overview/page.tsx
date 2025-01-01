"use client";
import { useEffect, useState } from "react";
import useStore from "../lib/useStockStore";
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

// Define types for history and pie chart data
interface HistoryEntry {
    label: string;
    amount: number;
    category: string | null; // category can be null
}

interface StoreState {
    budget: number;
    expenses: number;
    balance: number;
    history: HistoryEntry[];
}

const Home = () => {
    const budget = useStore((state: StoreState) => state.budget);
    const expenses = useStore((state: StoreState) => state.expenses);
    const balance = useStore((state: StoreState) => state.balance);
    const history = useStore((state: StoreState) => state.history);

    // Define a type for pie chart data
    interface PieChartData {
        category: string;
        amount: number;
    }

    const [data, setData] = useState<PieChartData[]>(history.map((item) => ({
        amount: item.amount,
        category: item.category || "Unknown", // Fallback to "Unknown" if no category
    })));

    const [pieChartData, setPieChartData] = useState<PieChartData[]>([]);

    useEffect(() => {
        const categoryData: { [key: string]: number } = {};

        data.forEach(item => {
            if (categoryData[item.category]) {
                categoryData[item.category] += item.amount;
            } else {
                categoryData[item.category] = item.amount;
            }
        });

        categoryData['balance'] = balance;

        const formattedData = Object.keys(categoryData)
            .filter(category => category !== 'null') // Exclude 'null' categories
            .map(category => ({
                category,
                amount: categoryData[category],
            }));

        setPieChartData(formattedData);
    }, [data, balance]); // Add 'balance' as a dependency to update when it changes

    useEffect(() => {
        console.log(pieChartData);
    }, [pieChartData]);

    const [activeIndex, setActiveIndex] = useState(-1);

    const data1 = [
        { name: 'Geeksforgeeks', students: 400 },
        { name: 'Technical scripter', students: 700 },
        { name: 'Geek-i-knack', students: 200 },
        { name: 'Geek-o-mania', students: 1000 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BFE', '#FF6384'];

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="absolute top-[100px] left-[600px] flex flex-col space-y-12 items-center justify-center">
            <PieChart width={500} height={500}>
                <Pie
                    activeIndex={activeIndex}
                    data={data1}
                    dataKey="students"
                    outerRadius={250}
                    fill="green"
                    onMouseEnter={onPieEnter}
                    style={{ cursor: 'pointer', outline: 'none' }} 
                >
                    {data1.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    );
};

export default Home;
