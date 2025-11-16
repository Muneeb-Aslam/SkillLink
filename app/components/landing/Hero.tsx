import Image from "next/image";
import hero from "@/public/hero.png";
import title from "@/public/borders-1.png";
import { Input } from "@/components/ui/input";
import search from "@/public/landing/search.svg";

export default function Hero() {
  return (
    <header className="bg-primary-background h-max w-full flex justify-center items-center">
      <div className="w-full  grid grid-cols-2 justify-center px-16 py-12">
        <div className="flex flex-col justify-start items-start gap-4 pt-12">
          <div className="w-full flex flex-col">
            <div className="text-blackish text-[3.8rem] font-bold">
              Discover Freelancing &<br></br>
              <span className="text-[#04b2b2]">Skill Link</span>
            </div>
            <Image
              src={title}
              alt="title"
              className="w-[80%] bg-no-repeat bg-cover"
            ></Image>
          </div>
          <span className="text-grayish text-md w-3/5">
            Great platform for the job seeker that are searching for freelancing
            opportunities.
          </span>
        </div>
        <Image
          src={hero}
          alt="hero"
          className="w-full bg-no-repeat bg-contain"
        ></Image>
      </div>
    </header>
  );
}
