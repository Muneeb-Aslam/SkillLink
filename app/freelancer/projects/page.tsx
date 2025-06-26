import DashboardNavbar from "@/components/ui/dashboardnav";
import Footer from "@/components/ui/footer";
import { API_PROJECTS_PATH } from "@/app/api/api_constants";
import Projects from "./projects";
import { headers } from "next/headers";


export default async function ProfilePage() {
  var projects = [];
  const response = await fetch(`${API_PROJECTS_PATH}`, {
    method: "GET",
    headers: new Headers(headers()),
  });
  if (response.ok) {
    const data = await response.json();
    projects = data.projects;
    
  }
  return (
    <>
      <DashboardNavbar />
      <Projects projectList={projects}/>
      <Footer />
    </>
  );
}
