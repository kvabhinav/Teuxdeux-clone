import { FiRepeat } from 'react-icons/Fi'
import { FiEdit2 } from 'react-icons/Fi'

import { DragEvent, useState} from 'react'

import state from './state'


//type declaration
type tasksProps = {
    tasks: {
        task: string,
        repeat: string
    },
    date: Date,
    index: number,
    total: number | undefined
}

export let draggedItem: any = null
export let itemChild:HTMLCollection

export default function Tasks(props: tasksProps) {

    const element = document.createElement('div')
    element.className = "move_bottom"

    //input management
    const [task, setTask] = useState<string>('')
    const [states, setState] = useState<"static" | "edit">('static')

    //handle ondragStart
    const handleOnDragStart = (e: DragEvent<HTMLDivElement>, id: tasksProps,children:HTMLCollection) => {
        itemChild=children
        e.dataTransfer?.setData('application/json', JSON.stringify(id))
        draggedItem = e.target
        setTimeout(() => {
            draggedItem.classList.add('void')
            for(let  i=0;i<children.length;i++){
                children[i].classList.add('hidden')
            }
        }, 0)
    }

    //handle onDragOVer
    const handleOnDragOver = (e: DragEvent) => {
        e.preventDefault()
    }

    //handleOndragenter function
    const handleOnDragEnter = (e: DragEvent) => {

        //removing of element
        element.ondragleave = () => {
            element.remove()
        }
        element.ondrop = () => {
            setTimeout(() => {
                element.remove()
            }, 10)
        }


        if(e.target===draggedItem){

        }else{
            if (element.isConnected) {
                element.remove()
                console.log('hidden false')
            } else {
                //adding element before the task or adding space
                  e.currentTarget.before(element)  
            }
        }
    }

    const onSubmit = async () => {
        const date = new Date(props.date)
        date.setHours(0, 0, 0, 0)
        const res = await fetch('api/tasks', {
            method: 'PUT',
            body: JSON.stringify({
                tasks: {
                    task: task,
                    repeat: props.tasks.repeat
                },
                prevTasks: props.tasks,
                date: date,
                key: props.index,
                insert: false

            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        state.refresh = true
        setState('static')

    }

    return (
        <>
            {states === "static" ? <><div id='taskdiv' className="hover:bg-red-100 flex justify-between items-center hover:cursor-grab mb-[0.7px]" draggable onDragStart={(e) => handleOnDragStart(e, props,e.currentTarget.children)} onDragOver={(e) => handleOnDragOver(e)} onDragEnter={(e) => handleOnDragEnter(e)} >
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
                <input type="text" className="w-full outline-none" value={task} onChange={(e) => setTask(e.target.value)} autoFocus onBlur={() => onSubmit()} />
            </div>}

        </>
    )
}