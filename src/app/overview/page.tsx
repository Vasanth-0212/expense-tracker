"use client";
import { useEffect, useState } from "react";
import useStore from "../lib/useStockStore";
import { PieChart, Pie, Tooltip, Cell } from 'recharts';


interface StoreState {
    budget: number;
    expenses: number;
    balance: number;
    history: any[];
}

const Home = () => {

    const budget = useStore((state: StoreState) => state.budget);
    const expenses = useStore((state: StoreState) => state.expenses);
    const balance = useStore((state: StoreState) => state.balance);
    const history = useStore((state: StoreState) => state.history);
    const [data, setData] = useState<any[]>(
        history.map((item, index) => {
            return {
                amount: item.amount,
                category: item.category
            };
        })
    );

    const [pieChartData, setPieChartData] = useState<any[]>([]);

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
            .filter(category => category !== 'null')
            .map(category => ({
                category,
                amount: categoryData[category]
            }));

        setPieChartData(formattedData);
    }, [data]);

    useEffect(() => {
        console.log(pieChartData)
    }, [pieChartData]);


    const [activeIndex, setActiveIndex] = useState(-1);

    const data1 = [
        { name: 'Geeksforgeeks', students: 400 },
        { name: 'Technical scripter', students: 700 },
        { name: 'Geek-i-knack', students: 200 },
        { name: 'Geek-o-mania', students: 1000 }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BFE', '#FF6384'];

    interface PieEnterEvent {
        index: number;
    }

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
    )
}

export default Home;