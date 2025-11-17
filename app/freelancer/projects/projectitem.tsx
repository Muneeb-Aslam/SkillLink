"use client";
import moment from "moment";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface ProjectItemProps {
  project: IProject;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const session = useSession();
  const user = session?.data?.user;

  return (
    <Link
      className="grid py-4 px-6 grid-rows-[min-content_min-content_auto_min-content] gap-3  border-border-gray w-full bg-white  shadow-lg rounded-lg border-[1.5px] border-[#f8f4f4f1]"
      href={`/${user?.role}/${user?.id}/${project._id}/detail`}
    >
      <div className="flex justify-between w-full">
        <div className="font-medium text-gray-primary font-Inter">
          {project.title}
        </div>
        <div className="text-gray-secondary text-xs">
          {moment(new Date(project.createdAt)).format("MMM DD")}
        </div>
      </div>
      <div className="text-sm  text-gray-secondary h-60 overflow-auto flex-grow">
        {project.description}
      </div>
      <div className="py-4 border-t border-gray-border flex items-center justify-between">
        <div className="text-gray-secondary font-medium">
          ${project.budget.from} - ${project.budget.to}
        </div>
      </div>
    </Link>
  );
};

export default ProjectItem;
