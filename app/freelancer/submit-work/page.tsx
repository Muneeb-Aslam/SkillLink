"use client";

import { useRef, useState } from "react";
import ProjectDetailsHeader from "../components/project/ProjectDetailsHeader";
import MessagesBox from "../components/submit-work/MessagesBox";
import UploadFile from "../components/submit-work/UploadFile";
import UploadedFile from "../components/submit-work/UploadedFile";
import { Button } from "@/components/ui/button";
import { uploadSingleFile } from "@/lib/fileupload";
import { API_CLIENT_PROJECT_PATH } from "@/app/api/api_constants";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import AWS from "aws-sdk";
AWS.config.update({
   accessKeyId: "AKIAVWHPZZQMEUAJ27F7",
   secretAccessKey: "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",
   region: "eu-north-1",
});

const SubmitWork = (proj: { proj: any }) => {
   const project = proj.proj;
   const router = useRouter();
   const [selectedTab, setSelectedTab] = useState("submit");
   const [selectedFile, setSelectedFile] = useState<File | undefined>(
      undefined
   );
   const fileInputRef = useRef<HTMLInputElement | null>(null);

   const tabs = [{ name: "submit", title: "Submit Work" }];

   const onFileCancel = () => {
      setSelectedFile(undefined);
      setTimeout(() => {
         if (fileInputRef?.current) {
            fileInputRef.current.value = "";
         }
      }, 100);
   };

   const submitFile = async () => {
      const res = await uploadSingleFile(selectedFile, 0);
      console.log(res);

      const response = await fetch(`${API_CLIENT_PROJECT_PATH}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            id: project._id,
            submittedFiles: res?.Location,
         }),
      });

      if (response.ok) {
         toast.success("Project Posted Successfully");
         // router.replace("/");
      } else {
         toast.error("Could not post the project");
      }
   };
   return (
      <div className="border w-full">
         <ProjectDetailsHeader role="freelancer" project={project} />
         <section className="w-full max-w-[1300px] h-max flex flex-col justify-start items-start gap-6 px-16 py-12">
            <div className="flex justify-start items-start gap-2">
               {tabs.map((tab, index) => (
                  <button
                     type="button"
                     key={index}
                     className={`w-max px-4 py-2 ${
                        selectedTab === tab.name
                           ? "text-blue border-blue"
                           : "text-grayish border-grayish"
                     } border-b rounded-none font-bold`}
                     onClick={() => setSelectedTab(tab.name)}
                  >
                     {tab.title}
                  </button>
               ))}
            </div>
            {selectedTab === "submit" ? (
               !selectedFile ? (
                  <UploadFile
                     setSelectedFile={setSelectedFile}
                     fileInputRef={fileInputRef}
                  />
               ) : (
                  <UploadedFile
                     onFileCancel={onFileCancel}
                     selectedFile={selectedFile}
                  />
               )
            ) : null}
            {selectedTab === "messages" && <MessagesBox />}
            <Button onClick={submitFile} className="w-max">
               Submit
            </Button>
         </section>
      </div>
   );
};

export default SubmitWork;
