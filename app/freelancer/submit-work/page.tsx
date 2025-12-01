"use client";

import { useRef, useState, useEffect } from "react";
import ProjectDetailsHeader from "../components/project/ProjectDetailsHeader";
import MessagesBox from "../components/submit-work/MessagesBox";
import UploadFile from "../components/submit-work/UploadFile";
import UploadedFile from "../components/submit-work/UploadedFile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { uploadSingleFile } from "@/lib/fileupload";
import { API_CLIENT_PROJECT_PATH } from "@/app/api/api_constants";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import moment from "moment";
import AWS from "aws-sdk";
AWS.config.update({
   accessKeyId: "AKIAVWHPZZQMEUAJ27F7",
   secretAccessKey: "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",
   region: "eu-north-1",
});

const SubmitWork = (proj: { proj: any }) => {
   const project = proj.proj;
   const router = useRouter();
   const session = useSession();
   const user = session?.data?.user;
   const [selectedTab, setSelectedTab] = useState("submit-full");
   const [selectedFile, setSelectedFile] = useState<File | undefined>(
      undefined
   );
   const fileInputRef = useRef<HTMLInputElement | null>(null);
   const [deadline, setDeadline] = useState<Date | null>(null);
   const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
   const [progressPercentage, setProgressPercentage] = useState(0);
   const [progressComment, setProgressComment] = useState("");
   const [isSubmittingProgress, setIsSubmittingProgress] = useState(false);
   const [currentWorkProgress, setCurrentWorkProgress] = useState(0);
   const [timeRemaining, setTimeRemaining] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
   });

   const tabs = [
      { name: "submit-full", title: "Submit Full Work" },
      { name: "submit-progress", title: "Submit Progress Percentage" },
   ];

   useEffect(() => {
      // Fetch deadline info
      const fetchDeadlineInfo = async () => {
         try {
            const response = await fetch(
               `/api/projects/deadline?projectId=${project._id}`
            );
            if (response.ok) {
               const data = await response.json();
               setDeadline(data.deadline ? new Date(data.deadline) : null);
               setDaysRemaining(data.daysRemaining);
            }
         } catch (error) {
            console.error("Error fetching deadline:", error);
         }
      };

      // Fetch current work progress
      const fetchWorkProgress = async () => {
         try {
            const response = await fetch(
               `/api/projects/work-progress?projectId=${project._id}`
            );
            if (response.ok) {
               const data = await response.json();
               setCurrentWorkProgress(data.workProgress || 0);
               setProgressPercentage(data.workProgress || 0);
            }
         } catch (error) {
            console.error("Error fetching work progress:", error);
         }
      };

      if (project?._id) {
         fetchDeadlineInfo();
         fetchWorkProgress();
      }
   }, [project?._id]);

   // Countdown timer effect - always show if deadline exists
   useEffect(() => {
      if (!deadline) return;

      const updateCountdown = () => {
         const now = new Date();
         const deadlineDate = new Date(deadline);
         const diff = deadlineDate.getTime() - now.getTime();

         if (diff <= 0) {
            setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
         }

         const days = Math.floor(diff / (1000 * 60 * 60 * 24));
         const hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
         );
         const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
         const seconds = Math.floor((diff % (1000 * 60)) / 1000);

         setTimeRemaining({ days, hours, minutes, seconds });
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);

      return () => clearInterval(interval);
   }, [deadline]);

   const onFileCancel = () => {
      setSelectedFile(undefined);
      setTimeout(() => {
         if (fileInputRef?.current) {
            fileInputRef.current.value = "";
         }
      }, 100);
   };

   const submitFile = async () => {
      if (!selectedFile) {
         toast.error("Please select a file to submit");
         return;
      }

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
         toast.success("Work submitted successfully");
         setSelectedFile(undefined);
         if (fileInputRef?.current) {
            fileInputRef.current.value = "";
         }
      } else {
         toast.error("Could not submit the work");
      }
   };

   const submitProgress = async () => {
      if (progressPercentage < 0 || progressPercentage > 100) {
         toast.error("Progress must be between 0 and 100");
         return;
      }

      setIsSubmittingProgress(true);
      try {
         const response = await fetch("/api/projects/work-progress", {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               projectId: project._id,
               percentage: progressPercentage,
               comment: progressComment,
               updatedBy: user?.id || "",
               updatedByRole: "freelancer",
            }),
         });

         const data = await response.json();

         if (response.ok) {
            toast.success("Progress updated successfully");
            setCurrentWorkProgress(progressPercentage);
            setProgressComment("");
         } else {
            toast.error(data.error?.message || "Failed to update progress");
         }
      } catch (error: any) {
         toast.error(error.message || "An error occurred");
      } finally {
         setIsSubmittingProgress(false);
      }
   };
   return (
      <div className="w-full bg-gradient-to-b from-gray-50 to-white">
         <ProjectDetailsHeader role="freelancer" project={project} />
         <section className="w-full max-w-[1300px] mx-auto h-max flex flex-col justify-start items-start gap-8 px-16 py-12">
            {/* Project Information Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Project Details Card */}
               <Card className="w-full bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-3">
                     <CardTitle className="text-xl font-bold text-gray-800">
                        Project Information
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-700">
                           Budget Range:
                        </span>
                        <span className="text-md font-bold text-blue">
                           ${project?.budget?.from} - ${project?.budget?.to}
                        </span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-700">
                           Posted On:
                        </span>
                        <span className="text-md font-semibold text-gray-600">
                           {moment(project?.createdAt).format("MMM DD, YYYY")}
                        </span>
                     </div>
                     {project?.milestones && project.milestones.length > 0 && (
                        <div className="flex justify-between items-center">
                           <span className="text-sm font-semibold text-gray-700">
                              Milestones:
                           </span>
                           <span className="text-md font-semibold text-gray-600">
                              {project.milestones.length}
                           </span>
                        </div>
                     )}
                     <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-700">
                           Current Progress:
                        </span>
                        <span className="text-lg font-bold text-blue">
                           {currentWorkProgress}%
                        </span>
                     </div>
                     <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                        <div
                           className="bg-blue h-3 rounded-full transition-all duration-300"
                           style={{ width: `${currentWorkProgress}%` }}
                        />
                     </div>
                  </CardContent>
               </Card>

               {/* Deadline & Countdown Card */}
               {deadline ? (
                  <Card className="w-full bg-gradient-to-br from-blue-50 via-blue-100/50 to-indigo-50 shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
                     <CardHeader className="pb-3">
                        <CardTitle className="text-xl font-bold text-blue-700">
                           Project Deadline
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="space-y-2">
                           <div className="flex justify-between items-center">
                              <span className="text-sm font-semibold text-gray-700">
                                 Deadline Date:
                              </span>
                              <span className="text-md font-bold text-blue-700">
                                 {moment(deadline).format("MMMM DD, YYYY")}
                              </span>
                           </div>
                           {daysRemaining !== null && (
                              <p
                                 className={`text-sm font-semibold ${
                                    daysRemaining > 7
                                       ? "text-green-600"
                                       : daysRemaining > 0
                                       ? "text-yellow-600"
                                       : "text-red-600"
                                 }`}
                              >
                                 {daysRemaining > 0
                                    ? `${daysRemaining} days remaining`
                                    : daysRemaining === 0
                                    ? "⚠️ Deadline is today!"
                                    : "❌ Deadline has passed"}
                              </p>
                           )}
                        </div>

                        {/* Countdown Timer - Always show if deadline exists */}
                        <div className="space-y-3 pt-4">
                           <h4 className="text-sm font-bold text-gray-700">
                              Time Remaining
                           </h4>
                           <div className="grid grid-cols-4 gap-3">
                              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                 <div className="text-3xl font-bold text-blue-600">
                                    {timeRemaining.days}
                                 </div>
                                 <div className="text-xs text-gray-600 font-semibold mt-1">
                                    Days
                                 </div>
                              </div>
                              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                 <div className="text-3xl font-bold text-blue-600">
                                    {timeRemaining.hours}
                                 </div>
                                 <div className="text-xs text-gray-600 font-semibold mt-1">
                                    Hours
                                 </div>
                              </div>
                              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                 <div className="text-3xl font-bold text-blue-600">
                                    {timeRemaining.minutes}
                                 </div>
                                 <div className="text-xs text-gray-600 font-semibold mt-1">
                                    Minutes
                                 </div>
                              </div>
                              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                 <div className="text-3xl font-bold text-blue-600">
                                    {timeRemaining.seconds}
                                 </div>
                                 <div className="text-xs text-gray-600 font-semibold mt-1">
                                    Seconds
                                 </div>
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               ) : (
                  <Card className="w-full bg-gradient-to-br from-gray-50 to-gray-100/50 shadow-lg rounded-xl">
                     <CardHeader className="pb-3">
                        <CardTitle className="text-xl font-bold text-gray-600">
                           Project Deadline
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <p className="text-sm text-gray-500">
                           No deadline set for this project
                        </p>
                     </CardContent>
                  </Card>
               )}
            </div>

            {/* Project Description */}
            {project?.description && (
               <Card className="w-full bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-3">
                     <CardTitle className="text-xl font-bold text-gray-800">
                        Project Description
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-gray-700 leading-relaxed">
                        {project.description}
                     </p>
                  </CardContent>
               </Card>
            )}

            {/* Skills and Categories */}
            {(project?.skills?.length > 0 ||
               project?.categories?.length > 0) && (
               <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project?.skills?.length > 0 && (
                     <Card className="w-full bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="pb-3">
                           <CardTitle className="text-lg font-bold text-gray-800">
                              Required Skills
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className="flex flex-wrap gap-2">
                              {project.skills.map((skill: any, index: number) => (
                                 <span
                                    key={index}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold rounded-lg text-sm shadow-sm hover:shadow-md transition-shadow"
                                 >
                                    {typeof skill === "string"
                                       ? skill
                                       : skill.name}
                                 </span>
                              ))}
                           </div>
                        </CardContent>
                     </Card>
                  )}
                  {project?.categories?.length > 0 && (
                     <Card className="w-full bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="pb-3">
                           <CardTitle className="text-lg font-bold text-gray-800">
                              Categories
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className="flex flex-wrap gap-2">
                              {project.categories.map(
                                 (category: any, index: number) => (
                                    <span
                                       key={index}
                                       className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-semibold rounded-lg text-sm shadow-sm hover:shadow-md transition-shadow"
                                    >
                                       {typeof category === "string"
                                          ? category
                                          : category.name}
                                    </span>
                                 )
                              )}
                           </div>
                        </CardContent>
                     </Card>
                  )}
               </div>
            )}

            {/* Tabs */}
            <div className="w-full flex justify-start items-start gap-2 bg-white p-2 rounded-xl shadow-md">
               {tabs.map((tab, index) => (
                  <button
                     type="button"
                     key={index}
                     className={`w-max px-6 py-3 ${
                        selectedTab === tab.name
                           ? "text-blue bg-blue-50 rounded-lg shadow-sm font-bold"
                           : "text-gray-600 hover:text-blue hover:bg-gray-50 rounded-lg"
                     } transition-all duration-200`}
                     onClick={() => setSelectedTab(tab.name)}
                  >
                     {tab.title}
                  </button>
               ))}
            </div>

            {/* Submit Full Work Tab */}
            {selectedTab === "submit-full" && (
               <div className="w-full space-y-6">
                  <Card className="w-full bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
                     <CardContent className="p-6">
                        {!selectedFile ? (
                           <UploadFile
                              setSelectedFile={setSelectedFile}
                              fileInputRef={fileInputRef}
                           />
                        ) : (
                           <UploadedFile
                              onFileCancel={onFileCancel}
                              selectedFile={selectedFile}
                           />
                        )}
                     </CardContent>
                  </Card>
                  <Button
                     onClick={submitFile}
                     className="w-max bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-3 rounded-lg font-semibold"
                     disabled={!selectedFile}
                  >
                     Submit Full Work
                  </Button>
               </div>
            )}

            {/* Submit Progress Percentage Tab */}
            {selectedTab === "submit-progress" && (
               <Card className="w-full bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-3">
                     <CardTitle className="text-xl font-bold text-gray-800">
                        Update Work Progress
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                     <div className="space-y-2">
                        <div className="flex justify-between items-center">
                           <label className="text-sm font-semibold text-gray-700">
                              Current Progress
                           </label>
                           <span className="text-lg font-bold text-blue">
                              {currentWorkProgress}%
                           </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                           <div
                              className="bg-blue h-4 rounded-full transition-all duration-300"
                              style={{ width: `${currentWorkProgress}%` }}
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">
                           Update Progress (%)
                        </label>
                        <Input
                           type="number"
                           min="0"
                           max="100"
                           value={progressPercentage}
                           onChange={(e) =>
                              setProgressPercentage(Number(e.target.value))
                           }
                           className="w-full"
                           placeholder="Enter progress percentage (0-100)"
                        />
                     </div>

                     <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">
                           Comment (Optional)
                        </label>
                        <TextArea
                           value={progressComment}
                           onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                              setProgressComment(e.target.value)
                           }
                           placeholder="Add a comment about your progress..."
                           rows={4}
                        />
                     </div>

                     <Button
                        onClick={submitProgress}
                        disabled={isSubmittingProgress}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 py-3 rounded-lg font-semibold"
                     >
                        {isSubmittingProgress
                           ? "Updating..."
                           : "Update Progress"}
                     </Button>
                  </CardContent>
               </Card>
            )}

            {selectedTab === "messages" && <MessagesBox />}
         </section>
      </div>
   );
};

export default SubmitWork;
