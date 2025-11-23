import React from "react";
interface props {
  key: number;
  itm: { name: string };
}

const CategoryItem: React.FC<props> = ({ itm }) => {
  return (
    <span className="bg-contrast w-max h-max px-4 py-2 text-md font-bold rounded-[4px] text-blackish hover:bg-blue hover:text-white">
      {itm?.name}
    </span>
  );
};

export default CategoryItem;
