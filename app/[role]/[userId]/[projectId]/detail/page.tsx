"use client";
import { API_PROJECTS_PATH } from "@/app/api/api_constants";
import ProjectDetailsHeader from "@/app/freelancer/components/project/ProjectDetailsHeader";
import DashboardNavbar from "@/components/ui/dashboardnav";
import Footer from "@/components/ui/footer";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProjectInfo from "./projectinfo";

export default function PostProject() {
   const params = useParams();
   const { role, userId, projectId } = params;
   const [project, setProject] = useState(null);
   useEffect(() => {
      const fetchProject = async () => {
         const response = await fetch(`${API_PROJECTS_PATH}`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(projectId),
         });
         if (response.ok) {
            const data = await response.json();
            setProject(data.projects);
         }
      };
      fetchProject();
   }, [role, userId, projectId]);
   return (
      <>
         {!!project && (
            <>
               <DashboardNavbar />
               <ProjectDetailsHeader role={role} bid project={project} />
               <section className="w-full bg-white flex justify-center items-center">
                  <div className="w-full  h-max flex flex-col justify-start items-start gap-6 px-16 py-12">
                     <ProjectInfo project={project} />
                  </div>
               </section>
               <Footer />
            </>
         )}
      </>
   );
}
