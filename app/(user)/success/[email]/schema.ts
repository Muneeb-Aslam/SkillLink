import { z } from "zod";

export const VerificationSchema = z.object({
  OTP: z.string().min(6, { message: "OTP Must Have 6 characters" }),
});
