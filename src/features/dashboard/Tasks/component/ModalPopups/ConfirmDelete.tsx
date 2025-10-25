import { MdOutlineDangerous } from "react-icons/md";
import ModalComponent from '../../../../../components/modal/ModalComponent';
import { Button } from 'antd';
import { deleteTask } from "../../../../../api/dashboardAPI/TaskApi/actionsForTasksDb";


const ConfirmDelete = (props:any) => {
    // const [toggleModal, setToggleModal] = useState<boolean>(false)
    

    const handleDeleteTask = async(id: string | undefined) => {
        console.log(id)
        try {
            await deleteTask(id || "")
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <ModalComponent open={props.openModal} onCancel={props.closeModal}>
            <section className='flex flex-col items-center mx-auto space-y-4'>
                {/* ICON */}
                <div>
                    <MdOutlineDangerous className='text-red-500 text-7xl'/>
                </div>

                {/* Que? */}
                <div>
                    <p className='text-4xl text-black/70'>Are you Sure?</p>
                </div>

                {/* txt*/}
                <div>
                    <p className='text-black/40 text-[15px] text-center'>Do you really want to delete this task? This process cannot be undone</p>
                </div>

                {/* btns */}
                <div className='flex flex-row items-center space-x-4'>
                    <button className='border border-black/40 px-4 py-1 rounded-md cursor-pointer' onClick={()=>props.setOpenModal(false)}>Cancel</button>

                    <Button danger style={{background:"red", color: "white", padding: "4px 16px 4px 16px"}} onClick={()=>handleDeleteTask(props.taskId)}>Delete</Button>
                </div>

            </section>
        </ModalComponent>
    );
}



export default ConfirmDelete;