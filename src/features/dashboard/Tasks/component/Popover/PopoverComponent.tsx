import React, { useState } from 'react';
import { Popover, Space } from 'antd';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import ConfirmDelete from '../ModalPopups/ConfirmDelete';
import AddTask from '../../pages/AddTask';
import ModalComponent from '../../../../../components/modal/ModalComponent';


export type PopoverProps = {
  taskId: string | undefined;
}

const PopoverComponent: React.FC<PopoverProps> = ({ taskId }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [popoverOpen, setPopoverOpen] = useState(false);

  console.log(openEditModal)
  const content = (
    <div className='border-t border-gray-200 pt-4 space-y-2'>
      {/* Edit btn */}
      <span
        className={`flex flex-row items-center cursor-pointer hover:opacity-70`} onClick={() => {
          setOpenEditModal(true)
          setPopoverOpen(false)
        }}>
        <CiEdit className='text-primaryblue-300' />
        <p className='md:text-[15px] text-primaryblue-300'>Edit</p>
      </span>

      {/* Delete btn */}
      <span className='flex flex-row items-center cursor-pointer hover:opacity-70' onClick={() => {
        setOpenDeleteModal(true)
        setPopoverOpen(false)
      }}>
        <MdDelete className='text-red-500' />
        <p className='md:text-[15px] text-red-500'>Delete</p>
      </span>
    </div>
  );


  return (
    <main className={`${(openEditModal) && ""}`}>
      <Space wrap>
        <Popover content={content} title="Actions" open={popoverOpen} trigger="click">
          <div className='font-extrabold cursor-pointer px-2 text-center hover:bg-gray-100 rounded-full' onClick={() => setPopoverOpen(prev => !prev)}>...</div>
        </Popover>
      </Space>

      {/* Edit modal */}
      {
        openEditModal &&
        <ModalComponent
          title="Edit Task"
          open={openEditModal}
          onOk={() => setOpenEditModal(false)}
          onCancel={() => setOpenEditModal(false)}
        >
          <AddTask
            closeModalAfterSubmit={setOpenEditModal}
            operationType={"edit"}
            taskId={taskId}
          />
        </ModalComponent>
      }

      {/* Delete task modal */}
      {
        openDeleteModal &&
        <ConfirmDelete
          taskId={taskId}
          openModal={openDeleteModal}
          setOpenModal={setOpenDeleteModal}
          closeModal={() => setOpenDeleteModal(false)}
        />
      }

    </main>
  );
}



export default PopoverComponent;