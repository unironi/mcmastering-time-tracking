import { useEffect, useState } from 'react'
import Entry, { EntryProps } from './Entry'
import AddEntry from './AddEntry'
import './index.css'

export default function HomePage() {
    const [entries, setEntries] = useState<EntryProps[]>([]);
    const [addEntry, setAddEntry] = useState(false);

    function newEntry(entry: EntryProps){
        setEntries((prev) => [...prev, entry]);
        setAddEntry(false); // returning back to home screen/closing add entry pop-up after creating new entry
    }

    return (
        <div className="flex flex-col items-center justify-center m-4">
            <h1 className="mb-4">Your Entries</h1>
            {addEntry && <AddEntry addNewEntry={newEntry}/>}
            {!addEntry && entries.map((entry) => (
                <Entry category={entry.category} role={entry.role} hours={entry.hours}/>
            ))}
            <button 
                onClick={() => setAddEntry(!addEntry)}
                className="sticky bottom-10 bg-yellow-500 hover:bg-yellow-700 font-bold px-6 py-4 rounded-full m-4 text-2xl"
            >
                {addEntry? "×" : "+"}
            </button>
        </div>
    )
}