import Image from "next/image";
import React from "react";

interface props {
  icon: string;
  name: string;
  projectAvailable: number;
}
const CategoryItem: React.FC<{ itm: props }> = ({ itm }) => {
  return (
    <div className=" h-[150px] border-2 border-landing-border flex flex-col justify-start items-start gap-4 py-2 px-6">
      <Image
        src={itm.icon}
        alt="category"
        width={40}
        height={40}
        className="text-blue"
      ></Image>
      <span className="text-md font-bold text-blackish">{itm.name}</span>
      <span className="text-md font-bold text-grayish">
        {itm.projectAvailable} Projects Available
      </span>
    </div>
  );
};

export default CategoryItem;
