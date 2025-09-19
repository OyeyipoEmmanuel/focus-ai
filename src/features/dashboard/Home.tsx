import React from 'react'
import { useGetUsername } from '../../hooks/useGetUsername'
import TopNav from '../../components/navbar/TopNav'
import SideNav from '../../components/navbar/SideNav'

const Home = () => {
  const username = useGetUsername()
  return (
    <main className='relative'>
      <TopNav/>
      <SideNav/>
      <div className='absolute top-20 px-3 lg:min-w-[83%] lg:right-0 lg:px-4'>
        Welcome home, {username}
      </div>
    </main>
  )
}

export default Home