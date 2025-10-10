import { LuLayoutDashboard } from "react-icons/lu";
import { CiChat1 } from "react-icons/ci";
import { IoMdCheckboxOutline } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { IoBookOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { RxPerson } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import logo from "../../assets/focus-ai logo withoutName.png"
import type { ReactElement } from "react";
import { useGetUsername } from "../../hooks/useGetUsername";
import { useGetEmail } from "../../hooks/useGetUsername";
import { logOutApi } from "../../api/authAPI/loginApi";
import { NavLink, useNavigate } from "react-router-dom";

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

    const handleLogout = () => {
        try {
            logOutApi()
            navigate('/login', {replace: true})
            console.log("Success")
        } catch (error) {
            console.log("Err")
        }
    }
    return (
        <div className="fixed w-full z-50">
            <nav className="max-w-[70%] absolute z-10 bg-white min-h-screen lg:w-[calc(100%-82%)] py-3 flex flex-col justify-between ">

                <div className="px-8">
                    <section className="flex py-2 justify-between">
                        <div className="flex items-center space-x-2">
                            <img src={logo} alt="focus-ai logo" className="w-8" />
                            <h1 className="text-xl font-semibold">Assistant</h1>
                        </div>
                        <div>
                            <p className="font-semibold cursor-pointer lg:hidden" onClick={props.closeNav}>x</p>
                        </div>
                    </section>

                    <section className="mt-6 flex flex-col space-y-6">
                        {navLinks.map((each) => (
                            <NavLink to={each.linkTo} key={each.id} className="" onClick={props.closeNav}>
                                <div className="flex items-center space-x-6 cursor-pointer">
                                    <span className="text-md">{each.icon}</span>
                                    <h1 className="text-md">{each.value}</h1>
                                </div>
                            </NavLink>
                        ))}
                    </section>
                </div>

                <section className="border-t border-gray-300 flex flex-col space-y-6 py-4 px-8">
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