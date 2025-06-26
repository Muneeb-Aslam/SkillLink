"use client";
import DashboardNavbar from "@/components/ui/dashboardnav";

import { API_FREELANCER_BUY_BIDS_PATH } from "@/app/api/api_constants";
import BidsDropdown from "@/components/bids-buy/BidsDropdown";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import { useState } from "react";

const BuyBids = () => {
   const [selectedBids, setSelectedBids] = useState(0);
   const [availableBids, setAvailableBids] = useState(40);

   const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const response = await fetch(`${API_FREELANCER_BUY_BIDS_PATH}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ bids: selectedBids }),
      });

      if (response.ok) {
         const data = await response.json();
         setAvailableBids(data.data.bids);
      }
   };

   return (
      <>
         <DashboardNavbar />
         <section className="w-full bg-white flex justify-center items-center">
            <div className="w-full  h-max flex flex-col justify-start items-start gap-6 px-16 py-12">
               <span className="text-blackish font-bold text-2xl">
                  Buy bids
               </span>
               <hr className="w-full" />
               <div className="flex flex-col justify-start items-start gap-1">
                  <span className="text-blackish font-bold text-md">
                     Available Bids
                  </span>
                  <span className="text-grayish font-bold text-sm">
                     You have {availableBids} bids available
                  </span>
               </div>
               <hr className="w-full" />
               <form
                  onSubmit={onSubmitHandler}
                  className="w-full flex flex-col justify-start items-start gap-4"
               >
                  <div className="w-full flex justify-start items-start gap-12">
                     <div className="w-1/3 flex flex-col justify-start items-start gap-1">
                        <span className="text-blackish font-bold text-md">
                           Amount to buy
                        </span>
                        <span className="text-grayish font-bold text-sm">
                           Your new bids balance will be{" "}
                           {availableBids + selectedBids}
                        </span>
                     </div>
                     <div className="flex items-center gap-4">
                        <BidsDropdown
                           selectedBids={selectedBids}
                           setSelectedBids={setSelectedBids}
                        />
                        <span className="text-grayish font-bold text-sm ml-2 outline-blue ring-blue">
                           Amount to buy: ${selectedBids / 10}
                        </span>
                     </div>
                  </div>
                  <hr className="w-full" />
                  <div className="w-full flex justify-start items-center gap-12">
                     <div className="w-1/3 flex flex-col justify-start items-start gap-1">
                        <span className="text-blackish font-bold text-md">
                           Expiration
                        </span>
                        <span className="text-grayish font-bold text-sm">
                           You bids will expire on
                        </span>
                     </div>
                     <div className="flex justify-start items-center gap-4">
                        <span className="text-blackish font-bold text-md">
                           {new Date(
                              new Date().setDate(new Date().getDate() + 30)
                           ).toDateString()}
                        </span>
                     </div>
                  </div>

                  <hr className="w-full" />
                  <div className="flex items-center self-end gap-4">
                     <button
                        type="button"
                        className="text-blue px-4 py-2 rounded-none font-bold"
                     >
                        Cancel
                     </button>
                     <Button>Buy bids</Button>
                  </div>
               </form>
            </div>
         </section>
         <Footer />
      </>
   );
};

export default BuyBids;
