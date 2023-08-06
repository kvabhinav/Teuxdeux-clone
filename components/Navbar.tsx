import { BiSearch } from 'react-icons/Bi'
import { FaBell } from 'react-icons/Fa'
import { RiSettings3Fill } from 'react-icons/Ri'

export default function Navbar() {
    return (
        <div className="w-full bg-red-500 h-12 2xl:px-20 flex justify-between place-items-center">
            <div className=' hover:bg-red-700 p-1 rounded-md'   >
                <BiSearch color='white' size={20} className='cursor-pointer'/>
            </div>
            <div>
                <h1 className='text-white font-bold text-lg cursor-pointer'>TEUXDEUX</h1>
            </div>
            <div className='flex justify-between gap-4'>
                <div className='hover:bg-red-700 p-1 rounded-md'>
                    <FaBell color='white' size={20} className='cursor-pointer' />
                </div>
                <div className='hover:bg-red-700 p-1 rounded-md'>
                    <RiSettings3Fill color='white' size={20} className='cursor-pointer' />
                </div>
            </div>
        </div>
    )
}