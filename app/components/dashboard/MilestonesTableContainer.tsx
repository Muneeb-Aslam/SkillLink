"use client";
import { useState } from "react";
import { FilterIcon } from "../icons";
import Pagination from "../pagination/Pagination";
import DashboardProjectsTable from "./projects-table/DashbaordProjectsTable";
import { dummyProjects, projectTags } from "@/app/utils/data";

const MilestonesTableContainer = () => {
   const [currentPage, setCurrentPage] = useState(1);
   const pageSize = 10;
   const totalCount = 30;
   const [data, setData] = useState<IProject[]>(dummyProjects);
   const headings = [
      {
         label: "Milestone Name",
         name: "milestoneName",
      },
      {
         label: "Status",
         name: "status",
      },
      {
         label: "Date Started",
         name: "dateStarted",
      },
      {
         label: "Due Date",
         name: "dueDate",
      },
      {
         label: "Project",
         name: "project",
      },
      {
         label: "Payment",
         name: "payment",
      },
      {
         label: "Total",
         name: "total",
      },
      {
         label: "",
         name: "actions",
      },
   ];

   return (
      <section className="z-10 database-submissions-container border border-[#B9B9B9]">
         <div
            className={
               "flex items-center justify-between gap-4 border-b border-[#B9B9B9] px-4 sm:px-3 md:px-4 lg:px-6 !py-3.5"
            }
         >
            <h5 className="text-dark-blue font-semibold font-Poppins">
               Milestones
            </h5>
            {/* </Button> */}
            <button
               type="button"
               className="flex items-center gap-2 md:px-3.5 py-2 font-inter text-dark-blue border border-lightest-gray rounded transition-all duration-300"
            >
               <FilterIcon />
               <span>Filters</span>
            </button>
         </div>
         <div className={"min-h-[45vh] rounded-[10px]"}>
            <DashboardProjectsTable
               data={data}
               headings={headings}
               loading={false}
               setData={setData}
            />
            {totalCount > 0 && (
               <Pagination
                  totalCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
               />
            )}
         </div>
      </section>
   );
};

export default MilestonesTableContainer;
