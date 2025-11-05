import z from "zod";

export const signupValidationSchema = z.object({
    email: z.email({message:"Please enter a valid email address"}),
    username: z.string("Username is required").min(3, {message: "Username should be 3 charactrers or more"}),
    password: z.string({message: "Password is required"}).min(6, {message:"Password must be 6 or more characters"}),
    confirmPwd: z.string({message: "COnfirm Password is required"}).min(6, {message:"Confirm Password must be 6 or more characters"})
})

export type signupValidationType = z.infer<typeof signupValidationSchema>