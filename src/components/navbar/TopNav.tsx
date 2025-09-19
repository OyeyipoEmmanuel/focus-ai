import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiMoon } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";
import { RxPerson } from "react-icons/rx";
import { useLocation } from "react-router-dom";



const TopNav = () => {
    const location = useLocation()
    const path = location.pathname.slice(1,).toUpperCase()
  return (
    <nav className='border-b border-gray-300 w-full lg:max-w-[83%] lg:right-0 absolute flex justify-between items-center px-4 py-3'>
        <div>
            {/* COntent for lg screen */}
            <h1 className="hidden lg:block font-semibold text-2xl text-primaryblue-300">{path ?? "HOME"}</h1>
            <RxHamburgerMenu className="text-xl lg:hidden"/>
            
        </div>

        <div className='flex items-center space-x-8'>
            <span>
                <FiMoon className='cursor-pointer text-lg'/>
            </span>
            <span className='flex items-center space-x-4'>
                <IoMdNotificationsOutline className='cursor-pointer text-3xl relative'/>
                <aside className="w-5 h-5 bg-primaryblue-300 rounded-full text-white font-semibold text-xs text-center pt-0.5 absolute top-2 right-14">3</aside>
                <span className="bg-[#225CFC] p-2 rounded-full">
                    <RxPerson className=" text-white text-lg cursor-pointer "/>
                </span>
                
            </span>
            

        </div>
    </nav>
  )
}

export default TopNav