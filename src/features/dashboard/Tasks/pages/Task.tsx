import { CiFilter } from "react-icons/ci";
import TaskTab from "../component/TaskTab";
import ModalComponent from "../../../../components/modal/ModalComponent";
import { useState } from "react";
import AddTask from "./AddTask";
import MapTask from "./MapTask";
import CtaButtons from "../../../../components/buttons/CtaButtons";
import { CiSearch } from "react-icons/ci";
import { useSearchForTask } from "../../../../api/search/searchForTask";




const Task = () => {
  const [openAddTaskModal, setOpenAddTaskModel] = useState<boolean>(false)
  const [searchedTask, setSearchedTask] = useState<string>("")

  // Debounce
  // const res = 


  const res = useSearchForTask({ searchItem: searchedTask, delay: 500 })

  // console.log(result)



  // useEffect(() => {
  //   // console.log(res)
  //   setSearchedResult(res)
  // }, [res])


  // console.log(searchedResult)
  // Function to add task



  return (
    <main>
      <section className="flex flex-col-reverse w-full space-y-3 items-center md:flex-row md:justify-self-end md:space-y-0 md:space-x-2  md:w-fit">
        {/* Search bar */}
        <div className="w-full flex space-x-1 items-center bg-white px-3 py-2 rounded-full shadow-xs" >
          <CiSearch />
          <input type="text" className="outline-none placeholder:text-black/30 placeholder:text-[13px] font-light" placeholder="Search for a task..." onChange={(e) => setSearchedTask(e.target.value)} value={searchedTask} />
        </div>

        <div className="flex flex-row justify-end space-x-2 w-full mb-3 md:mb-0">
          <button className="flex space-x-2 items-center border border-gray-400 rounded-full px-4 py-1 text-black hover:border-none hover:bg-gray-200 transition-all duration-200 cursor-pointer">
            <CiFilter />
            <p>Filter</p>
          </button>

          <CtaButtons onClick={() => setOpenAddTaskModel(true)}>
            <p className="text-xl text-gray-300">+</p>
            <p>Add Task</p>
          </CtaButtons>
        </div>

      </section>

      {/* MODAL TO ADD TASK */}
      <ModalComponent title="Add a Task" open={openAddTaskModal} onOk={() => setOpenAddTaskModel(false)} onCancel={() => setOpenAddTaskModel(false)}>
        <AddTask closeModalAfterSubmit={setOpenAddTaskModel} operationType="add" />
      </ModalComponent>


      <TaskTab />

      {/* LIST OF TASKS */}
      <section className="mt-8">
        <MapTask searchedTaskResult={res} searchedTask={searchedTask}/>
      </section>
    </main>
  )
}

export default Task