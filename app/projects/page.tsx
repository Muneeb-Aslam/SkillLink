"use client";
import findYourProjectImage from "@/public/find-your-project.png";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Checkbox from "../components/Checkbox";
import ProjectItem from "../components/dashboard/project-item/ProjectItem";
import MainSearch from "../components/projects/MainSearch";
import Pagination from "../components/projects/Pagination";
import { dummyProjects, projectPriceRanges, projectTags } from "../utils/data";
import { convertPriceRangeToText } from "../utils/helpers";
import { API_PROJECTS_PATH } from "../api/api_constants";
import { headers } from "next/headers";
import Navbar from "@/components/ui/navbar";

interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = () => {
   const [searchValue, setSearchValue] = useState("");
   const [categories, setCategories] = useState<number[]>([]);
   const [priceRanges, setPriceRanges] = useState<string[]>([]);
   const [projects, setProjects] = useState<IProjectFromBackend[]>([]);
   const [allTags, setAllTags] = useState<IProjectTag[]>([]);

   const getAllProjects = async () => {
      const response = await fetch(`${API_PROJECTS_PATH}`, {
         method: "GET",
      });
      if (response.ok) {
         const data = await response.json();
         const projects = data.projects as IProjectFromBackend[];
         const tags = [
            //@ts-ignore
            ...new Set(projects.flatMap((x) => x.skills.map((x) => x.name))),
         ];
         console.log("tags in use effect", tags);
         const tagWithIds: IProjectTag[] = tags.map((t, i) => ({
            id: i,
            name: t,
            background: projectTags[i].background,
            foreground: projectTags[i].foreground,
         }));

         setProjects(
            projects.map((p) => ({
               ...p,
               //@ts-ignore
               skills: p.skills.map((skill) => tags.indexOf(skill.name)),
            }))
         );
         setAllTags(tagWithIds);
      }
   };
   useEffect(() => {
      getAllProjects();
   }, []);

   const [page, setPage] = useState<number>(0);
   const pagesPerView = 12;
   const totalPages = Math.ceil(projects.length / pagesPerView);
   const filteredProjects = useMemo(() => {
      const filteredByCategory =
         categories.length === 0
            ? projects
            : projects.filter((project) =>
                 project.skills.some((tagId) => categories.includes(tagId))
              );
      const filterByPriceRange =
         priceRanges.length === 0
            ? filteredByCategory
            : filteredByCategory.filter((project) =>
                 priceRanges.some((rangeId) => {
                    const rangeObject = projectPriceRanges.find(
                       (r) => r.id === rangeId
                    );
                    return (
                       (rangeObject!.min < project.budget.from &&
                          project.budget.from < rangeObject!.max) ||
                       (rangeObject!.min < project.budget.to &&
                          project.budget.to < rangeObject!.max)
                    );
                 })
              );
      const filterAfterSearch =
         searchValue.trim() === ""
            ? filterByPriceRange
            : filterByPriceRange.filter((project) =>
                 project.title.includes(searchValue)
              );
      console.log("search value", searchValue);
      return filterAfterSearch;
   }, [projects, categories, priceRanges, searchValue]);
   return (
      <>
         <Navbar></Navbar>
         <div className="flex flex-col bg-gray-100 w-full">
            <Image
               src={findYourProjectImage}
               className="mx-auto mt-10 mb-6"
               alt=""
            ></Image>
            <div className="text-gray-secondary text-center text-lg mb-10">
               Apply from anywhere in the world to anywhere.
            </div>
            <MainSearch
               value={searchValue}
               onChange={setSearchValue}
               onSearch={() => {}}
            ></MainSearch>
         </div>
         <div className="grid grid-cols-[13rem_auto] mx-48 py-20">
            <div className="flex flex-col gap-10">
               <div className="flex flex-col gap-5">
                  <div className="font-semibold">Categories</div>
                  {allTags.map((tag, i) => (
                     <div
                        className="flex items-center gap-4 text-neutral-80"
                        key={i}
                     >
                        <Checkbox
                           checked={categories.includes(tag.id)}
                           onChange={(checked) =>
                              checked
                                 ? setCategories([
                                      ...categories.filter(
                                         (cat) => cat !== tag.id
                                      ),
                                      tag.id,
                                   ])
                                 : setCategories(
                                      categories.filter((cat) => cat !== tag.id)
                                   )
                           }
                        ></Checkbox>
                        <div className="text-neutral-80 font-Epilogue">
                           {tag.name}
                        </div>
                     </div>
                  ))}
               </div>
               <div className="flex flex-col gap-5">
                  <div className="font-semibold">Price Range</div>

                  {projectPriceRanges.map((range, i) => (
                     <div
                        className="flex items-center gap-4 text-neutral-80"
                        key={i}
                     >
                        <Checkbox
                           checked={priceRanges.includes(range.id)}
                           onChange={(checked) =>
                              checked
                                 ? setPriceRanges([
                                      ...priceRanges.filter(
                                         (priceRange) => priceRange !== range.id
                                      ),
                                      range.id,
                                   ])
                                 : setPriceRanges(
                                      priceRanges.filter(
                                         (priceRange) => priceRange !== range.id
                                      )
                                   )
                           }
                        ></Checkbox>
                        <div className="text-neutral-80 font-Epilogue">
                           {convertPriceRangeToText(range)}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            <div className="flex flex-col gap-4">
               <div className="flex w-full justify-between">
                  <div className="flex flex-col gap-4">
                     <div className="text-4xl font-semibold">All projects</div>
                     <div className="text-neutral-100">
                        Showing {filteredProjects.length} results
                     </div>
                  </div>

                  <Pagination
                     itemsPerPage={pagesPerView}
                     page={page}
                     setPage={setPage}
                     totalItems={filteredProjects.length}
                  ></Pagination>
               </div>
               <div className="grid grid-cols-3 gap-2.5 w-full">
                  {filteredProjects
                     .slice(page * pagesPerView, (page + 1) * pagesPerView)
                     .map((p, i) => (
                        <ProjectItem allTags={allTags} project={p} key={i} />
                     ))}
               </div>
            </div>
         </div>
      </>
   );
};

export default Projects;
