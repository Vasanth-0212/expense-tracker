"use client";
import { useEffect } from "react";
import useStore from "../lib/useStockStore";

interface StoreState {
    budget: number;
    history: any[];
    setBudget: (budget: number) => void;
    setExpenses: (budget: number) => void;
    setHistory: (history: any[]) => void;
}

const AddBudget = () => {

    const budget = useStore((state: StoreState) => state.budget);
    const setBudget = useStore((state: StoreState) => state.setBudget);
    const history = useStore((state: StoreState) => state.history);
    const setHistory = useStore((state: StoreState) => state.setHistory);

    const handleBudgetSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const budget = parseFloat((document.getElementById('budget-input') as HTMLInputElement).value);
        if (budget <= 0) {
            alert("Budget should be greater than 0");
        }
        setBudget(budget);
        setHistory([...history, { "label" : "Income Added", "category" : null, "amount" : budget }]);
        (document.getElementById('budget-input') as HTMLInputElement).value = '';
        alert("Budget set successfully");
    }

    const handleAddBudgetSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const income = parseFloat((document.getElementById('income-input') as HTMLInputElement).value);
        if (income <= 0) {
            alert("Budget should be greater than 0");
        }
        setBudget(budget + income);
        setHistory([...history, { "label" : "Income Added", "category" : null, "amount" : income }]);
        (document.getElementById('income-input') as HTMLInputElement).value = '';
        alert("Budget added successfully");
    }

    useEffect(() => {
        console.log(history);
    },[history]);


    return (
        <div className='absolute top-[120px] left-[450px] flex flex-col space-y-12 items-center justify-center'>
            <form onSubmit={handleBudgetSubmit}>
                <div className="flex flex-col space-y-4 justify-start">

                    <h1 className="text-xl font-bold">Set Your Income / Budget</h1>
                    <label htmlFor="budget" className="text-gray-600">Enter Your Budget </label>
                    <input type="number" id="budget-input" placeholder="Rs.5000" className="p-2 border border-gray-300 rounded-md" />
                    <button
                        className="bg-blue-500 text-white text-lg p-2 rounded-md"
                    >
                        Set Budget
                    </button>
                </div>
            </form>
            <form onSubmit={handleAddBudgetSubmit}>
                <div className="flex flex-col space-y-4 justify-start">

                    <h1 className="text-xl font-bold">Add Income to Your Budget</h1>
                    <label htmlFor="income" className="text-gray-600">Enter Your Income</label>
                    <input type="number" id="income-input" placeholder="Rs.5000" className="p-2 border border-gray-300 rounded-md" />
                    <button
                        className="bg-blue-500 text-white text-lg p-2 rounded-md"
                    >
                        Add to Budget
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddBudget;