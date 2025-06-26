import { z } from "zod";

const userRole = z.enum(["freelancer","client"])
export const registerSchema = z.object({
  name: z.string().refine((value) => value, "Enter Name"),
  email: z.string().min(1, { message: "Enter Email" }).email(),
  password: z.string().min(8,{message:"Password atleast has 8 characters."}),
  phone: z.string().min(11,{message:"Enter Phone number with Country Code"}),
  role:userRole,
});
