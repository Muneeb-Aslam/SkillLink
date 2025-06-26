"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { registerSchema } from "./schema";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { API_REGISTER_PATH } from "@/app/api/api_constants";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "freelancer",
    },
  });

  const userRole = watch("role");
  const onSubmit = async (data: any) => {
    setDisabled(true);
    try {
      const response = await fetch(`${API_REGISTER_PATH}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response?.ok) {
        const email = encodeURIComponent(data.email);
        toast.success("Successfully registered.");
        router.replace(`/success/${email}`);
      } else {
        toast.error("User Already Exists.");
      }
    } catch (error) {
      toast.error("Could't not register user. Try Again.");
    } finally {
      setDisabled(false);
    }
  };

  return (
    <section className="w-full flex flex-col gap-6">
      <Image src={logo} alt={"logo"} className="w-[65px] h-[65px]"></Image>
      <div className="flex flex-col gap-1">
        <h3 className="text-heading font-extrabold text-4xl">
          Register with us.
        </h3>
        <span className="text-normal font-semibold text-lg">
          Explore open freelancing oportunities
        </span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="w-full flex justify-start items-center gap-4">
          <div className="flex items-center">
            <Input
              id="client"
              type="radio"
              className="hidden"
              value="client"
              {...register("role")}
            />
            <label
              htmlFor="client"
              className="flex items-center cursor-pointer text-heading font-bold text-lg whitespace-nowrap"
            >
              <span
                className={`border-2 border-primary rounded-full w-5 h-5  m-2 ${
                  userRole === "client" ? "bg-blue" : ""
                }`}
              ></span>
              Client
            </label>
          </div>
          <div className="flex items-center">
            <Input
              id="freelancer"
              type="radio"
              className="hidden"
              value="freelancer"
              {...register("role")}
            />
            <label
              htmlFor="freelancer"
              className="flex items-center cursor-pointer text-heading font-bold text-lg whitespace-nowrap"
            >
              <span
                className={`border-2 border-primary rounded-full m-2 w-5 h-5 ${
                  userRole === "freelancer" ? "bg-blue" : ""
                }`}
              ></span>{" "}
              Freelaner
            </label>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <Input type="text" placeholder="Full Name" {...register("name")} />
          {!!errors.name && (
            <span className="text-red-500 text-xs font-bold">
              {errors.name.message}
            </span>
          )}
        </div>
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
            placeholder="password"
            {...register("password")}
          />
          {!!errors.password && (
            <span className="text-red-500 text-xs font-bold">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <Input
            type="text"
            placeholder="+920123456789"
            {...register("phone")}
          />
          {!!errors.phone && (
            <span className="text-red-500 text-xs font-bold">
              {errors.phone.message}
            </span>
          )}
        </div>
        <Button type="submit" disabled={disabled}>
          Register
        </Button>
      </form>
    </section>
  );
}
