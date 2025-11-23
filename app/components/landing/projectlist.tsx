import Image from "next/image";
import React from "react";

interface props {
  name: string;
  budget: string;
  city: string;
  country: string;
  icon: string;
  description: string;
}
const ProjectList: React.FC<{ itm: props }> = ({ itm }) => {
  return (
    <div
      className="w-full h-[210px] border border-landing-border rounded-xl bg-white shadow-sm 
flex flex-col justify-start items-start gap-2 py-2 px-6
hover:scale-[1.02] transition-all duration-200 ease-in-out"
    >
      <div className="w-full flex justify-between items-center">
        <Image
          src={itm.icon}
          width={30}
          height={30}
          alt="icon"
          className="rounded-[50%]"
        ></Image>
        <span className="w-max h-max p-2 border-[1.5px] border-blue text-blue font-bold">
          {itm.budget}
        </span>
      </div>
      <span className="text-blackish font-bold text-lg w-full">{itm.name}</span>
      <div className="w-full flex justify-start items-start gap-1">
        <span className="text-grayish font-semibold text-sm">
          {itm.city} -{" "}
        </span>
        <span className="text-grayish font-semibold text-sm">
          {itm.country}
        </span>
      </div>
      <p className="text-start break-words text-grayish font-light text-sm">
        {itm.description}
      </p>
    </div>
  );
};

export default ProjectList;
