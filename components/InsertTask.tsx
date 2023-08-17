import { RefObject, useState} from "react"

import state from '../components/state'


type insertTaskProps = {
    refer: RefObject<HTMLInputElement>,
    date: Date
    tasks: boolean
}

export default function InsertTask(props: insertTaskProps) {

    const [task, setTask] = useState<string>('')


    const submitTask = async () => {

        if (task !== '') {

            if (props.tasks) {
                //initiating date for the inserting task
                const date = new Date(props.date)
                date.setHours(0, 0, 0, 0)
                console.log(date)

                //fetch request for updating array of tasks
                const res = await fetch('/api/tasks', {
                    method: 'PUT',
                    body: JSON.stringify({ task, date,insert:true }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const result = await res.json()
                //for refreshing after submitting the task
                state.refresh = true
                //setting input to null
                setTask('')
            } else {
                //initiating date for the inserting task
                const date = new Date(props.date)
                date.setHours(0, 0, 0, 0)

                console.log(date)
                //fetch request for inserting a task
                const res = await fetch('/api/tasks', {
                    method: 'POST',
                    body: JSON.stringify({ task, date }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const result = await res.json()
                //for refreshing after submitting the task
                state.refresh = true
                //setting input to null
                setTask('')
            }
        }


    }



    return (
        <div>
            <input type="text" className="w-full outline-none" onChange={(e) => { setTask(e.target.value) }} value={task} ref={props.refer} onBlur={submitTask} />
        </div>
    )
}