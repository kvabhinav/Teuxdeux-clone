import Lines from "./Lines";
import InsertTask from "./InsertTask";
import Tasks from "./Tasks";

import { DragEvent, useRef, useState } from 'react'
import state from "./state";

type daysProps = {
    date: Date,
    tasks?: {
        task: string,
        repeat: string
    }[]
}

export default function Days(props: daysProps) {

    //ref for input (insertTask)
    const inputRef = useRef<HTMLInputElement>(null)

    //checking if there is a task already in that day
    let isNotEmpty: boolean
    if (props.tasks === undefined) {
        isNotEmpty = false
    } else {
        isNotEmpty = true
    }

    //function for focusing input on clicking lines
    const focusOnClick = () => {
        inputRef.current?.focus()
    }

    //Days 
    const weekDays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
    // Months 
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']

    const date = new Date(props.date)
    const day = weekDays[date.getDay()]
    const month = months[date.getMonth()]
    const monthDate = date.getDate()
    const year = date.getFullYear()


    // changing days 
    const changeDay = async (newDate: Date, task: daysProps, prevDate: Date, index1: number | undefined, index2: number,length:number) => {
        const date1 = new Date(newDate)
        date1.setHours(0, 0, 0, 0)

        const date2 = new Date(prevDate)
        date2.setHours(0, 0, 0, 0)

        console.log(index2)

        //function for checking if two dates are same
        function areDatesEqual(date1: Date, date2: Date): boolean {
            return (
                date1.getFullYear() === date2.getFullYear() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getDate() === date2.getDate()
            );
        }


        if (areDatesEqual(date1,date2)) {
            
        } else {
            const res = await fetch('api/moveTasks', {
                method: 'POST',
                body: JSON.stringify({
                    task: task,
                    newDate: date1,
                    index: index1
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()

            const res2 = await fetch('api/moveTasks', {
                method: 'DELETE',
                body: JSON.stringify({
                    task: task,
                    prevDate: date2,
                    index: index2,
                    length:length
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data2 = await res2.json()
            state.refresh = true
        }
    }


    //droppable function
    const onDroppable = (e: DragEvent, date: Date) => {
        const data = JSON.parse(e.dataTransfer.getData('application/json'))
        changeDay(date, data.tasks, data.date, props.tasks?.length, data.index,data.total)

    }

    return (
        <div className="w-1/5 h-full border-l border-black grow-0 shrink-0 snap-center px-3 overflow-y-hidden" onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDroppable(e, props.date)} >
            <h1 className="text-3xl text-center font-Bebas">{day}</h1>
            <h2 className="text-center text-xs mb-4">{month} {monthDate},{year}</h2>
            {props.tasks && props.tasks.map((task, index) => {
                return (
                    <Tasks tasks={task} key={index} date={props.date} index={index} total={props.tasks?.length} />
                )
            })}
            <InsertTask refer={inputRef} date={date} tasks={isNotEmpty} />
            <Lines focus={focusOnClick} />
        </div>
    )
}