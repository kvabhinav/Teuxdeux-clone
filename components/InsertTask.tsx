import { RefObject, useState, useRef } from "react"


type insertTaskProps = {
    refer: RefObject<HTMLInputElement>,
    date:Date
}

export default function InsertTask(props: insertTaskProps) {

    const [task, setTask] = useState<string>('')


    const submitTask = async () => {

        if (task !== '') {

            //initiating date for the inserting task
            const date = new Date(props.date)
            date.setHours(0,0,0,0)
            
            //fetch request for inserting a task
            const res = await fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify({ task, date }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const result = await res.json()
            //setting input to null
            setTask('')
        }


    }



    return (
        <div>
            <input type="text" className="w-full outline-none" onChange={(e) => { setTask(e.target.value) }} value={task} ref={props.refer} onBlur={submitTask} />
        </div>
    )
}