import { useState } from "react";

type EntryProps = {
    category: string,
    role: string,
    hours: number
}

// each entry will have the name of the category, role, and a widget to edit the number of hours
export default function Entry({ category, role, hours }: EntryProps) {
    const [newHours, setHours] = useState(hours);

    function handleSubtract() {
        setHours((prev) => Math.max(prev - 1, 0)); // hours can't be negative
    }

    function handleAdd() {
        setHours((prev) => prev + 1);
    }

    function handleChange(e: any) {
        setHours(Math.max(e.target.value, 0));
    }

    return (
        <div className="flex flex-row">
            <div className="flex flex-col">
                <h4 className="text-sm font-medium">{category}</h4>
                <h2 className="text-lg font-semibold">{role}</h2>
            </div>
            
            <button onClick={handleSubtract} className="px-2 py-1 bg-gray-200 rounded">
                -
            </button>
            <input
                type="number"
                value={newHours}
                onChange={handleChange}
                className="w-12 text-center border rounded"
            />
            <button onClick={handleAdd} className="px-2 py-1 bg-gray-200 rounded">
                +
            </button>
        </div>
    );
}