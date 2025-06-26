import Image from "next/image";
import React from "react";
import image1 from "@/public/projects/project1.png"

interface props {
  name: string;
  image: string;
}

const ProjectItem: React.FC<props> = ({ name, image }) => {
  return (
    <div className="w-[250px] h-[250px] flex flex-col justify-start items-start gap-4">
      <Image src={image1} alt="projects" className="w-full h-[70%] bg-no-repeat bg-cover"/>
      <span className="text-blackish font-bold text-md">{name}</span>
    </div>
  );
};

export default ProjectItem;
