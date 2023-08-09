import Lines from "./Lines";
import InsertTask from "./InsertTask";
import Tasks from "./Tasks";

import { useRef,useState } from 'react'

type daysProps={
    date:Date,
    tasks?:{
        task:string,
        repeat:string
    }[]
}

export default function Days(props:daysProps) {

    //ref for input (insertTask)
    const inputRef = useRef<HTMLInputElement>(null)

    //function for focusing input on clicking lines
    const focusOnClick=()=>{
        inputRef.current?.focus()
    }

    //Days 
    const weekDays =['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY']
    // Months 
    const months = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']

    const date= new Date(props.date)
    const day = weekDays[date.getDay()]
    const month = months[date.getMonth()]
    const monthDate = date.getDate()
    const year = date.getFullYear()

    return (
        <div className="w-1/5 h-full border-l border-black grow-0 shrink-0 snap-center px-3 overflow-y-hidden">
            <h1 className="text-3xl text-center font-Bebas">{day}</h1>
            <h2 className="text-center text-xs mb-4">{month} {monthDate},{year}</h2>
            {props.tasks&&props.tasks.map((task)=>{
                return(
                    <Tasks tasks={task} />
                )
            })}
            <InsertTask  refer={inputRef} date={date} />
            <Lines focus={focusOnClick}/>
        </div>
    )
}