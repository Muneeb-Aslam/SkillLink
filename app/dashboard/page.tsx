import DashboardNavbar from "@/components/ui/dashboardnav";
import CurrentProjectsItem from "../components/dashboard/CurrentProjectsItem";
import NumberCard from "../components/dashboard/NumberCard";
import ProjectItem from "../components/dashboard/project-item/ProjectItem";
import {
   AssistantIcon,
   DocumentIcon,
   DoubleSheetIcon,
   QuestionMarkDocumentIcon,
   SaasIcon,
} from "../components/icons";
import { dummyProjects } from "../utils/data";
import Footer from "@/components/ui/footer";

const Dasbhoard = () => {
   const numberedData = [
      {
         id: 0,
         name: "Total Milestones",
         value: 45,
         icon: <DocumentIcon />,
         backgroundColor: "#E7F9FF",
         textColor: "#167EE6",
      },
      {
         id: 1,
         name: "Total Projects",
         value: 4,
         icon: <QuestionMarkDocumentIcon />,
         backgroundColor: "#EBFFF1",
         textColor: "#12B347",
      },
      {
         id: 2,
         name: "Unread Messages",
         value: 1,
         icon: <QuestionMarkDocumentIcon className="!text-[#D93F21]" />,
         backgroundColor: "#FFEDEA",
         textColor: "#D93F21",
      },
   ];
   const currentProjects = [
      {
         id: 0,
         name: "Landing page Development with Sass",
         price: 500,
         location: "New York, USA",
         type: "hourly",
         deadline: "28 Aug 2024",
         icon: <SaasIcon />,
      },
      {
         id: 1,
         name: "Social Media Assistant",
         price: 500,
         location: "Madrid, Spain",
         type: "fixed price",
         deadline: "15 Sept 2024",
         icon: <AssistantIcon />,
      },
      {
         id: 2,
         name: "Landing page Development with Sass",
         price: 500,
         location: "New York, USA",
         type: "hourly",
         deadline: "28 Aug 2024",
         icon: <DoubleSheetIcon />,
      },
   ];
   return (
      <>
         <div>
            <h2 className="text-2xl text-dark-blue font-semibold font-Poppins">
               Good morning, Muneeb
            </h2>
            <p className="text-light-gray font-medium">
               Mauris consequat, cursus pharetra et, habitasse rhoncus quis odio
               ac.{" "}
            </p>
            <div className="flex gap-3 mt-4 lg:mt-6 w-full">
               <ul className="flex flex-col gap-2 sm:gap-4">
                  {numberedData.map((data, index) => (
                     <NumberCard
                        key={data.id}
                        label={data.name}
                        value={data.value}
                        icon={data.icon}
                        backgroundColor={data.backgroundColor}
                        textColor={data.textColor}
                     />
                  ))}
               </ul>
               <div className="border border-lightest-gray w-full">
                  <h2 className="px-5 py-6 border-b border-lightest-gray text-dark-blue font-semibold font-Epilogue">
                     Current Projects
                  </h2>
                  <ul className="flex flex-col px-5 py-6 w-full [&>*:nth-child(odd)]:bg-primary-background">
                     {currentProjects.map((project, index) => (
                        <CurrentProjectsItem
                           key={project.id}
                           name={project.name}
                           price={project.price}
                           location={project.location}
                           type={project.type}
                           deadline={project.deadline}
                           icon={project.icon}
                        />
                     ))}
                  </ul>
               </div>
            </div>
            <div className="text-4xl my-8 mt-16 font-bold font-Inter">
               Recent Projects
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
               {dummyProjects.slice(0, 4).map((project, index) => (
                  <ProjectItem key={index} project={project}></ProjectItem>
               ))}
            </div>
            <div className="bg-main-500 text-center mt-4 cursor-pointer text-white py-3 px-10">
               View All Projects
            </div>
         </div>
         <Footer />
      </>
   );
};

export default Dasbhoard;
