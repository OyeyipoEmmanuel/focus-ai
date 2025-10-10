import React, { type ReactElement } from 'react'
import type { addTaskValidationSchemaType } from '../../../../schemas/addTaskValidationSchema';
import { MdOutlineEmail } from 'react-icons/md';
import InputUi from '../../../auth/components/InputUi';
import SelectField from '../../../../components/SelectField/SelectField';
import DatePickerComponent from '../../../../components/DatePicker/DatePickerComponent';


type InputFieldType = {
    id: number;
    name: keyof addTaskValidationSchemaType;
    icon: ReactElement;
    type: string;
    placeholder: string;
    labelName: string
}

const inputFields: InputFieldType[] = [
    {
        id: 1,
        name: "taskName",
        icon: <MdOutlineEmail />,
        type: "text",
        placeholder: "StandUp Meeting",
        labelName: "Task"
    },
    {
        id: 2,
        name: "desc",
        icon: <MdOutlineEmail />,
        type: "text",
        placeholder: "Taking the order of the meeting.",
        labelName: "Description"
    },
]

const optionsForPriority = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
]

const optionsForTaskType = [
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'learn', label: 'Learn' },
    { value: 'other', label: 'Others'},
]

const AddTask = (props: any) => {
    // Desc should not be more that 30 words - show a counting word system
    // task type = work, personal, learning, others.
    // Pass the date as string to backend

    // UntitledUI for the calender



    const dummyDataSchema = [
        {
            id: 1,
            taskName: "Standup Meeting",
            desc: "",
            taskType: "Work",
            dateTaskWasAdded: "timestamp from firebase",
            dueDate: "2025-02-23",
            priority: 'high'
        }
    ]
    return (
        <form className='mt-4 flex flex-col space-y-4'>
            {inputFields.map((each) => (
                <div key={each.id}>
                    <InputUi
                        icon={each.icon}
                        inputType={each.type}
                        placeholder={each.placeholder}
                        labelName={each.labelName}
                    />
                </div>
            ))}

            <div className='flex items-center justify-between'>
                <span className='flex flex-col space-y-1'>
                    <label>Type</label>
                    <SelectField options={optionsForTaskType} defaultValue="personal" />
                </span>

                <span className='flex flex-col space-y-1'>
                    <label>Priority</label>
                    <SelectField options={optionsForPriority} defaultValue="medium" />
                </span>
            </div>

            <div className='flex flex-col space-y-1'>
                <label>Due Date</label>
                <DatePickerComponent/>
            </div>
            
            <div className='flex items-center space-x-3 justify-end mt-5'>
                <button type="button" className='px-7 py-2 border rounded-md border-gray-300 shadow-lg hover:opacity-80 cursor-pointer hover:transition-all duration-200' onClick={()=>props.afterSubmit(false)}>Cancel</button>
                <button type='submit' className='bg-primaryblue-300 text-white px-7 py-2 rounded-md shadow-lg hover:opacity-80 cursor-pointer hover:transition-all duration-200'>Add Task</button>
            </div>
        </form>
    )
}

export default AddTask