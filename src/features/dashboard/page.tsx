import { useState } from 'react'
import TopNav from '../../components/navbar/TopNav'
import SideNav from '../../components/navbar/SideNav'
import Home from './Home/pages/Home'
import { Outlet } from 'react-router-dom'

const Page = () => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <main className='relative'>
      <TopNav onMenuClick={() => setOpen(true)} />
      <div className='hidden lg:block'>
        <SideNav/>
      </div>
      {open && <SideNav closeNav={() => setOpen(false)} />}
      <div className='absolute w-full top-20 px-3 lg:max-w-[82%] lg:right-0 lg:px-4'>
        {/* Welcome home, {username} */}
        {/* <Home/> */}
        <Outlet/>
      </div>
    </main>
  )
}

export default Page