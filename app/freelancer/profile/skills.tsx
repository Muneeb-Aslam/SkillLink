"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import add from "@/public/addicon.svg";
import cross from "@/public/cross.svg";
import editicon from "@/public/Edit.png";
import { API_FREELANCER_PROFILE_PATH } from "@/app/api/api_constants";
import toast from "react-hot-toast";
import Image from "next/image";

const skillsSchema = z.object({
  skills: z.array(z.any()).optional(),
});

const Skills: React.FC<{ data: any }> = ({ data }) => {
  const clientData = data;
  const [edit, setEdit] = useState<boolean>(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof skillsSchema>>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: clientData?.skills,
    },
  });

  const {
    fields: skills,
    append: append,
    remove: remove,
  } = useFieldArray({
    control,
    name: "skills",
  });

  const handleEdit = () => {
    if (!edit && clientData?.skills?.length === 0) append("");
    setEdit((pre) => !pre);
  };

  const onSubmit = async (data: any) => {
    const response = await fetch(`${API_FREELANCER_PROFILE_PATH}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: clientData.userId,
        skills: data.skills,
      }),
    });

    if (response.ok) {
      toast.success("Updated successfully.");
      setEdit(false);
      window.location.reload();
    } else {
      toast.error("Could not update section.");
    }
  };

  return (
    <section className="py-8 px-16 w-full flex justify-between items-start gap-4 ">
      <form
        className="p-8 h-max relative w-full border-[1.5px] border-primary flex flex-col justify-between items-start gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex justify-between items-center">
          <h3 className="text-blackish font-bold text-xl">Skills</h3>
          <div className=" cursor-pointer flex justify-start items-center gap-2">
            {!!edit && (
              <Image
                src={add}
                alt="add"
                className="fill-blue flex justify-center items-center h-full w-full"
                onClick={() => append("")}
              ></Image>
            )}
            <Image
              src={editicon}
              alt="add"
              className="fill-blue flex justify-center items-center h-full w-full"
              onClick={handleEdit}
            ></Image>
          </div>
        </div>
        <div className="w-full flex justify-start items-start">
          {skills?.map((field, index) => (
            <div
              key={field.id}
              className="w-max flex justify-center items-center gap-2"
            >
              {edit && (
                <>
                  <input
                    {...register(`skills.${index}`)}
                    type="text"
                    className="border-2 border-input text-md font-bold text-blackish outline-none rounded-md px-2 py-2 w-36"
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
            <div className="w-full flex justify-start items-start gap-4 flex-wrap">
              {clientData?.skills?.map((itm: any, index: number) => (
                <span
                  key={index}
                  className="text-white font-bold text-md w-max px-4 py-2 bg-blue"
                >
                  {itm}
                </span>
              ))}
            </div>
          )}
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
    </section>
  );
};

export default Skills;
