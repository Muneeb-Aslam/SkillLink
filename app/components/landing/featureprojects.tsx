import React from "react";
import projects from "./projects.json";
import ProjectList from "./projectlist";
import arrow from "@/public/landing/arrow.svg";
import Image from "next/image";

const FeatureProjects = () => {
  return (
    <section
      className="w-full  h-max flex flex-col justify-start items-start gap-6 px-16 py-12"
      id="projects"
    >
      <div className="w-full flex justify-between items-center">
        <div className="text-blackish font-bold text-3xl">
          Featured <span className="text-blue">projects</span>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 gap-4 justify-center">
        {!!projects &&
          projects.map((itm, index) => <ProjectList key={index} itm={itm} />)}
      </div>
    </section>
  );
};

export default FeatureProjects;
