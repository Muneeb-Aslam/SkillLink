import { z } from "zod";

export const budget = z.object({
  from: z.string().min(1, { message: "Required" }),
  to: z.string().min(1, { message: "Required" }),
});

export const milestones = z.object({
  name: z.string().min(1, { message: "Milestone name is required" }),
  price: z.string().min(1, { message: "Milestone price is required" }),
  deadline: z.string().min(1, { message: "Milestone deadline is required" }),
});

export const PostProjectSchema = z.object({
  title: z.string().min(1, { message: "Title required" }),
  budget: budget,
  skills: z.array(z.any()).min(1,{message:"Atleast One skills is required"}),
  categories: z.array(z.any()).min(1,{message:"Atleast One Category is required"}),
  description: z.string().min(50, { message: "Atleast 50 words" }),
  milestones: z.array(milestones).min(1,{message:"Enter atleast one milestone"}),
  files: z.any().optional(),
});
