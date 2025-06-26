import React from "react";
import Image from "next/image";
import addicon from "@/public/addicon.svg";
import projects from "./projects.json";
import ProjectItem from "./projectitem";

const Portfolio: React.FC = () => {
  return (
    <section className="p-6 border-[1.5px] border-primary flex flex-col justify-between gap-4  max-w-[60%] w-full">
      <div className="flex justify-between items-center">
        <h3 className="text-blackish font-bold text-xl">Portfolio</h3>
        <div className="border-[1.5px] border-primary w-8 h-8 bg-white">
          <label
            htmlFor="editsocial"
            className="flex justify-center items-center"
          >
            <Image
              src={addicon}
              alt="editsocial"
              className="fill-blue flex justify-center items-center h-full w-full"
            ></Image>
          </label>
          <input type="file" className="sr-only" id="editsocial" />
        </div>
      </div>
      <div className="w-full flex justify-start items-start gap-4">
        {!!projects &&
          projects.map((itm, index) => (
            <ProjectItem key={index} name={itm.name} image={itm.image} />
          ))}
      </div>
    </section>
  );
};

export default Portfolio;
