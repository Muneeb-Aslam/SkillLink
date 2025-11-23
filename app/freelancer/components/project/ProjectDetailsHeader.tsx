"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import BidForm from "./BidForm";
import { API_CLIENT_PROJECT_PATH } from "@/app/api/api_constants";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type UserRoles = "client" | "freelancer";

const ProjectDetailsHeader: React.FC<{
  role: UserRoles;
  bid?: boolean;
  project: any;
}> = ({ role, bid, project }) => {
  console.log(project);

  const [bidFormOpen, setBidFormOpen] = useState(false);

  const router = useRouter();
  const handleBidFormClick = () => {
    return setBidFormOpen((pre) => !pre);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_CLIENT_PROJECT_PATH}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: project?._id }),
      });
      if (response?.ok) {
        toast.success("Successfully delete a bid");
        router.push("/");
      } else {
        toast.error("Could not deleted project");
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  return (
    <>
      {!!bidFormOpen && <BidForm handleBidFormClick={handleBidFormClick} />}
      <header className="w-full bg-primary-background flex justify-center items-center">
        <div className="w-full max-w-[1300px] h-max flex flex-col justify-start items-start gap-6 px-16 py-12">
          <div className="w-full flex justify-between items-center gap-4">
            <span className="text-sm text-grayish font-bold">
              Project Details
            </span>
            {role === "client" && (
              <div className="flex justify-start items-center gap-4">
                {!project.freelancerId ? (
                  <span
                    className="text-sm text-red-500 font-bold cursor-pointer"
                    onClick={handleDelete}
                  >
                    Delete
                  </span>
                ) : (
                  <span className="text-sm text-green-500 font-bold cursor-pointer">
                    Assigned
                  </span>
                )}
                <span className="text-sm text-blue font-bold px-4 py-2 border-2">
                  Your Project is live
                </span>
              </div>
            )}
          </div>
          <div className="w-full flex justify-between items-center bg-white border-0 shadow rounder-[4px] border-input px-6 py-6">
            <div className="flex flex-col justify-start items-start gap-2">
              <h3 className="text-blackish text-2xl font-bold">
                {project?.title}
              </h3>
              <span className="text-grayish font-bodl text-lg">
                ${project?.budget?.from} - ${project?.budget?.to}
              </span>
            </div>
            {role === "freelancer" && bid && !project?.freelancerId && (
              <Button
                type="button"
                className="w-max px-8 py-4 rounded-none"
                onClick={handleBidFormClick}
              >
                Bid
              </Button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default ProjectDetailsHeader;
