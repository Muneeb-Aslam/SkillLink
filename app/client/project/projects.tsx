"use client";
import { useState, useEffect } from "react";
import ProjectItem from "./projectitem";
import Pagination from "../../components/projects/Pagination";

interface ProjectsProps {
  projectList: any;
}

const Projects: React.FC<ProjectsProps> = ({ projectList }) => {
  console.log("projectList received:", projectList);

  const [projects, setProjects] = useState<any[]>(
    Array.isArray(projectList) ? projectList : []
  );

  useEffect(() => {
    console.log("Updating projects state from prop:", projectList);
    setProjects(Array.isArray(projectList) ? projectList : []);
  }, [projectList]);

  const [page, setPage] = useState<number>(0);
  const pagesPerView = 6;
  const totalPages = Math.ceil(projects.length / pagesPerView);
  return (
    <>
      <div className="w-full flex flex-col justify-start items-start px-28 py-20">
        <div className="flex flex-col gap-4">
          <div className="flex w-full justify-between">
            <div className="flex flex-col gap-4">
              <div className="text-4xl font-semibold">Current projects</div>
              <div className="text-neutral-100">
                Showing {projects.length} results
              </div>
            </div>

            <Pagination
              itemsPerPage={pagesPerView}
              page={page}
              setPage={setPage}
              totalItems={projects.length}
            ></Pagination>
          </div>
          <div className="grid grid-cols-3 gap-2.5 w-full">
            {projects
              .slice(page * pagesPerView, (page + 1) * pagesPerView)
              .map((p) => (
                <ProjectItem project={p}></ProjectItem>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
