"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { VerificationSchema } from "./schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { API_OTP_VERIFY_PATH } from "@/app/api/api_constants";
import { useParams,useRouter } from "next/navigation";


export default function VerifyForm() {
  const param = useParams<{ email: string }>();
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof VerificationSchema>>({
    resolver: zodResolver(VerificationSchema),
  });

  const onSubmit = async (data: any) => {
    const decodedEmail = decodeURIComponent(param.email);
    setDisabled(true);
    try {
      const response = await fetch(`${API_OTP_VERIFY_PATH}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: data.OTP, email: decodedEmail }),
      });
      const res = await response.json();
      if (response?.ok) {
        toast.success("Successfully Verified Email");
        router.replace('/')
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error("Could't verify. Try again");
    } finally {
      setDisabled(false);
    }
  };
  return (
    <div className="w-full flex flex-col gap-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-heading font-extrabold text-3xl">
            Registration Successful
          </h3>
          <span className="text-normal text-md">
            Enter the verificaton code sent on your Email
          </span>
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <Input type="text" placeholder="OTP" {...register("OTP")} />
          {!!errors.OTP && (
            <span className="text-red-500 text-xs font-bold">
              {errors.OTP.message}
            </span>
          )}
        </div>
        <Button type="submit" disabled={disabled}>
          Submit
        </Button>
      </form>
    </div>
  );
}
