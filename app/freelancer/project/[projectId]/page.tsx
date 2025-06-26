"use client";
import { API_PROJECTS_PATH } from "@/app/api/api_constants";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SubmitWork from "../../submit-work/page";

export default function PostProject() {
  const params = useParams();
  const { projectId } = params;
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
  }, [projectId]);
  
  return (
    <>
      {project && (
        <>
          <SubmitWork proj={project}/>
        </>
      )}
    </>
  );
}
