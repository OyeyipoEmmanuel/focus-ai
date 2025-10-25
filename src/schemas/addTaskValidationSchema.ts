import z from "zod";
// id: 1,
//             taskName: "Standup Meeting",
//             desc: "",
//             taskType: "Work",
//             dateTaskWasAdded: "timestamp from firebase",
//             dueDate: "2025-02-23",
//             priority: 'high'
export const addTaskValidationSchema = z.object({
    id:z.string().optional(),
    taskName: z.string({message: "Task is required!"}).trim().min(3, {message: "Minimum of 3 characters is required!"}),
    desc: z.string().trim().max(50, {message: "Max limit exceeded"}).optional(),
    taskType: z.enum(["work", "personal", "learning", "others"], {
        message: "Please select a valid field"
    }).optional(),
    dueDate: z.string().optional(),
    priority: z.enum(["high", "low", "medium"], {
        message: "Please select a valid field"
    }).optional(),
    completed: z.boolean().optional(),
    dateAdded: z.string().optional()
})

export type addTaskValidationSchemaType = z.infer<typeof addTaskValidationSchema>