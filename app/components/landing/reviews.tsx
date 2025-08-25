import React from "react";
import reviews from "./reviews.json";
import ReviewItem from "./reviewitem";

const Reviews: React.FC = () => {
  return (
    <section
      className="w-full  h-max flex flex-col justify-start items-start gap-6 px-16 py-12 "
      id="reviews"
    >
      <div className="w-full flex justify-between items-center">
        <div className="text-blackish font-bold text-3xl">
          What <span className="text-blue">Everyone</span> says
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-8 justify-center grid-rows-auto">
        {!!reviews &&
          reviews.map((itm, index) => <ReviewItem key={index} itm={itm} />)}
      </div>
    </section>
  );
};

export default Reviews;
