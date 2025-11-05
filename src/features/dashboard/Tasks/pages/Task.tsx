import { CiFilter } from "react-icons/ci";
import TaskTab from "../component/TaskTab";
import { auth } from "../../../../backend/firebase-config/config";
import ModalComponent from "../../../../components/modal/ModalComponent";
import { useState } from "react";
import AddTask from "./AddTask";
import MapTask from "./MapTask";
import CtaButtons from "../../../../components/buttons/CtaButtons";


const Task = () => {
  const [openAddTaskModal, setOpenAddTaskModel] = useState<boolean>(false)

  console.log(auth.currentUser?.uid)

  // Function to add task



  return (
    <main>
      <section className="flex flex-row w-full justify-end space-x-4 items-center">
        <button className="flex space-x-2 items-center border border-gray-400 rounded-full px-4 py-1 text-black hover:border-none hover:bg-gray-200 transition-all duration-200 cursor-pointer">
          <CiFilter />
          <p>Filter</p>
        </button>

        <CtaButtons onClick={() => setOpenAddTaskModel(true)}>
          <p className="text-xl text-gray-300">+</p>
          <p>Add Task</p>
        </CtaButtons>
        {/* <ModalComponent /> */}
      </section>

      {/* MODAL TO ADD TASK */}
      <ModalComponent title="Add a Task" open={openAddTaskModal} onOk={() => setOpenAddTaskModel(false)} onCancel={() => setOpenAddTaskModel(false)}>
        <AddTask closeModalAfterSubmit={setOpenAddTaskModel} operationType="add"/>
      </ModalComponent>


      <TaskTab />

      {/* LIST OF TASKS */}
      <section className="mt-8">
        <MapTask/>
      </section>
    </main>
  )
}

export default Task