import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { taskTabActions } from "../../../../store/activeTaskTab"


const TaskTab = () => {

  // const state = useSelector((state: any) => state.taskTabState.tab)

  


  const tabs = [
    {
      id: 1,
      tabName: "All"
    },
    {
      id: 2,
      tabName: "Today"
    },
    {
      id: 3,
      tabName: "Upcoming"
    },
    {
      id: 4,
      tabName: "Completed"
    },
  ]

  const [activeTab, setActiveTab] = useState<string>("All")
  const dispatch = useDispatch()

  const handleChangeTab = (tab: string) => {
    setActiveTab(tab)

  }

  useEffect(() => {
    dispatch(taskTabActions.updateTab(activeTab))
  }, [activeTab])

  // ()=>setActiveTab(eachTab.tabName)

  // console.log(state)

  return (
    <section className="w-full flex flex-row text-black justify-between items-center space-x-3 rounded-full p-1 mt-8 bg-[#F1F5F9] text-[14px] md:max-w-[40%]">
      {tabs.map((eachTab) => (
        <span className={`${activeTab === eachTab.tabName && "bg-white"} text-center rounded-full w-full cursor-pointer py-1 transition-all duration-200`} key={eachTab.id} onClick={() => handleChangeTab(eachTab.tabName)}>{eachTab.tabName}</span>
      ))}
    </section>
  )
}

export default TaskTab