import { supabase } from "./supabaseClient"
import { useState, useEffect } from "react";

// widget to create entry
// need to propagate selections to other components 
// and create "add" and "cancel" buttons

export default function AddEntry() {
    const [categories, setCategories] = useState<any[]>([]);
    const [roles, setRoles] = useState<any[]>([]);
    const [hours, setHours] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            const { data, error } = await supabase.from('categories').select();
            if (error) {
                setError(error.message);
            } else {
                setCategories(data);
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
            }
        };   

        fetchRoles();
    }, []);

    function handleHoursChange(e: any) {
        setHours(Math.max(e.target.value, 0));
    }

    if (error) return <p>Error: {error}</p>;

    return(
        <>
            <h2>Enter a new session</h2>
            <label htmlFor="category">Pick your category.</label>
            <select name="category">
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
            </select>

            <label htmlFor="role">Pick your session role.</label>
            <select name="role">
                {roles.map((r) => (
                    <option key={r.id} value={r.name}>{r.name}</option>
                ))}
            </select>
            
            <label htmlFor="hours">Enter number of hours.</label>
            <input 
                name="hours"
                type="number"
                value={hours}
                onChange={handleHoursChange}
            />
        </>
    )
}