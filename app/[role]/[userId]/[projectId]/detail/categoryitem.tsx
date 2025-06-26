import React from "react";
interface props {
  key: number;
  itm: { name: string };
}

const CategoryItem: React.FC<props> = ({ itm }) => {
  return (
    <span className="bg-[#E9EBFD] w-max h-max px-4 py-2 text-md font-bold text-blue">
      {itm?.name}
    </span>
  );
};

export default CategoryItem;
