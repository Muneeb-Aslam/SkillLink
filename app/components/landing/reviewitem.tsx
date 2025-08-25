import Image from "next/image";
import React from "react";

interface props {
  name: string;
  position: string;
  image: string;
  review: string;
}
const ReviewItem: React.FC<{ itm: props }> = ({ itm }) => {
  return (
    <div className="h-[230px] flex flex-col justify-center items-start gap-4 py-2 px-6 shadow-xl rounded-2xl">
      <p className="text-sm text-blackish">{itm.review}</p>
      <div className="flex justify-start gap-2">
        <Image
          src={itm.image}
          alt="profile"
          width={50}
          height={30}
          className="w-[50px] h-[50px] rounded-[50%]"
        ></Image>
        <div className="flex flex-col justify-start items-start gap-1">
          <span className="text-sm text-blackish font-bold">{itm.name}</span>
          <span className="text-sm text-blackish">{itm.position}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
