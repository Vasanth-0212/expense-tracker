"use client";
import useStore from '../lib/useStockStore';


const Home = () => {

    interface StoreState {
        budget: number;
        expenses: number;
        balance: number;
        history: any[];
    }

    const budget = useStore((state: StoreState) => state.budget);
    const expenses = useStore((state: StoreState) => state.expenses);
    const balance = useStore((state : StoreState) => state.balance);
    const history = useStore((state: StoreState) => state.history);

    return (

        <div className='absolute top-1/4 left-96 flex flex-col space-y-12 items-center justify-center'>
            <h1 className='text-7xl font-extrabold font-sans text-gray-700'>Your Balance is Rs.{balance}</h1>
            <div className='flex justify-between space-x-12'>
                <div className='h-48 w-52 font-bold text-gray-600 text-2xl p-3 shadow-xl bg-gray-200 rounded-xl flex flex-col justify-center'>
                    <h1>Current Budget</h1>
                    <h1>{budget}</h1>
                </div>
                <div className='h-48 w-52 font-bold text-gray-600 text-2xl p-4 shadow-xl bg-gray-200 rounded-xl flex flex-col justify-center'>
                    <h1>Total Expenses</h1>
                    <h1>{expenses}</h1>
                </div>
            </div>
            <div>
                <h1 className='text-3xl font-extrabold font-sans text-gray-600'>History</h1>
                <div className='flex flex-col space-y-4'>
                    {history.map((item, index) => (
                        <div key={index} className='flex justify-between space-x-5 w-96 bg-gray-200 p-4 rounded-xl shadow-xl'>
                            <h1>{item.label}</h1>
                            <h1 className={`${!item.category ? 'text-green-500' : 'text-red-500'} font-bold`}>{item.category ? "-" : "+"} Rs.{item.amount}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;