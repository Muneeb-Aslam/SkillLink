import Image from "next/image";
import React from "react";
import arrow from "@/public/landing/arrow.svg";
import categories from "./categories.json";
import CategoryItem from "./categoryitem";

const Category: React.FC = () => {
   return (
      <section
         className="w-full bg-white flex justify-center items-center"
         id="categories"
      >
         <div className="w-full  h-max flex flex-col justify-start items-start gap-6 px-16 py-12">
            <div className="w-full flex justify-between items-center">
               <div className="text-blackish font-bold text-3xl">
                  Explore by <span className="text-blue">category</span>
               </div>
               <div className="text-blue text-lg font-bold flex gap-2 justify-center items-center">
                  <span>Show all projects</span>
                  <Image
                     src={arrow}
                     alt="arrow"
                     className="w-[24px] h-[24px] fill-blue"
                  ></Image>
               </div>
            </div>
            <div className="w-full grid grid-cols-4 gap-4 justify-center">
               {!!categories &&
                  categories.map((itm, index) => (
                     <CategoryItem key={index} itm={itm} />
                  ))}
            </div>
         </div>
      </section>
   );
};

export default Category;
