"use client";
import { useState } from "react";

const BidsDropdown = ({
   selectedBids,
   setSelectedBids,
   setAmount,
}: {
   selectedBids: number;
   setSelectedBids: React.Dispatch<React.SetStateAction<number>>;
   setAmount: React.Dispatch<React.SetStateAction<number>>;
}) => {
   const [showDropdown, setShowDropdown] = useState(false);
   const bids = [50, 60, 70, 80, 90, 100, 200, 300];

   const onClickHandler = (bid: number) => {
      setSelectedBids(bid);
      setAmount(bid / 5);
      setShowDropdown(false);
   };

   const toggleDropdown = () => {
      setShowDropdown((prev) => !prev);
   };

   return (
      <div className="relative">
         <span
            className="border rounded-xl py-2 px-4 cursor-pointer"
            onClick={toggleDropdown}
         >
            Selected Bids: {selectedBids}
         </span>
         {showDropdown && (
            <ul
               className="absolute right-0 top-9 w-full bg-white flex flex-col justify-start items-start gap-4 h-max p-4 rounded-lg shadow-xl z-10 border"
               onBlur={() => setShowDropdown(false)}
               tabIndex={1}
            >
               {bids.map((bid, index) => (
                  <li
                     key={index}
                     className="cursor-pointer text-black font-bold text-md hover:text-blue w-full"
                     onClick={() => onClickHandler(bid)}
                  >
                     {bid}
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
};

export default BidsDropdown;
