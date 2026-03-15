import { useState } from "react";

export type EntryProps = {
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
        <div className="w-full max-w-2xl mx-auto p-3 mb-3 bg-white rounded-xl shadow">
            <div className="grid grid-cols-2 items-center">
                <div className="flex flex-col">
                    <h4 className="text-sm font-medium truncate">{category}</h4>
                    <h2 className="text-lg font-semibold truncate">{role}</h2>
                </div>
                
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={handleSubtract}
                        className="px-4 py-1 bg-gray-200 rounded"
                        aria-label="decrease hours"
                    >
                        -
                    </button>
                    <input
                        type="number"
                        value={newHours}
                        onChange={handleChange}
                        className=" py-1 w-12 text-center border rounded"
                    />
                    <button
                        onClick={handleAdd}
                        className="px-4 py-1 bg-blue-200 rounded"
                        aria-label="increase hours"
                    >
                        +
                    </button>
                </div>
                
            </div>
        </div>
        
    );
}