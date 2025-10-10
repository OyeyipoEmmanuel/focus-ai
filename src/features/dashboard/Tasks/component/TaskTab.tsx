import { useState } from "react"



const TaskTab = () => {
  const tabs = [
    {
      id: 1,
      tabName: "Today"
    },
    {
      id: 2,
      tabName: "Upcoming"
    },
    {
      id: 3,
      tabName: "Completed"
    },
  ]

  const [activeTab, setActiveTab] = useState<string>("Today")


  return (
    <section className="w-full flex flex-row text-black justify-between items-center space-x-3 rounded-full p-1 mt-8 bg-[#F1F5F9] text-[14px] md:max-w-[40%]">
      {tabs.map((eachTab) =>(
        <span className={`${activeTab === eachTab.tabName && "bg-white"} text-center rounded-full w-full cursor-pointer py-1 transition-all duration-200`} key={eachTab.id} onClick={()=>setActiveTab(eachTab.tabName)}>{eachTab.tabName}</span>
      ))}
    </section>
  )
}

export default TaskTab