import Image from "next/image";
import React from "react";
import getting from "@/public/landing/dashboard.png";
import Link from "next/link";

const GettingStart: React.FC = () => {
   return (
      <section className="w-full  h-max flex flex-col justify-center items-center px-16 py-12">
         <div className="w-full bg-getting-start rounded-tl-[30%] rounded-br-[30%] flex justify-between items-center p-6">
            <div className="flex flex-col justify-start items-start gap-4 px-8">
               <span className="text-[2.5rem] text-white font-bold">
                  Start posting project today
               </span>
               <span className="text-xl text-white font-bold">
                  Start posting project for free
               </span>
               <Link
                  href="/register"
                  className="text-lg bg-white text-getting-start font-bold px-6 py-2"
               >
                  Sign up for free
               </Link>
            </div>
            <Image src={getting} alt="image" className=""></Image>
         </div>
      </section>
   );
};

export default GettingStart;
