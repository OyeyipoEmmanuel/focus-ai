import { LuLayoutDashboard } from "react-icons/lu";
import { CiChat1 } from "react-icons/ci";
import { IoMdCheckboxOutline } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { IoAdd, IoBookOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { RxPerson } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import logo from "../../assets/focus-ai logo withoutName.png"
import type { ReactElement } from "react";
import { useGetUsername } from "../../hooks/useGetUsername";
import { useGetEmail } from "../../hooks/useGetUsername";
import { logOutApi } from "../../api/authAPI/loginApi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CtaButtons from "../buttons/CtaButtons";
import { MdDashboard } from "react-icons/md";

type NavLinks = {
    id: number;
    icon: ReactElement;
    linkTo: string;
    value: string;
}


const navLinks: NavLinks[] = [
    {
        id: 1,
        icon: <LuLayoutDashboard />,
        linkTo: "/",
        value: "Dashboard"
    },
    {
        id: 2,
        icon: <CiChat1 />,
        linkTo: "/chat-ai",
        value: "Chat"
    },
    {
        id: 3,
        icon: <IoMdCheckboxOutline />,
        linkTo: "/tasks",
        value: "Tasks"
    },
    {
        id: 4,
        icon: <SlCalender />,
        linkTo: "/schedule",
        value: "Schedule"
    },
    {
        id: 5,
        icon: <IoBookOutline />,
        linkTo: "/study",
        value: "Study"
    },
    {
        id: 6,
        icon: <CiSettings />,
        linkTo: "/settings",
        value: "Settings"
    },
]



const SideNav = (props: any) => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        try {
            logOutApi()
            navigate('/login', { replace: true })
            console.log("Success")
        } catch (error) {
            console.log("Err")
        }
    }
    return (
        <div className="fixed w-full z-50">
            <nav className="max-w-[70%] absolute z-10 bg-white min-h-screen lg:w-[calc(100%-82%)] py-3 flex flex-col justify-between ">

                <div className="px-6 md:px-4">
                    <section className="flex py-2 justify-between">
                        <div className="flex items-center space-x-2">
                            <img src={logo} alt="focus-ai logo" className="w-8" />
                            <h1 className="text-xl font-semibold">Assistant</h1>
                        </div>
                        <div>
                            <p className="font-semibold cursor-pointer lg:hidden" onClick={props.closeNav}>x</p>
                        </div>
                    </section>

                    <section className={`mt-6 flex flex-col space-y-6 ${location.pathname === "/chat-ai" && "hidden"}`}>
                        {navLinks.map((each) => (
                            <NavLink to={each.linkTo} key={each.id} className="" onClick={props.closeNav}>
                                <div className="flex items-center space-x-6 cursor-pointer">
                                    <span className="text-md">{each.icon}</span>
                                    <h1 className="text-md">{each.value}</h1>
                                </div>
                            </NavLink>
                        ))}
                    </section>

                    {location.pathname === "/chat-ai" && (
                        <section>
                            <div className="mt-5">
                                <CtaButtons className="w-full flex items-center justify-center">
                                    <IoAdd className="" />
                                    <p className="py-1">New Chat</p>
                                </CtaButtons>
                            </div>

                            <div className="mt-6 flex flex-col justify-between">
                                <h1 className="text-black/70 text-lg font-semibold">Recent Chats</h1>

                                <section className="max-h-64 my-3 overflow-y-auto">
                                    {/* MAP RECENT CHATS - call all chat endpoint and map the chat.title here with id*/}
                                    
                                    
                                </section>

                                <section>
                                    <button onClick={() =>navigate("/")} className="flex items-center justify-center space-x-2 border border-gray-300 px-5 py-2 rounded-full cursor-pointer hover:bg-black/10 duration-200 transition-all">
                                        <LuLayoutDashboard/>
                                        <p>Back to Dashboard</p>
                                    </button>
                                </section>
                            </div>
                        </section>
                    )}
                </div>

                <section className="border-t border-gray-300 flex flex-col space-y-6 py-4 px-6 md:px-4">
                    <div className="flex space-x-6 items-center cursor-pointer">
                        <RxPerson className="text-md" />
                        <span>
                            <h1 className="text-lg">{useGetUsername()}</h1>
                            <p className="text-[11px] text-gray-400">{useGetEmail()}</p>
                        </span>
                    </div>

                    <div className="flex items-center space-x-6 cursor-pointer" onClick={handleLogout}>
                        <IoIosLogOut className="text-md" />
                        <h1 className="text-md">Logout</h1>
                    </div>

                </section>
            </nav>
        </div>
    )
}

export default SideNav