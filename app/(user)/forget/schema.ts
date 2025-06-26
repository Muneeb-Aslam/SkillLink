import {z} from "zod"

export const ForgetSchema = z.object({
    email: z.string().min(1, { message: "Enter Email" }).email(),
})