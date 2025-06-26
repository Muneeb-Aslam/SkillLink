import { z } from "zod";

export const bidSchema = z.object({
  description: z.string().min(100,{message:"Minimum 100 characters"}),
  amount: z.string().refine((val)=>val,"Enter Bid Amount"),
  deliveryTime:z.string().refine((val)=>val,"Enter no of days")
});
