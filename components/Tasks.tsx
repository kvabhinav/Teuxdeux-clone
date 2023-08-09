import { FiRepeat } from 'react-icons/Fi'
import { FiEdit2 } from 'react-icons/Fi'

import { useState } from 'react'

//type declaration
type tasksProps = {
    tasks: {
        task: string,
        repeat: string
    }
}

export default function Tasks(props: tasksProps) {

    //input management
    const [task, setTask] = useState<string>('')
    const [state, setState] = useState<"static" | "edit">('static')

    return (
        <>
            {state === "static" ? <><div className="hover:bg-red-100 flex justify-between items-center hover:cursor-grab mb-[0.7px]">
                <h1>{props.tasks.task}</h1>
                <div className='flex gap-x-2 '>
                    <FiRepeat className='hover:cursor-pointer' />
                    <FiEdit2 className='hover:cursor-pointer' onClick={() => {
                        setState('edit')
                        setTask(props.tasks.task)
                    }} />
                </div>
            </div>
                <div className='w-full h-[0.5px] bg-gray-400'>

                </div></> : <div>
                <input type="text" className="w-full outline-none" value={task} onChange={(e) => setTask(e.target.value)} autoFocus onBlur={() => setState("static")} />
            </div>}

        </>
    )
}