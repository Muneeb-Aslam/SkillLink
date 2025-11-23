import React from "react";
import SkillItem from "./skillitem";
import CategoryItem from "./categoryitem";
import Link from "next/link";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { API_RELEASE_PATH } from "@/app/api/api_constants";
import toast from "react-hot-toast";

const ProjectInfo: React.FC<{ project: any }> = ({ project }) => {
  const downloadFiles = () => {
    project?.submittedFiles.forEach((url) => {
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const releasePayment = async (amount: any) => {
    try {
      const response = await fetch(`${API_RELEASE_PATH}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, id: project.freelancerId }),
      });
      const res = await response.json();
      if (response?.ok) {
        toast.success("Successfully Release a payment");
      } else {
        toast.error("Could not release a payment");
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <main className="w-full flex flex-col justify-start items-start gap-4">
      <div className="flex justify-start items-start gap-2">
        <Link
          href="detail"
          className="bg-blue text-white w-max px-4 py-2 rounded-none font-bold"
        >
          Project Info
        </Link>
        <Link
          href="bids"
          className="bg-[#E9EBFD] text-blue w-max px-4 py-2 rounded-none font-bold hover:bg-blue hover:text-white"
        >
          Bids
        </Link>
      </div>
      <section className="w-full flex flex-col justify-start items-start gap-6">
        {/* 1st Sections */}
        <div className="w-full flex flex-col justify-start items-start gap-4">
          <div className="w-full flex flex-col justify-start items-start gap-4 py-6">
            <h3 className="text-blackish font-bold text-2xl">
              About this Role
            </h3>
            <div className="w-full flex justify-start items-start gap-4">
              <span className="text-blackish text-md font-bold">
                Job Posted on
              </span>
              <span className="text-normal text-md font-semibold">
                {moment(new Date(project.createdAt)).format("MMM DD")}
              </span>
            </div>
            <div className="w-full flex justify-start items-start gap-4">
              <span className="text-blackish text-md font-bold">Range</span>
              <span className="text-normal text-md font-semibold">
                ${project.budget.from} - ${project.budget.to}
              </span>
            </div>
          </div>
          <div>
            {project?.submittedFiles?.length > 0 && (
              <Button className="w-max" onClick={downloadFiles}>
                Download Submitted Files
              </Button>
            )}
          </div>
          <hr className="w-full h-2 text-normal opacity-40" />
        </div>

        {/* 2nd Section */}
        <div className="flex flex-col justify-start items-start gap-4">
          <div className="flex flex-col justify-start items-start gap-4 py-6">
            <h3 className="text-blackish font-bold text-2xl">Description</h3>
            <p className="text-normal font-semibold text-md">
              {project.description}
            </p>
          </div>
          <hr className="w-full h-2 text-normal opacity-40" />
        </div>

        {/* Categories */}
        <div className="h-max w-full flex flex-col justify-between items-start gap-4 py-6">
          <div className="w-full flex justify-between items-center">
            <h3 className="text-blackish font-bold text-xl">Categories</h3>
          </div>
          <div className="flex justify-start items-center gap-2 flex-wrap">
            {!!project &&
              project?.categories?.map((itm: any, index: any) => {
                return <CategoryItem key={index} itm={itm} />;
              })}
          </div>
        </div>
        <hr className="w-full h-2 text-normal opacity-40" />
        {/* Required Skills */}
        <div className="h-max w-full flex flex-col justify-between items-start gap-4 py-4">
          <div className="w-full flex justify-between items-center">
            <h3 className="text-blackish font-bold text-xl">Required Skills</h3>
          </div>
          <div className="flex justify-start items-center gap-2 flex-wrap">
            {!!project &&
              project?.skills?.map((itm: any, index: number) => {
                return <SkillItem key={index} itm={itm} />;
              })}
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-4">
          <div className="w-full flex justify-start items-start gap-8 flex-grow flex-wrap">
            {project?.milestones?.map((field: any, index: number) => (
              <div
                key={index}
                className="w-full flex flex-col justify-start items-center gap-2"
              >
                <div className="w-full flex justify-between items-start pr-10">
                  <span className="text-grayish text-sm font-semibold">
                    Milestone # {index + 1}
                  </span>
                </div>
                <div className="w-full flex justify-start items-center gap-4">
                  <span className="bg-contrast w-max h-max px-4 py-2 text-md font-bold rounded-[4px] text-blackish hover:bg-blue hover:text-white">
                    {field?.name}
                  </span>
                  <span className="bg-contrast w-max h-max px-4 py-2 text-md font-bold rounded-[4px] text-blackish hover:bg-blue hover:text-white">
                    ${field?.price}
                  </span>
                  <span className="bg-contrast w-max h-max px-4 py-2 text-md font-bold rounded-[4px] text-blackish hover:bg-blue hover:text-white">
                    {field?.deadline} days
                  </span>
                  {project.submittedFiles?.length > 0 && (
                    <span
                      className="bg-blue w-max h-max px-4 py-2 text-md font-bold text-white cursor-pointer"
                      onClick={() => releasePayment(field?.price)}
                    >
                      Release Payment
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectInfo;
