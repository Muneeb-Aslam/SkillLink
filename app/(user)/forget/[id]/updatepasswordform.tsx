"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useParams } from "next/navigation";
import { API_FORGET_UPDATE_PATH } from "@/app/api/api_constants";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const updatePasswordSchema = z.object({
  password: z.string().min(8,{message:"Password atleast has 8 characters."}),
})

export default function UpdatePassword() {
  const [disabled, setDisabled] = useState(false);
  const param = useParams<{id:string}>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = async (values: any) => {
    setDisabled(true);
    try {
      const response = await fetch(`${API_FORGET_UPDATE_PATH}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id:param.id,password:values.password}),
      });
      const res = await response.json();
      if (response?.ok) {
        toast.success("Password updated Successfully");
        router.replace("/login")
      } else {        
        toast.error("link is expired");
      }
    } catch (error) {
      toast.error("Could't update the passowrd. Try again");
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
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {!!errors.password && (
            <span className="text-red-500 text-xs font-bold">
              {errors.password.message}
            </span>
          )}
        </div>
        <Button type="submit" disabled={disabled}>
          Update Password
        </Button>
      </form>
    </section>
  );
}
