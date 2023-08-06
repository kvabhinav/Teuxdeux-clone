type linesProps ={
    focus:()=>void
}

export default function Lines(props:linesProps) {
    const lines = 20
    let content = []
    for (let i = 0; i < lines; i++) {
        content.push(<div className="w-full h-[0.5px] bg-gray-400 mb-6"></div>)
    }
    return (
        <div className="" onClick={props.focus}>
            {content}
        </div>
    )
}