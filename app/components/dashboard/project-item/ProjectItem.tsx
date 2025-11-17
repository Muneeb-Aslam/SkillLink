import { projectTags } from "@/app/utils/data";
import moment from "moment";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface ProjectItemProps {
  project: IProjectFromBackend;
  allTags: IProjectTag[];
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, allTags }) => {
  const tags = project.skills.map((tagId) =>
    allTags.find((tag) => tag.id === tagId)
  );
  console.log(tags, "tags in project item");
  const session = useSession();
  const user = session.data?.user;

  return (
    <div className="grid py-4 px-6 grid-rows-[min-content_min-content_auto_min-content] gap-3 rounded border border-border-gray w-full">
      <div className="flex justify-between w-full">
        <div className="flex gap-3">
          {tags.map((tag, i) => (
            <div
              key={i}
              className="py-1 px-1.5 font-medium text-xs rounded"
              style={{
                backgroundColor: tag?.background,
                color: tag?.foreground,
              }}
            >
              {tag?.name || ""}
            </div>
          ))}
        </div>
        <div className="text-gray-secondary text-xs">
          {moment(new Date((project as any)._createAt)).format("MMM DD hh:mm")}
        </div>
      </div>
      <div className="font-medium text-gray-primary font-Inter">
        {project.title}
      </div>
      <div className="text-sm text-gray-secondary mb-4 flex-grow">
        {project.description}
      </div>
      <div className="py-4 border-t border-gray-border flex items-center justify-between">
        <div className="text-gray-secondary font-medium">
          ${project.budget.from}-${project.budget.to}
        </div>

        <Link href={`/${user?.role}/${user?.id}/${project._id}/detail`}>
          <div className="cursor-pointer px-10 py-2  border-main-500 border text-main-500 text-sm transition-all duration-150 hover:bg-main-500 hover:text-white rounded font-semibold font-Inter">
            Apply Now
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProjectItem;
