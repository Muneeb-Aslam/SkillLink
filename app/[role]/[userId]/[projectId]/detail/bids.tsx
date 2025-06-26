/* eslint-disable react/jsx-key */
"use client";

import Link from "next/link";
import React from "react";
import BidItem from "./biditem";
import { useSession } from "next-auth/react";

const Bids: React.FC<{ bids: any }> = ({ bids }) => {
   const session = useSession();
   const user = session?.data?.user;

   return (
      <main className="w-full flex flex-col justify-start items-start gap-4">
         <div className="flex justify-start items-start gap-2">
            <Link
               href="detail"
               className="bg-[#E9EBFD] text-blue w-max px-4 py-2 rounded-none font-bold"
            >
               Project Info
            </Link>
            <Link
               href="bids"
               className="bg-blue text-white w-max px-4 py-2 rounded-none font-bold"
            >
               Bids
            </Link>
         </div>
         <div className="w-full flex flex-col justify-start items-start gap-6">
            {bids && bids?.length > 0 ? (
               bids.map((bid: any) => (
                  <BidItem
                     role={user?.role}
                     name={bid.name}
                     price={bid.amount}
                     description={bid.description}
                     projectId={bid.projectId}
                     userId={user?.id}
                     freelancerId={bid.freelancerId}
                  />
               ))
            ) : (
               <span className="text-grayish font-semibold w-max px-4 py-2 rounded-none">
                  No Bids to show.
               </span>
            )}
         </div>
      </main>
   );
};

export default Bids;
