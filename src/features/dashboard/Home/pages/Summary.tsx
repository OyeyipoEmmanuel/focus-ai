import { type ReactElement } from 'react'
import CardUi from '../component/CardUi'
import { IoMdCheckboxOutline } from "react-icons/io";
import { GrNotes } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { IoBulbOutline } from "react-icons/io5";


type SummaryData = {
    id: number;
    header: string;
    iconBgColor: string;
    icon: ReactElement;
    value: number;
    smallText: string;
}

const summaryData: SummaryData[] = [
    {
        id: 1,
        header: "Today's Tasks",
        icon: <IoMdCheckboxOutline />,
        iconBgColor: "bg-[#1553F1]",
        value: 8,
        smallText: "3 completed"
    },
    {
        id: 2,
        header: "Notes Count",
        icon: <GrNotes />,
        iconBgColor: "bg-[#8C03E9]",
        value: 24,
        smallText: "5 new this week"
    },
    {
        id: 3,
        header: "Upcoming Events",
        icon: <SlCalender />,
        iconBgColor: "bg-[#007E57]",
        value: 5,
        smallText: "Next in 2 hours"
    },
    {
        id: 4,
        header: "AI Suggestions",
        icon: <IoBulbOutline />,
        iconBgColor: "bg-[#DA6A00]",
        value: 8,
        smallText: "3 completed"
    },
]

const Summary = () => {
    return (

        <section className='grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4'>
            {summaryData.map((eachData) => (
                
                <CardUi key={eachData.id}>
                    <div className='flex flex-col justify-between min-h-40'>

                        <div className='flex items-center justify-between'>
                            <h1 className='text-gray-800 text-lg w-[70%]'>{eachData.header}</h1>
                            <span className={`${eachData.iconBgColor} roiunded-full text-white p-3 rounded-full text-sm`}>
                                {eachData.icon}
                            </span>
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <h3 className='text-2xl font-semibold'>{eachData.value}</h3>
                            <p className='font-light text-sm text-gray-500'>{eachData.smallText}</p>
                        </div>
                    </div>
                </CardUi>
            ))}
        </section>


    )
}

export default Summary