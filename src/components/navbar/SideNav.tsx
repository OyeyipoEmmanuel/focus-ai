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

type NavLinks = {
    id: number;
    icon: ReactElement;
    value: string;
}


const navLinks: NavLinks[] = [
    {
        id: 1,
        icon: <LuLayoutDashboard />,
        value: "Dashboard"
    },
    {
        id: 2,
        icon: <CiChat1 />,
        value: "Chat"
    },
    {
        id: 3,
        icon: <IoMdCheckboxOutline />,
        value: "Tasks"
    },
    {
        id: 4,
        icon: <SlCalender />,
        value: "Schedule"
    },
    {
        id: 5,
        icon: <IoBookOutline />,
        value: "Study"
    },
    {
        id: 6,
        icon: <CiSettings />,
        value: "Settings"
    },
]

const SideNav = () => {
    return (
        <nav className="bg-white min-h-screen max-w-[calc(100%-83%)] py-3 flex flex-col justify-between">

            <div className="px-8">
                <section className="flex items-center py-2 space-x-4">
                    <img src={logo} alt="focus-ai logo" className="w-8" />
                    <h1 className="text-xl font-semibold">Assistant</h1>
                </section>

                <section className="mt-6 flex flex-col space-y-8">
                    {navLinks.map((each) => (
                        <div className="flex items-center space-x-6 cursor-pointer" key={each.id}>
                            <span className="text-xl">{each.icon}</span>
                            <h1 className="text-lg">{each.value}</h1>
                        </div>
                    ))}
                </section>
            </div>

            <section className="border-t border-gray-300 flex flex-col space-y-6 py-4 px-8">
                <div className="flex space-x-6 items-center cursor-pointer">
                    <RxPerson className="text-xl"/>
                    <span>
                        <h1 className="text-lg">{useGetUsername()}</h1>
                        <p className="text-[11px] text-gray-400">{useGetEmail()}</p>
                    </span>
                </div>

                <div className="flex items-center space-x-4 cursor-pointer">
                    <IoIosLogOut className="text-xl"/>
                    <h1 className="text-lg">Logout</h1>
                </div>

            </section>
        </nav>
    )
}

export default SideNav