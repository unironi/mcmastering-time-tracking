import { useEffect, useState } from 'react'
import Entry from './Entry'

export default function HomePage() {

    return (
        <>
        <h1 className="mb-4">Your Entries</h1>
        <Entry category="royal college" role="examiner" hours={3} />
        </>
    )
}