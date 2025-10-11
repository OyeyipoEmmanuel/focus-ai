import z from "zod";
// id: 1,
//             taskName: "Standup Meeting",
//             desc: "",
//             taskType: "Work",
//             dateTaskWasAdded: "timestamp from firebase",
//             dueDate: "2025-02-23",
//             priority: 'high'
export const addTaskValidationSchema = z.object({
    taskName: z.string({message: "Task is required!"}).min(3, {message: "Minimum of 3 characters is required!"}),
    desc: z.string().max(50, {message: "Max limit exceeded"}).optional(),
    taskType: z.enum(["work", "personal", "learning", "others"], {
        message: "Please select a valid field"
    }).optional(),
    dueDate: z.string().optional(),
    priority: z.enum(["high", "low", "medium"], {
        message: "Please select a valid field"
    }).optional(),
    completed: z.boolean().optional()
})

export type addTaskValidationSchemaType = z.infer<typeof addTaskValidationSchema>