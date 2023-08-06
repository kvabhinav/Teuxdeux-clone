import Lines from "./Lines";
import InsertTask from "./InsertTask";
import Tasks from "./Tasks";

import { useRef } from 'react'

export default function Days() {

    const inputRef = useRef<HTMLInputElement>(null)
    const focusOnClick=()=>{
        inputRef.current?.focus()
    }
    return (
        <div className="w-1/5 h-full border-l border-black grow-0 shrink-0 snap-center px-3 overflow-y-hidden">
            <h1 className="text-3xl text-center font-Bebas">SUNDAY</h1>
            <h2 className="text-center text-xs mb-4">AUGUST 6,2023</h2>
            <Tasks />
            <InsertTask  refer={inputRef} />
            {/* <input type="text" className="w-full outline-none" ref={inputRef} /> */}
            <Lines focus={focusOnClick}/>
        </div>
    )
}