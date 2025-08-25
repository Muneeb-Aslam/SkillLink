"use client";

import { Button } from "@/components/ui/button";
import ImageSelectComponent from "@/components/ui/fileselector";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { API_CLIENT_POST_PROJECT_PATH } from "@/app/api/api_constants";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import AWS from "aws-sdk";
import { uploadSingleFile } from "@/lib/fileupload";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { PostProjectSchema } from "./schema";
import Image from "next/image";
import cross from "@/public/cross.svg";
import { useRouter } from "next/navigation";

AWS.config.update({
   accessKeyId: "AKIAVWHPZZQMEUAJ27F7",
   secretAccessKey: "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",
   region: "eu-north-1",
});

export default function PostProjectForm() {
   const session = useSession();
   const user = session?.data?.user;

   const [disabled, setDisabled] = useState(false);
   const [files, setFiles] = useState<any[]>([]);
   const router = useRouter();
   const {
      control,
      register,
      setValue,
      handleSubmit,
      formState: { errors },
   } = useForm<z.infer<typeof PostProjectSchema>>({
      resolver: zodResolver(PostProjectSchema),
   });

   const {
      fields: skillFields,
      append: appendSkill,
      remove: removeSkill,
   } = useFieldArray({
      control,
      name: "skills",
   });

   const {
      fields: milestoneFields,
      append: appendMilestone,
      remove: removeMilestone,
   } = useFieldArray({
      control,
      name: "milestones",
   });

   const {
      fields: categories,
      append: appendCategory,
      remove: removeCategory,
   } = useFieldArray({
      control,
      name: "categories",
   });

   const onSubmit = async (data: any) => {
      setDisabled(true);
      const uploadPromises = data.files.map((uploadFile: any, index: number) =>
         uploadSingleFile(uploadFile, index)
      );
      const uploadResults = await Promise.all(uploadPromises);
      setFiles([...uploadResults]);

      var keys: any[] = [];
      files.forEach((itm) => {
         console.log(itm);
      });

      const response = await fetch(`${API_CLIENT_POST_PROJECT_PATH}`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            userId: user?.id,
            data,
            files: keys,
         }),
      });

      if (response.ok) {
         toast.success("Project Posted Successfully");
         router.replace("/");
      } else {
         toast.error("Could not post the project");
      }
      setDisabled(false);
   };
   return (
      <section className="w-full bg-white flex justify-center items-center">
         <div className="w-full max-w-[1300px] h-max flex flex-col justify-start items-start gap-6 px-16 py-12">
            <span className="text-blackish font-bold text-2xl">
               Post a Project
            </span>
            <hr className="w-full text-normal opacity-40" />
            <div className="flex flex-col justify-start items-start gap-1">
               <span className="text-blackish font-bold text-md">
                  Basic Information
               </span>
               <span className="text-grayish font-bold text-sm">
                  This information will be displayed publicly
               </span>
            </div>
            <hr className="w-full text-normal opacity-40" />
            <form
               onSubmit={handleSubmit(onSubmit)}
               className="w-full flex flex-col justify-start items-start gap-4"
            >
               <div className="w-full flex justify-start items-start gap-12">
                  <div className="w-1/3 flex flex-col justify-start items-start gap-1">
                     <span className="text-blackish font-bold text-md">
                        Job Title
                     </span>
                     <span className="text-grayish font-bold text-sm">
                        Job titles must be describe one position
                     </span>
                     {!!errors.title && (
                        <span className="text-red-500 text-xs font-bold">
                           {errors.title.message}
                        </span>
                     )}
                  </div>
                  <Input
                     type="text"
                     {...register("title")}
                     placeholder="Software Engineer"
                     className="w-1/3"
                  />
               </div>

               <hr className="w-full text-normal opacity-40" />

               <div className="w-full flex justify-start items-center gap-12">
                  <div className="w-1/3 flex flex-col justify-start items-start gap-1">
                     <span className="text-blackish font-bold text-md">
                        Budget
                     </span>
                     <span className="text-grayish font-bold text-sm">
                        Please specify the estimated Budget range
                     </span>
                  </div>
                  <div className="flex justify-start items-center gap-4">
                     <Input
                        type="number"
                        {...register("budget.from")}
                        placeholder="from"
                        className="w-30"
                     />
                     {!!errors.budget?.from && (
                        <span className="text-red-500 text-xs font-bold">
                           {errors.budget?.from.message}
                        </span>
                     )}
                     <span className="text-grayish font-bold text-sm">
                        {" "}
                        to{" "}
                     </span>
                     <Input
                        type="number"
                        {...register("budget.to")}
                        placeholder="to"
                        className="w-30"
                     />
                     {!!errors.budget?.to && (
                        <span className="text-red-500 text-xs font-bold">
                           {errors.budget?.to.message}
                        </span>
                     )}
                  </div>
               </div>

               <hr className="w-full text-normal opacity-40" />

               <div className="w-full flex justify-start items-start gap-12">
                  <div className="w-1/3 flex flex-col justify-start items-start gap-1">
                     <span className="text-blackish font-bold text-md">
                        Required Skills
                     </span>
                     <span className="text-grayish font-bold text-sm">
                        Add required skills for the job
                     </span>
                     {!!errors.skills && (
                        <span className="text-red-500 text-xs font-bold">
                           {errors.skills.message}
                        </span>
                     )}
                  </div>
                  <div className="w-[60%] flex flex-col justify-start items-start gap-4">
                     <span
                        onClick={() => appendSkill({ name: "" })}
                        className="bg-white  text-blue font-bold cursor-pointer"
                     >
                        Add Skill
                     </span>
                     <div className="w-full flex justify-start items-start gap-8 flex-grow flex-wrap">
                        {skillFields.map((field, index) => (
                           <div
                              key={field.id}
                              className="flex justify-start items-center gap-2 w-max"
                           >
                              <input
                                 {...register(`skills.${index}.name`)}
                                 type="text"
                                 className="flex h-10 rounded-xl bg-transparent  px-3 py-2 text-sm outline-none  text-blue font-bold focus:border-2 focus:border-input shadow-lg min-w-4"
                              />
                              <span
                                 onClick={() => removeSkill(index)}
                                 className="w-[24px] h-[24px]"
                              >
                                 <Image
                                    src={cross}
                                    alt=""
                                    className="cursor-pointer w-full h-full"
                                 ></Image>
                              </span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               <hr className="w-full text-normal opacity-40" />

               <div className="w-full flex justify-start items-start gap-12">
                  <div className="w-1/3 flex flex-col justify-start items-start gap-1">
                     <span className="text-blackish font-bold text-md">
                        Required Categories
                     </span>
                     <span className="text-grayish font-bold text-sm">
                        Add required categories for the job
                     </span>
                     {!!errors.categories && (
                        <span className="text-red-500 text-xs font-bold">
                           {errors.categories.message}
                        </span>
                     )}
                  </div>
                  <div className="w-[60%] flex flex-col justify-start items-start gap-4">
                     <span
                        onClick={() => appendCategory({ name: "" })}
                        className="bg-white  text-blue font-bold cursor-pointer"
                     >
                        Add Categories
                     </span>
                     <div className="w-full flex justify-start items-start gap-8 flex-grow flex-wrap">
                        {categories.map((field, index) => (
                           <div
                              key={field.id}
                              className="flex justify-start items-center gap-2 w-max"
                           >
                              <input
                                 {...register(`categories.${index}.name`)}
                                 type="text"
                                 className="flex h-10 rounded-xl bg-transparent  px-3 py-2 text-sm outline-none  text-blue font-bold focus:border-2 focus:border-input shadow-lg min-w-4"
                              />
                              <span
                                 onClick={() => removeCategory(index)}
                                 className="w-[24px] h-[24px]"
                              >
                                 <Image
                                    src={cross}
                                    alt=""
                                    className="cursor-pointer w-full h-full"
                                 ></Image>
                              </span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               <hr className="w-full text-normal opacity-40" />

               <div className="w-full flex justify-start items-start gap-12">
                  <div className="w-1/3 flex flex-col justify-start items-start gap-1">
                     <span className="text-blackish font-bold text-md">
                        Project Description
                     </span>
                     <span className="text-grayish font-bold text-sm">
                        Project Descriptions must be describe one position
                     </span>
                     {!!errors.description && (
                        <span className="text-red-500 text-xs font-bold">
                           {errors.description.message}
                        </span>
                     )}
                  </div>
                  <TextArea
                     {...register("description")}
                     placeholder="Descripton"
                     className="w-1/3 h-[150px]"
                  />
               </div>

               <hr className="w-full text-normal opacity-40" />

               <div className="w-full flex flex-col justify-start items-start gap-4">
                  <span className="w-full text-blackish font-bold text-lg">
                     Milestones
                  </span>
                  <div className="w-full flex flex-col justify-start items-start gap-4">
                     <div className="w-full flex justify-start items-start gap-8 flex-grow flex-wrap">
                        {milestoneFields.map((field, index) => (
                           <div
                              key={field.id}
                              className="w-full flex flex-col justify-start items-center gap-2"
                           >
                              <div className="w-full flex justify-between items-start pr-10">
                                 <span className="text-grayish text-sm font-semibold">
                                    Milestone # {index + 1}
                                 </span>
                                 <span
                                    onClick={() => removeMilestone(index)}
                                    className="w-[24px] h-[24px] text-red-500 text-sm cursor-pointer"
                                 >
                                    Remove
                                 </span>
                              </div>
                              <div className="w-full flex justify-start items-center gap-4">
                                 <Input
                                    {...register(`milestones.${index}.name`)}
                                    type="text"
                                    placeholder="Name"
                                 />
                                 <Input
                                    {...register(`milestones.${index}.price`)}
                                    type="number"
                                    placeholder="price"
                                 />
                                 <Input
                                    {...register(
                                       `milestones.${index}.deadline`
                                    )}
                                    type="number"
                                    placeholder="deadline in days"
                                 />
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
                  <span
                     onClick={() =>
                        appendMilestone({ name: "", price: "", deadline: "" })
                     }
                     className="bg-white  text-blue font-bold cursor-pointer self-end border-2 border-blue px-4 py-2"
                  >
                     Add Milestone
                  </span>
               </div>
               <ImageSelectComponent setValue={setValue} />
               <Button
                  type="submit"
                  className="w-20 self-center"
                  disabled={disabled}
               >
                  Post
               </Button>
            </form>
         </div>
      </section>
   );
}
