import { RefObject } from "react"

type insertTaskProps ={
    refer:RefObject<HTMLInputElement>
}

export default function InsertTask(props:insertTaskProps){
    return(
        <div>
            <input type="text" className="w-full outline-none" ref={props.refer}/>
        </div>
    )
}