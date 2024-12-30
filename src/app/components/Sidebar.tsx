import { FaHome, FaPlusCircle, FaWallet, FaThLarge } from 'react-icons/fa';
import Link from 'next/link'; // Import Link from Next.js

const Sidebar = () => {
    return (
        <div className="fixed flex flex-col items-start top-20 p-4 space-y-5 text-xl h-screen w-[350px] border-r-2">
            <Link href="./home"
                className="flex items-center space-x-3 text-gray-800 hover:bg-gray-200 p-2 rounded-md">
                <FaHome className="w-6 h-6" />
                <h1>Home</h1>
            </Link>
            <Link href="./add-expense"
                className="flex items-center space-x-3 text-gray-800 hover:bg-gray-200 p-2 rounded-md">
                <FaPlusCircle className="w-6 h-6" />
                <h1>Add an Expense</h1>
            </Link>
            <Link href="./add-budget"
                className="flex items-center space-x-3 text-gray-800 hover:bg-gray-200 p-2 rounded-md">
                <FaWallet className="w-6 h-6" />
                <h1>Add / Update your Budget</h1>
            </Link>
            <Link href="./overview"
                className="flex items-center space-x-3 text-gray-800 hover:bg-gray-200 p-2 rounded-md">
                <FaThLarge className="w-6 h-6" />
                <h1>Overview</h1>
            </Link>
        </div>
    );
};

export default Sidebar;
