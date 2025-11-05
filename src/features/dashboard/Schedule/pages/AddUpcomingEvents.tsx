import { useState, type ReactElement } from "react";
import { addEventValidationSchema, type addEventValidationSchemaType } from "../../../../schemas/events/addEventValidationSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputUi from "../../../auth/components/InputUi";
import SelectField from "../../../../components/SelectField/SelectField";
import DatePickerComponent from "../../../../components/DatePicker/DatePickerComponent";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import useNotification from "antd/es/notification/useNotification";
import { addEventsToDb } from "../../../../api/dashboardAPI/EventsApi/addEventsToDb";
import { MdEvent, MdDescription, MdLocationOn, MdPeople } from "react-icons/md"


type InputFieldType = {
    id: number;
    name: keyof addEventValidationSchemaType;
    icon: ReactElement;
    type: string;
    placeholder: string;
    labelName: string
    required: boolean
}

const inputFields: InputFieldType[] = [
    {
        id: 1,
        name: "eventName",
        icon: <MdEvent />,
        type: "text",
        placeholder: "Daniella's Wedding",
        labelName: "Event",
        required: true
    },
    {
        id: 2,
        name: "desc",
        icon: <MdDescription />,
        type: "text",
        placeholder: "My little sister is getting married",
        labelName: "Description",
        required: false
    },
    {
        id: 3,
        name: "location",
        icon: <MdLocationOn />,
        type: "text",
        placeholder: "Disney Land",
        labelName: "Location",
        required: false
    },
]

const otherInputFields = [
    {
        id: 4,
        name: "noOfAttendees",
        icon: <MdPeople />,
        type: "number",
        placeholder: "50",
        labelName: "No. Of Attendees",
        required: false
    }
]
const optionsForEventType = [
    { value: 'meeting', label: "Meeting" },
    { value: 'fun', label: "Fun" },
    { value: 'family', label: "Family" },
    { value: 'others', label: "Others" },
]

const AddUpcomingEvents = ({ closeModalOnSubmit }: any) => {

    const [message, contextHolder] = useNotification()
    const [loadingDataToDb, setLoadingDataToDb] = useState<boolean>(false)

    const { handleSubmit, control, formState: { errors }, reset } = useForm<addEventValidationSchemaType>({
        resolver: zodResolver(addEventValidationSchema),
        defaultValues: {
            eventDate: dayjs().format("YYYY-MM-DD"),
            desc: "",
            location: "",
            endTime: "",
            startTime: "",
            noOfAttendees: "",
            eventType: "fun",

        }

    })

    // const {data, isLoading, error} = useQuery({
    //     queryKey: ['add_events_to_db'],
    //     queryFn: 
    // })

    const handleAddEvent = async (data: addEventValidationSchemaType) => {
        console.log(data)
        setLoadingDataToDb(true)
        try {
            const res = await addEventsToDb(data)

            message.success({
                message: res
            })
            closeModalOnSubmit()
            reset()
        } catch (error) {
            message.error({
                message: "An Error Occured!"
            })
        } finally {
            setLoadingDataToDb(false)
        }

    }

    return (
        <form className='mt-4 flex flex-col space-y-3 overflow-y-auto' onSubmit={handleSubmit(handleAddEvent)}>
            {contextHolder}
            <div className="flex flex-col space-y-3 overflow-y-auto max-h-[60vh]">
                {inputFields.map((each) => (
                    <div key={each.id}>
                        <Controller
                            name={each.name}
                            control={control}
                            render={({ field }) => (
                                <InputUi
                                    {...field}
                                    icon={each.icon}
                                    inputType={each.type}
                                    placeholder={each.placeholder}
                                    labelName={each.labelName}
                                    className="w-[100%]"
                                />
                            )}
                        />
                        {errors[each.name] && (
                            <p className='text-sm text-red-500'>{errors[each.name]?.message}</p>
                        )}
                    </div>
                ))}

                {/* First row */}
                <div className="grid grid-cols-2 gap-4 items-center">
                    <div className="flex flex-col">
                        <Controller
                            name="noOfAttendees"
                            control={control}
                            render={({ field }) => (
                                <InputUi
                                    {...field}

                                    icon={otherInputFields[0].icon}
                                    inputType={otherInputFields[0].type}
                                    placeholder={otherInputFields[0].placeholder}
                                    labelName={otherInputFields[0].labelName}
                                    className="w-[100%]"
                                />
                            )}
                        />
                        {errors["noOfAttendees"] && (
                            <p className='text-sm text-red-500'>Invalid</p>
                        )}
                    </div>

                    <Controller
                        name="eventType"
                        control={control}
                        render={({ field }) => (
                            <span className="flex flex-col space-y-3">
                                <label>Type</label>
                                <SelectField {...field} options={optionsForEventType} defaultValue="fun" />
                            </span>
                        )}
                    />
                    {errors["eventType"] && (
                        <p className='text-sm text-red-500'>{errors["eventType"]?.message}</p>
                    )}
                </div>

                {/* second row */}
                <div className="grid grid-cols-1">
                    <Controller
                        name="eventDate"
                        control={control}
                        render={({ field }) => (
                            <div className='flex flex-col space-y-1'>
                                <label>Event Date</label>
                                <DatePickerComponent {...field}
                                />
                            </div>
                        )}
                    />
                    {errors["eventDate"] && (
                        <p className='text-sm text-red-500'>{errors["eventDate"]?.message}</p>
                    )}
                </div>

                {/* Third row */}
                <div className="grid grid-cols-2 gap-4">
                    <Controller
                        name="startTime"
                        control={control}
                        render={({ field }) => (
                            <div className='flex flex-col space-y-1'>
                                <label>Start Time</label>
                                <TimePicker
                                    format="HH:mm"
                                    {...field}
                                    value={field.value ? dayjs(field.value, "HH:mm") : null}
                                    onChange={(time) => field.onChange(time ? time.format("HH:mm") : "")}
                                />
                            </div>
                        )}
                    />
                    {errors["startTime"] && (
                        <p className='text-sm text-red-500'>{errors["startTime"]?.message}</p>
                    )}

                    <Controller
                        name="endTime"
                        control={control}
                        render={({ field }) => (
                            <div className='flex flex-col space-y-1'>
                                <label>End Time</label>
                                <TimePicker
                                    format="HH:mm"
                                    {...field}
                                    value={field.value ? dayjs(field.value, "HH:mm") : null}
                                    onChange={(time) => field.onChange(time ? time.format("HH:mm") : "")}
                                />
                            </div>
                        )}
                    />
                    {errors["endTime"] && (
                        <p className='text-sm text-red-500'>{errors["endTime"]?.message}</p>
                    )}
                </div>
            </div>

            {/* Buttons */}
            <div className='flex items-center space-x-3 justify-end mt-5'>
                <button type="button" className='px-7 py-2 border rounded-md border-gray-300 shadow-lg hover:opacity-80 cursor-pointer hover:transition-all duration-200'>Cancel</button>

                {/* Add btn */}
                <button type='submit' className={`bg-primaryblue-300 text-white px-7 py-2 rounded-md shadow-lg hover:opacity-80 cursor-pointer hover:transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed`} disabled={loadingDataToDb}>{loadingDataToDb ? "Adding.." : "Add Event"}</button>

            </div>
        </form>
    )
}

export default AddUpcomingEvents