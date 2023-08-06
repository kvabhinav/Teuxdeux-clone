import Days from "./Days";

export default function DaysContainer(){
    return(
        <div className="w-full h-full flex flex-nowrap overflow-x-scroll snap-x snap-mandatory example">
            <Days />
            <Days />
            <Days />
            <Days />
            <Days />
            <Days />
        </div>
    )
}