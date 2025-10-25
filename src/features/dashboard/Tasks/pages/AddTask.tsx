import React, { useEffect, useState, type ReactElement } from 'react'
import { addTaskValidationSchema, type addTaskValidationSchemaType } from '../../../../schemas/addTaskValidationSchema';
import { MdOutlineEmail } from 'react-icons/md';

import SelectField from '../../../../components/SelectField/SelectField';
import DatePickerComponent from '../../../../components/DatePicker/DatePickerComponent';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputUi from '../../../auth/components/InputUi';
import useNotification from 'antd/es/notification/useNotification';
import { addTaskToDb } from '../../../../api/dashboardAPI/TaskApi/addTaskToDb';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { getTaskById } from '../../../../api/dashboardAPI/TaskApi/getTasks';
import { useQuery } from '@tanstack/react-query';
import LoadingComponent from '../../../../components/loadingComponent/LoadingComponent';
import { editTask } from '../../../../api/dashboardAPI/TaskApi/actionsForTasksDb';

// const dummyDataSchema = [
//     {
//         id: 1,
//         taskName: "Standup Meeting",
//         desc: "",
//         taskType: "Work",
//         dateTaskWasAdded: "timestamp from firebase",
//         dueDate: "2025-02-23",
//         priority: 'high'
//     }
// ]
// Desc should not be more that 30 words - show a counting word system
// task type = work, personal, learning, others.
// Pass the date as string to backend

// UntitledUI for the calender
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
    { value: 'learning', label: 'Learn' },
    { value: 'others', label: 'Others' },
]
type AddTaskProps = {
    closeModalAfterSubmit: (check: boolean) => void
    operationType?: string
    taskId?: string
}


const AddTask: React.FC<AddTaskProps> = ({ closeModalAfterSubmit, operationType, taskId }) => {
    const [loading, setLoading] = useState<boolean>(false)

    const [message, contextHolder] = useNotification()

    const taskTabState = useSelector((state: any) => state.taskTabState.tab)


    const { handleSubmit, control, formState: { errors }, watch, reset } = useForm<addTaskValidationSchemaType>({
        resolver: zodResolver(addTaskValidationSchema),
        defaultValues: {
            taskType: "personal",
            priority: "medium",
            dueDate: dayjs().format("YYYY-MM-DD"),
            desc: "",
            taskName: "",
        }
    })

    // Get Task Contents to edit
    const { data: prevTask, isLoading: loadPrevTask, error:prevTaskError } = useQuery({
        queryKey: ["task", taskId],
        queryFn: () => getTaskById(taskId || ""),
        enabled: operationType === "edit" && !!taskId
    })

    useEffect(() => {

        if (typeof prevTask === "string") {
            message.error({
                message: prevTask
            })
            return;
        } else {
            reset(prevTask)
        }
    }, [prevTask, reset,])

    console.log(taskTabState)
    const watchDesc = watch("desc")?.trim()

    const submitAddTask = async (data: addTaskValidationSchemaType) => {
        console.log({ ...data, completed: false })
        setLoading(true)

        try {
            if (operationType === "edit") {
                await editTask(taskId || "", data)

                message.success({
                    message: "Edited"
                })

                //Close modal
                closeModalAfterSubmit(false)

                // reset form fields
                reset()

                return;
            }

            if (operationType === "add") {
                const res = await addTaskToDb({ ...data, completed: false, dateAdded: dayjs().toString() })

                console.log(res)

                message.success({
                    message: "Added"
                })

                //Close modal
                closeModalAfterSubmit(false)

                // reset form fields
                reset()
            }


        } catch (e) {
            console.log(e)
            message.error({
                message: "Error adding task. Please try again later!"
            })
        } finally {
            setLoading(false)
        }
    }


    return (
        <form className='mt-4 flex flex-col space-y-3' onSubmit={handleSubmit(submitAddTask, (errors) => { console.log(errors) })}>
            {contextHolder}
            {prevTaskError && <p>Error</p>}
            {loadPrevTask && <LoadingComponent />}
            {inputFields.map((each) => (
                <div key={each.id}>
                    <Controller
                        name={each.name}
                        control={control}
                        render={({ field }) => (
                            <div className=''>
                                <InputUi
                                    {...field}
                                    icon={each.icon}
                                    inputType={each.type}
                                    placeholder={each.placeholder}
                                    labelName={each.labelName}
                                    className="w-[100%]"
                                />
                                {each.name === "desc" && (
                                    <span className='justify-end flex text-xs'>
                                        <h1
                                            className={`font-semibold text-green-500 
                                            ${watchDesc && watchDesc.length >= 40 &&
                                                    watchDesc && watchDesc.length <= 50 ? "text-yellow-500" :
                                                    watchDesc && watchDesc.length > 50 ? "text-red-500" :
                                                        "text-green-500"}`}>
                                            {watchDesc?.length || 0}
                                        </h1>
                                        <p>/50</p>
                                    </span>
                                )}
                            </div>
                        )}
                    />
                    {errors[each.name] && (
                        <p className='text-sm text-red-500'>{errors[each.name]?.message}</p>
                    )}
                </div>
            ))}

            <div className='flex items-center justify-between'>
                <Controller
                    name="taskType"
                    control={control}
                    render={({ field }) => (
                        <span className='flex flex-col space-y-1'>
                            <label>Type</label>
                            <SelectField {...field} options={optionsForTaskType} defaultValue="personal" />
                        </span>
                    )}
                />
                {errors["taskType"] && (
                    <p className='text-sm text-red-500'>{errors["taskType"]?.message}</p>
                )}

                <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                        <span className='flex flex-col space-y-1'>
                            <label>Priority</label>
                            <SelectField {...field} options={optionsForPriority} defaultValue="medium" />
                        </span>
                    )}
                />
                {errors["priority"] && (
                    <p className='text-sm text-red-500'>{errors["priority"]?.message}</p>
                )}

            </div>

            <Controller
                name="dueDate"
                control={control}
                render={({ field }) => (
                    <div className='flex flex-col space-y-1'>
                        <label>Due Date</label>
                        <DatePickerComponent {...field} />
                    </div>
                )}
            />



            <div className='flex items-center space-x-3 justify-end mt-5'>
                <button type="button" className='px-7 py-2 border rounded-md border-gray-300 shadow-lg hover:opacity-80 cursor-pointer hover:transition-all duration-200' onClick={() => closeModalAfterSubmit(false)}>Cancel</button>

                {/* Add btn */}
                <button type='submit' className={`bg-primaryblue-300 text-white px-7 py-2 rounded-md shadow-lg hover:opacity-80 cursor-pointer hover:transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed ${operationType === "edit" && "hidden"}`} disabled={loading}>{loading ? "Adding..." : "Add task"}</button>

                {/* Edit btn */}
                <button type='submit' className={`bg-primaryblue-300 text-white px-7 py-2 rounded-md shadow-lg hover:opacity-80 cursor-pointer hover:transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed ${operationType === "add" && "hidden"}`} disabled={loading}>{loading ? "Editing..." : "Edit task"}</button>
            </div>
        </form>
    )
}

export default AddTask