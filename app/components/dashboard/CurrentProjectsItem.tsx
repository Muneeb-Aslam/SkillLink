import { ThreeDotIcon } from "../icons";

import type { JSX } from "react";

interface CurrentProjectsItemProps {
    name: string;
    price: number;
    location: string;
    type: string;
    deadline: string;
    icon: JSX.Element;
}

const CurrentProjectsItem = ({ name, price, location, type, deadline }: CurrentProjectsItemProps) => {
  return (
    <li className="grid grid-cols-3 items-center justify-center gap-8 p-6 w-full rounded-lg">
        <div className="flex flex-col w-full text-start">
            <h3 className="text-xl text-dark-blue font-semibold font-Poppins">{name}</h3>
            <ul className="flex gap-2 items-center">
                <li className="text-sm text-light-gray">${price}</li>
                <li className="flex items-center gap-2 text-sm text-light-gray">
                    <div className="h-1.5 w-1.5 bg-[#A8ADB7] rounded-full"/>
                    <span>{location}</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-light-gray">
                    <div className="h-1.5 w-1.5 bg-[#A8ADB7] rounded-full"/>
                    <span>{type}</span>
                </li>
            </ul>
        </div>
        <div className="flex flex-col justify-between gap-4 w-full font-Epilogue text-center">
            <span className="text-lg text-dark-blue font-medium">Deadline</span>
            <span className="text-light-gray">{deadline}</span>
        </div>
        <div className="text-end">
            <ThreeDotIcon />
        </div>
    </li>
  )
}

export default CurrentProjectsItem
