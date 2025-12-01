"use client";
import { API_PROJECTS_PATH } from "@/app/api/api_constants";
import DashboardNavbar from "@/components/ui/dashboardnav";
import Footer from "@/components/ui/footer";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProjectInfo from "@/app/[role]/[userId]/[projectId]/detail/projectinfo";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function AdminProjectDetail() {
  const params = useParams();
  const { projectId } = params;
  const [project, setProject] = useState(null);
  const session = useSession();
  const user = session?.data?.user;

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
  }, [projectId]);

  return (
    <>
      {!!project && (
        <>
          <DashboardNavbar />
          <div className="w-full bg-primary-background flex justify-center items-center py-4">
            <div className="w-full max-w-[1300px] px-16">
              <Link
                href="/admin/projects"
                className="text-blue hover:underline font-semibold"
              >
                ← Back to Projects
              </Link>
            </div>
          </div>
          <section className="w-full bg-white flex justify-center items-center">
            <div className="w-full h-max flex flex-col justify-start items-start gap-6 px-16 py-12">
              <ProjectInfo project={project} role="admin" />
            </div>
          </section>
          <Footer />
        </>
      )}
    </>
  );
}

