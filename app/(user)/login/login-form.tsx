"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { loginSchema } from "./schema";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function LoginForm() {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    setDisabled(true);
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (response?.ok) {
        toast.success(
          "Successfully sign in."
        );
        router.replace('/')
      } else {
        toast.error("Invalid Username or Password");
      }
    } catch (error) {
      toast.error("Server Error. Try Again.");
    } finally {
      setDisabled(false);
    }
  };
  return (
    <section className="w-full flex flex-col gap-6">
      <Image src={logo} alt={"logo"} className="w-[65px] h-[65px]"></Image>
      <div className="flex flex-col gap-1">
        <h3 className="text-heading font-extrabold text-4xl">
          Login to your account
        </h3>
        <span className="text-normal font-semibold text-lg">
          Explore open freelancing oportunities
        </span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <Input type="text" placeholder="Email" {...register("email")} />
          {!!errors.email && (
            <span className="text-red-500 text-xs font-bold">
              {errors.email.message}
            </span>
          )}
        </div>
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
          Continue with email
        </Button>
      </form>
    </section>
  );
}
