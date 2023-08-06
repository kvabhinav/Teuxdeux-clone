import { FiRepeat } from 'react-icons/Fi'
import { FiEdit2 } from 'react-icons/Fi'

export default function Tasks() {
    return (
        <>
            <div className="hover:bg-red-100 flex justify-between items-center hover:cursor-grab mb-[0.7px]">
                <h1>Nail cutting</h1>
                <div className='flex gap-x-2 '>
                    <FiRepeat className='hover:cursor-pointer' />
                    <FiEdit2 className='hover:cursor-pointer' />
                </div>
            </div>
            <div className='w-full h-[0.5px] bg-gray-400'>

            </div>
        </>
    )
}