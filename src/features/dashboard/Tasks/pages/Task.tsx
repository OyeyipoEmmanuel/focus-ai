import { CiFilter } from "react-icons/ci";
import TaskTab from "../component/TaskTab";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../../../backend/firebase-config/config";
import ModalComponent from "../../../../components/modal/ModalComponent";
import { useState } from "react";
import AddTask from "./AddTask";
import MapTask from "./MapTask";
import CtaButtons from "../../../../components/buttons/CtaButtons";


const Task = () => {
  const [openAddTaskModal, setOpenAddTaskModel] = useState<boolean>(false)

  const getData = async () => {
    if (!auth.currentUser?.uid) throw new Error("ERR")

    // const query = await getDoc(doc(db, "users", auth.currentUser?.uid))
    // console.log(query);

    // To get one data
    // const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid,  "tasks", "3t7wBUvRoRolKCtFpDye"), (doc)=>{
    //   console.log(doc.data())
    // })

    // To get multiple doc
    const unsubscribe = onSnapshot(collection(db, "users", auth.currentUser.uid, "tasks"), (snapshot) => {
      const tasks: any = []

      snapshot.forEach((doc) => {
        tasks.push(doc.data())
      })
      console.log(tasks)
    })

    return unsubscribe

    // return unsub

    //   query.forEach((doc) => {
    //     console.log(doc.id, "=>", doc.data())
    //   })
    // }
  }
  getData()

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