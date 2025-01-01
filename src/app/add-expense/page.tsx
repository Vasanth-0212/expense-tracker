"use client";
import { useEffect } from "react";
import useStore from "../lib/useStockStore";

// Define a type for history entry
interface HistoryEntry {
    label: string;
    amount: number;
    category: string;
}

interface StockStore {
    budget: number;
    expenses: number;
    history: HistoryEntry[];  // Use HistoryEntry type for the history array
    setBudget: (budget: number) => void;
    setExpenses: (expenses: number) => void;
    setHistory: (history: HistoryEntry[]) => void;
}

const AddExpense = () => {
    const expenses = useStore((state: StockStore) => state.expenses);
    const setExpenses = useStore((state: StockStore) => state.setExpenses);
    const history = useStore((state: StockStore) => state.history);
    const setHistory = useStore((state: StockStore) => state.setHistory);

    const handleExpenseSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const label = (document.getElementById('label-input') as HTMLInputElement).value;
        const expense = parseFloat((document.getElementById('expense-input') as HTMLInputElement).value);
        const category = (document.getElementById('category') as HTMLSelectElement).value;
        if (expense <= 0) {
            alert("Expense should be greater than 0");
        }
        setExpenses(expenses + expense);
        setHistory([...history, { label, amount: expense, category }]);
        (document.getElementById('expense-input') as HTMLInputElement).value = '';
        (document.getElementById('label-input') as HTMLInputElement).value = '';
        (document.getElementById('category') as HTMLSelectElement).value = '';
        alert("Expense added successfully");
    }

    useEffect(() => {
        console.log(history);
    }, [history]);

    return (
        <div className='absolute top-[120px] left-[450px] flex flex-col space-y-12 items-center justify-center'>
            <form onSubmit={handleExpenseSubmit}>
                <div className="flex flex-col space-y-4 justify-start">
                    <h1 className="text-xl font-bold">Add Expense</h1>
                    <label htmlFor="expense" className="text-gray-600">Enter Amount</label>
                    <input type="number" id="expense-input" placeholder="Rs.5000" className="p-2 border border-gray-300 rounded-md" required />
                    <label htmlFor="label" className="text-gray-600">Label</label>
                    <input type="text" id="label-input" placeholder="Ex: Car Emi" className="p-2 border border-gray-300 rounded-md" required />
                    <label htmlFor="category" className="text-gray-600">Select Category</label>
                    <select id="category" className="p-2 border border-gray-300 rounded-md" required>
                        <option value="" disabled selected>Select a category</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="groceries">Groceries</option>
                        <option value="medical">Medical</option>
                        <option value="transportation">Transportation</option>
                        <option value="utilities">Utilities</option>
                    </select>
                    <button className="bg-blue-500 text-white text-lg p-2 rounded-md">
                        Add Expense
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddExpense;
