import Navbar from 'components/Navbar'
import Header from 'components/Header'
import LeftNavigation from '@/components/LeftNavigation'
import DaysContainer from '@/components/DaysContainer'
import RightNavigation from '@/components/RightNavigation'

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Header />
      <div className='w-screen h-[560px] mt-[40px] flex'>
        <LeftNavigation />
        <DaysContainer />
        <RightNavigation />
      </div>
    </div>
  )
}