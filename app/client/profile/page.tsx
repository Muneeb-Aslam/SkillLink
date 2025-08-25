import DashboardNavbar from "@/components/ui/dashboardnav";
import Footer from "@/components/ui/footer";
import Header from "./header";
import SocialLinks from "./sociallinks";
import About from "./about";
import AdditionalProfile from "./additionalprofile";
import { API_CLIENT_PROFILE_PATH } from "@/app/api/api_constants";
import { headers } from "next/headers";

export default async function ProfilePage() {
   var profileData = {};
   const response = await fetch(`${API_CLIENT_PROFILE_PATH}`, {
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
         <div className="py-8 px-16 w-full flex justify-between items-start gap-4 ">
            <AdditionalProfile data={profileData} />
            <SocialLinks data={profileData} />
         </div>
         <About data={profileData} />
         <Footer />
      </>
   );
}
