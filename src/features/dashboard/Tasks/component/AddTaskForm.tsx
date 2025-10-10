import React from 'react'

const AddTaskForm = (props:any) => {
  return (
    <div onClick={()=>props.afterSubmit()}>AddTaskForm</div>
  )
}

export default AddTaskForm