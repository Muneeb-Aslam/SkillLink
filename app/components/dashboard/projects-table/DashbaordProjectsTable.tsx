import { useEffect, useState } from "react";

import { sortDataByFields } from "@/app/utils/sortDataByFields";
import { TableSpinner } from "../../icons";
import MilestonesTableHead from "./DashboardProjectsTableHead";
import MilestonesTableRow from "./DashboardProjectsTableRow";

export default function DashboardProjectsTable({
   headings,
   data,
   setData,
   loading,
   headClass,
   headingClass,
   dataClass,
   emptyContent,
}: {
   headings: ITableHeadings[];
   data: any[];
   setData?: React.Dispatch<React.SetStateAction<any[]>>;
   loading: boolean;
   headClass?: string;
   headingClass?: string;
   dataClass?: string;
   emptyContent?: React.ReactNode;
}) {
   const [sortingCriteria, setSortingCriteria] = useState<ISortingCriteria[]>(
      []
   );

   const updateSortingCriteria = (fieldName: string) => {
      setSortingCriteria((prevSortingCriteria) => {
         // Checking if the fieldName already exists in the sorting criteria
         const existingCriteriaIndex = prevSortingCriteria.findIndex(
            (criteria) => criteria.fieldName === fieldName
         );

         if (existingCriteriaIndex !== -1) {
            // If it exists, toggling its type between 'asc' and 'desc'
            return prevSortingCriteria.map((criteria, index) => {
               if (index === existingCriteriaIndex) {
                  return {
                     ...criteria,
                     type: criteria.type === "asc" ? "desc" : "asc",
                  };
               }
               return criteria;
            });
         } else {
            // If it does not exist, adding a new sorting criteria
            return [...prevSortingCriteria, { fieldName, type: "desc" }];
         }
      });
   };

   useEffect(() => {
      const sortedData = sortDataByFields(data, sortingCriteria);
      if (setData) {
         setData(sortedData);
      }
   }, [sortingCriteria]);

   return (
      <table className="divide-y divide-[#1D2939] w-full">
         <MilestonesTableHead
            headings={headings}
            headingClass={headingClass}
            headClass={headClass}
            sortingCriteria={sortingCriteria}
            updateSortingCriteria={updateSortingCriteria}
         />
         <tbody className="relative w-full">
            {loading ? (
               <TableSpinner
                  rowClass="!static !table-row text-center !h-[50vh]"
                  dataClass="!h-[40vh]"
                  colSpan={headings.length}
               />
            ) : (
               data?.length !== 0 &&
               !loading &&
               data?.map((item, index) => (
                  <MilestonesTableRow
                     item={item}
                     key={item.role || item.name || item.userId || item.id}
                     isLast={index === data.length - 1}
                     index={index}
                     headings={headings}
                     dataClass={dataClass}
                  />
               ))
            )}
            {data?.length === 0 && !loading && (
               <tr className="table-row min-h-[40vh]">
                  <td
                     className="text-center h-[40vh] m-auto"
                     colSpan={headings.length}
                  >
                     {emptyContent || "No data available"}
                  </td>
               </tr>
            )}
         </tbody>
      </table>
   );
}
