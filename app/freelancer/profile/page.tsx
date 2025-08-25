import DashboardNavbar from "@/components/ui/dashboardnav";
import Footer from "@/components/ui/footer";
import About from "./about";
import Header from "./header";
import Portfolio from "./portfolio";
import Skills from "./skills";
import SocialLinks from "./sociallinks";
import { API_FREELANCER_PROFILE_PATH } from "@/app/api/api_constants";
import { headers } from "next/headers";

export default async function ProfilePage() {
  var profileData = {};
  const response = await fetch(`${API_FREELANCER_PROFILE_PATH}`, {
    method: "GET",
    headers: new Headers(await headers()),
  });
  if (response.ok) {
    const data = await response.json();
    profileData = data.data;
  }

  return (
    <>
      <DashboardNavbar />
      <Header data={profileData} />
      <div className="py-8 px-16 w-full flex justify-between items-start gap-4">
        <About data={profileData} />
        <SocialLinks data={profileData} />
      </div>
      <Skills data={profileData} />
      <Footer />
    </>
  );
}
