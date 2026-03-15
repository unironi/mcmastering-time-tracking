import { EntryProps } from "./Entry";
import { supabase } from "./supabaseClient"
import { useState, useEffect } from "react";

// widget to create entry
// need to propagate selections to other components 
// and create "add" and "cancel" buttons

type addEntryProps = {
    addNewEntry: (entry: EntryProps) => void
}

export default function AddEntry({ addNewEntry }: addEntryProps) {
    const [categories, setCategories] = useState<any[]>([]); // list of categories to be extracted from supabase
    const [roles, setRoles] = useState<any[]>([]); // list of roles to be extracted from supabase
    
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedRole, setSelectedRole] = useState<string>("");
    const [hours, setHours] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            const { data, error } = await supabase.from('categories').select();
            if (error) {
                setError(error.message);
            } else {
                setCategories(data);
                setSelectedCategory((prev) => prev || data[0].name);
            }
        };   
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchRoles = async () => {
            const { data, error } = await supabase.from('roles').select();
            if (error) {
                setError(error.message);
            } else {
                setRoles(data);
                setSelectedRole((prev) => prev || data[0].name);
            }
        };   

        fetchRoles();
    }, []);

    function handleHoursChange(e: any) {
        setHours(Math.max(e.target.value, 0));
    }

    function handleAddClick() {
        addNewEntry({category: selectedCategory, role: selectedRole, hours});
    }

    if (error) return <p>Error: {error}</p>;

    return(
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Enter a new session</h2>

            <div className="flex flex-col">
                <label htmlFor="category" className="mb-2 font-medium text-gray-700">Category</label>
                <select 
                    name="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory((e.target as HTMLSelectElement).value)} 
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="role" className="mb-2 font-medium text-gray-700">Session Role</label>
                <select 
                    name="role" 
                    value={selectedRole}
                    onChange={(e) => setSelectedRole((e.target as HTMLSelectElement).value)} 
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {roles.map((r) => (
                        <option key={r.id} value={r.name}>{r.name}</option>
                    ))}
                </select>
            </div>
            
            <div className="flex flex-col">
                <label htmlFor="hours" className="mb-2 font-medium text-gray-700">Hours</label>
                <input 
                    name="hours"
                    type="number"
                    value={hours}
                    onChange={handleHoursChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="flex">
                <button onClick={handleAddClick} className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Add</button>
            </div>
        </div>
    )
}