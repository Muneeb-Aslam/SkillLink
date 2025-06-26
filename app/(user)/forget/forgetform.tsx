"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ForgetSchema } from "./schema";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { API_FORGET_PATH } from "@/app/api/api_constants";


export default function ForgetPassword() {
  const [disabled, setDisabled] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ForgetSchema>>({
    resolver: zodResolver(ForgetSchema),
  });

  const onSubmit = async (values: any) => {
    setDisabled(true);
    try {
      const response = await fetch(`${API_FORGET_PATH}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const res = await response.json();
      if (response?.ok) {
        toast.success("Password Reset Email Sent");
      } else {
        toast.error("User not found");
      }
    } catch (error) {
      toast.error("Could't Send Email. Try again");
    } finally {
      setDisabled(false);
    }
  };
  return (
    <section className="w-full flex flex-col gap-6">
      <Image src={logo} alt={"logo"} className="w-[65px] h-[65px]"></Image>
      <div className="flex flex-col gap-1">
        <h3 className="text-heading font-extrabold text-3xl">
          Update Your Password
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <Input
            type="text"
            placeholder="Email"
            {...register("email")}
          />
          {!!errors.email && (
            <span className="text-red-500 text-xs font-bold">
              {errors.email.message}
            </span>
          )}
        </div>
        <Button type="submit" disabled={disabled}>
          Send Link
        </Button>
      </form>
    </section>
  );
}
