import { CiFilter } from "react-icons/ci";
import TaskTab from "../component/TaskTab";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../../../backend/firebase-config/config";
import ModalComponent from "../../../../components/modal/ModalComponent";
import { useState } from "react";
import AddTask from "./AddTask";


const Task = () => {
  const [openAddTaskModal, setOpenAddTaskModel] = useState<boolean>(false)

  // const getData = async () => {
  //   const query = await getDocs(collection(db, "users"))

  //   query.forEach((doc) => {
  //     console.log(doc.id, "=>", doc.data())
  //   })
  // }

  // getData()

  // console.log(auth.currentUser)

  // Function to add task



  return (
    <main>
      <section className="flex flex-row w-full justify-end space-x-4 items-center">
        <button className="flex space-x-2 items-center border border-gray-400 rounded-full px-4 py-1 text-black hover:border-none hover:bg-gray-200 transition-all duration-200 cursor-pointer">
          <CiFilter />
          <p>Filter</p>
        </button>

        <button className="bg-primaryblue-300 px-3 py-1 rounded-full flex flex-row space-x-1 text-white items-center hover:border-gray-400 hover:bg-gray-200 transition-all duration-200 hover:text-black cursor-pointer" onClick={() => setOpenAddTaskModel(true)}>
          <p className="text-xl text-gray-300">+</p>
          <p>Add Task</p>
        </button>
        {/* <ModalComponent /> */}
      </section>

      {/* MODAL TO ADD TASK */}
      <ModalComponent title="Add a Task" open={openAddTaskModal} onOk={() => setOpenAddTaskModel(false)} onCancel={() => setOpenAddTaskModel(false)}>
        <AddTask afterSubmit={setOpenAddTaskModel}/>
      </ModalComponent>


      <TaskTab />

      {/* LIST OF TASKS */}
      <section></section>
    </main>
  )
}

export default Task