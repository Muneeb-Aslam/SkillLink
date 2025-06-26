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
      className="grid py-4 px-6 grid-rows-[min-content_min-content_auto_min-content] gap-3 rounded border border-border-gray w-full"
      href={`/freelancer/project/${project._id}`}
    >
      <div className="flex justify-between w-full">
        <div className="font-medium text-gray-primary font-Inter">
          {project.title}
        </div>
        <div className="text-gray-secondary text-xs">
          {moment(new Date(project.createdAt)).format("MMM DD")}
        </div>
      </div>
      <div className="text-sm text-gray-secondary h-60 flex-grow">
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
