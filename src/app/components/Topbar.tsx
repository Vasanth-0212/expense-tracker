"use client";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

const Topbar = () => {
  const [lightMode, setLightMode] = useState(true);
  return (
    <div className="fixed top-0 left-0 w-full h-20 border-b-2 p-4 border-gray-200 bg-white z-10 flex items-center justify-between">
      <h1 className="text-3xl font-serif">Expense Tracker App</h1>
      <div>
        <button
          className="h-10 w-10 border border-gray-300 p-2 flex items-center justify-center rounded-lg"
          onClick={() => setLightMode(!lightMode)}
        >
          {lightMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};

export default Topbar;
