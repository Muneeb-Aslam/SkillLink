"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import React, { useState } from "react";
import Image from "next/image";
import email from "@/public/emailicon.png";
import language from "@/public/langicon.png";
import phone from "@/public/phoneicon.png";
import editicon from "@/public/Edit.png";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import cross from "@/public/cross.svg";
import add from "@/public/addicon.svg";
import { API_CLIENT_PROFILE_PATH } from "@/app/api/api_constants";
import toast from "react-hot-toast";

const additionalSchema = z.object({
  email: z.string().optional(),
  phone: z.string().optional(),
  languages: z.array(z.any()).optional(),
});

const AdditionalProfile: React.FC<{ data: any }> = ({ data }) => {
  const clientData = data;

  const {
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof additionalSchema>>({
    resolver: zodResolver(additionalSchema),
    defaultValues: {
      email: clientData?.email,
      phone: clientData?.phone,
      languages: clientData?.languages,
    },
  });

  const {
    fields: languages,
    append: append,
    remove: remove,
  } = useFieldArray({
    control,
    name: "languages",
  });
  setValue("email", clientData?.email);
  setValue("phone", clientData?.phone);
  const [edit, setEdit] = useState<boolean>(false);

  const handleEdit = () => {
    setEdit((pre) => !pre);
  };

  const onSubmit = async (data: any) => {
    const response = await fetch(`${API_CLIENT_PROFILE_PATH}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: clientData.userId,
        email: data.email,
        phone: data.phone,
        languages: data.languages,
      }),
    });

    if (response.ok) {
      toast.success("Updated About successfully.");
      setEdit(false);
      window.location.reload();
    } else {
      toast.error("Could not update about section.");
    }
  };

  return (
    <form
      className="p-8 w-3/5 border-[1.5px] bg-white shadow-lg rounded-lg  border-[#f8f4f4f1] flex flex-col justify-between gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex justify-between items-center">
        <h3 className="text-blackish font-bold text-xl">
          Additional Information
        </h3>
        <div
          className="border-[1.5px] border-primary w-8 h-8 bg-white cursor-pointer"
          onClick={handleEdit}
        >
          <Image
            src={editicon}
            alt="add"
            className="fill-blue flex justify-center items-center h-full w-full"
          ></Image>
        </div>
      </div>
      <div className="w-full flex flex-col justify-between items-start gap-4">
        <div className="w-full flex justify-start items-start gap-2">
          <Image src={email} alt="email" className="w-[25px] h-[25px]"></Image>
          <div className="w-full flex flex-col justify-start items-start">
            <span className="text-grayish text-sm">Email</span>
            {edit ? (
              <Input type="text" className="w-full" {...register("email")} />
            ) : (
              <span className="text-blackish font-bold text-md">
                {getValues("email")}
              </span>
            )}
          </div>
        </div>
        <div className="w-full flex justify-start items-start gap-2">
          <Image src={phone} alt="phone" className="w-[25px] h-[25px]"></Image>
          <div className="w-full flex flex-col justify-start items-start">
            <span className="text-grayish text-sm">Phone</span>
            {edit ? (
              <Input type="text" {...register("phone")} className="w-full" />
            ) : (
              <span className="text-blackish font-bold text-md">
                {getValues("phone")}
              </span>
            )}
          </div>
        </div>
        <div className="w-full flex justify-start items-start gap-2">
          <Image
            src={language}
            alt="language"
            className="w-[25px] h-[25px]"
          ></Image>
          <div className="w-full flex flex-col justify-start items-start">
            <div className="w-full flex justify-between items-center">
              <span className="text-grayish text-sm">Languages</span>
              {edit && (
                <Image
                  src={add}
                  alt="addicon"
                  className="w-[24px] h-[24px]"
                  onClick={() => append("")}
                ></Image>
              )}
            </div>
            <div className="w-full flex justify-start items-start">
              {languages.map((field, index) => (
                <div
                  key={field.id}
                  className="w-max flex justify-center items-center gap-2"
                >
                  {edit && (
                    <>
                      <input
                        {...register(`languages.${index}`)}
                        type="text"
                        className="focus:border-2 focus:border-input text-md font-bold text-blackish outline-none rounded-md px-2 py-2 w-36"
                      />
                      <span
                        onClick={() => remove(index)}
                        className="w-[24px] h-[24px]"
                      >
                        <Image
                          src={cross}
                          alt=""
                          className="cursor-pointer w-full h-full"
                        ></Image>
                      </span>
                    </>
                  )}
                </div>
              ))}
              {!edit && (
                <div className="w-full flex justify-start items-center gap-4">
                  {clientData?.languages?.map((itm: any, index: number) => (
                    <span
                      key={index}
                      className="text-blackish font-bold text-md"
                    >
                      {itm}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {!!edit && (
        <div className="w-full flex justify-start items-center gap-2 pt-4">
          <Button type="submit" className="w-max">
            Update
          </Button>
          <Button
            type="button"
            onClick={handleEdit}
            className="bg-white text-blue font-bold w-max"
          >
            Cancel
          </Button>
        </div>
      )}
    </form>
  );
};

export default AdditionalProfile;
