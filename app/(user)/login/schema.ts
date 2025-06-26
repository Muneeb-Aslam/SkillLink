import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Enter Email" }).email(),
  password: z.string().min(8, { message: "Password must have 8 characters." }),
});
