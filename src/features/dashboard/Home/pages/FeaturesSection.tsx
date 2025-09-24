import React, { type ReactElement } from 'react'
import { IoBookOutline } from "react-icons/io5";
import { CiChat1 } from "react-icons/ci";
import { GrNotes } from "react-icons/gr";
import CardUi from '../component/CardUi';

type FeaturesData = {
    id: number;
    icon: ReactElement;
    iconBgColor: string;
    header: string;
    paragraph: string;
}

const featuresData: FeaturesData[] = [
    {
        id: 1,
        icon: <CiChat1 />,
        iconBgColor: "bg-[#882FFB]",
        header: "Ask AI",
        paragraph: "Get instant answers to your question"
    },
    {
        id: 2,
        icon: <GrNotes />,
        iconBgColor: "bg-[#BD29BA]",
        header: "Summarized Notes",
        paragraph: "Create AI-Powered summaries"
    },
    {
        id: 3,
        icon: <IoBookOutline />,
        iconBgColor: "bg-[#00977C]",
        header: "Generate Study Plan",
        paragraph: "Get instant answers to your "
    },
]

const FeaturesSection = () => {
    return (
        <main>
            <h1 className='font-semibold text-2xl mt-12 mb-4'>AI Assistant</h1>
            <section className='grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-3'>
                {featuresData.map((eachFeature) => (
                    <CardUi className="hover:shadow-xl hover:scale-100 hover:transition-all hover:duration-200 hover:ease-in-out" key={eachFeature.id}>
                        <div className='flex items-center space-x-4'>
                            <span className={`${eachFeature.iconBgColor} p-3 text-xl text-white rounded-full`}>
                                {eachFeature.icon}
                            </span>
                            <span className='flex flex-col space-y-1'>
                                <h3 className='text-lg font-semibold'>{eachFeature.header}</h3>
                                <p className='font-light text-gray-600 text-sm'>{eachFeature.paragraph}</p>
                            </span>
                        </div>
                    </CardUi>
                ))}
            </section>
        </main>
    )
}

export default FeaturesSection