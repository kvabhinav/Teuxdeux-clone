import { ObjectId } from "mongoose";
import Days from "./Days";

import { useEffect, useState } from "react";

export default function DaysContainer() {

    // type declarations 
    type arrayOfDays = {
        _id: ObjectId,
        date: Date,
        tasks?: {
            task: string,
            repeat: string
        }[]
    }

    // variable and state declarations 
    let days: JSX.Element[] = []
    let day: Date
    const [array, setArray] = useState<arrayOfDays[]>([])
    let found: boolean = false


    // fetching tasks 
    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('/api/tasks')
            if (!response.ok) {
                throw new Error('Failed to fetch data')
            }
            const data = await response.json()
            setArray(data)
        }
        fetchTasks()
    }, [])

    //check if two dates are same
    function areDatesEqual(date1: Date, date2: Date): boolean {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }

    //checking and inserting tasks to each days
    for (let i = 0; i < 14; i++) {
        found=false
        day = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + i * 24 * 60 * 60 * 1000)
        for (let j = 0; j < array.length; j++) {

            let date = new Date(array[j].date)
            if (areDatesEqual(day,date)) {
                days.push(<Days date={day} tasks={array[j].tasks} />)
                found = true
                break
            }
        }
        if (!found) {
            days.push(<Days date={day} />)
        }
    }
    
    return (
        <div className="w-full h-full flex flex-nowrap overflow-x-scroll snap-x snap-mandatory example">
            {days.map((day, index) => day)}
        </div>
    )
}