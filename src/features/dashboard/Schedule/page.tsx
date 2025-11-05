import { useState, type ReactElement } from "react"
import CtaButtons from "../../../components/buttons/CtaButtons"
import CalenderSection from "./pages/CalenderSection"
import UpcomingEvents from "./pages/UpcomingEvents"
import ModalComponent from "../../../components/modal/ModalComponent"
import AddUpcomingEvents from "./pages/AddUpcomingEvents"
import MapEvents from "./pages/MapEvents"

const Schedule = () => {
  const [openAddEventModal, setOpenEventModal] = useState<boolean>(false)

  return (
    <main>
      <div className="w-full flex justify-end">
        <CtaButtons onClick={()=>setOpenEventModal(true)}>
          <p className="text-xl text-gray-300">+</p>
          <p>Add Events</p>
        </CtaButtons>
      </div>

      {/* Modal to open add event */}
      <ModalComponent title="Add Event" open={openAddEventModal} onOk={()=>setOpenEventModal(false)} onCancel={()=>setOpenEventModal(false)} >
        <AddUpcomingEvents closeModalOnSubmit={()=>setOpenEventModal(false)}/>
      </ModalComponent>

      <div className="mt-6 ">
        <CalenderSection />
      </div>

      <div className="mt-12">
        <UpcomingEvents />
      </div>

      <div className="mt-12">
        <MapEvents/>
      </div>
    </main>
  )
}

export default Schedule