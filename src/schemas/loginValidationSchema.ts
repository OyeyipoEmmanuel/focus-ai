import {z} from "zod";


export const loginFormSchema = z.object({
    email: z.email({message: "Please enter a valid email address"}),
    password: z.string({message: "Password is required"}).min(6, {message: "Password must be 6 or more characters"})
})

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>