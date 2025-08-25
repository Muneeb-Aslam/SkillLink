import Image from "next/image";
import logo from "@/public/logo.png";
import Twitter from "@/public/Twitter.png";
import Facebook from "@/public/Facebook.png";
import Linkedin from "@/public/LinkedIn.png";
import Instagram from "@/public/Instagram.png";
import Link from "next/link";
import { Button } from "./button";
import { Input } from "./input";

export default function Footer() {
  return (
    <section className="w-full bg-secondary-background flex justify-center items-center">
      <div className="px-16 py-8  flex flex-col gap-8 w-full ">
        <div className="grid grid-cols-6 gap-4 ">
          <div className="col-span-2 flex flex-col justify-start items-start gap-4">
            <Link
              className="flex justify-between items-center gap-2"
              href={"/"}
            >
              <Image
                src={logo}
                alt={"logo"}
                className="w-[50px] h-[50px] rounded-[50%]"
              ></Image>
              <span className="text-normal font-semibold">Skill Link</span>
            </Link>
            <p className="text-normal font-semibold">
              Great platform for the project seeker that passionate about
              startups. Find your dream job easier.
            </p>
          </div>
          <div className="flex flex-col justify-start items-start gap-4">
            <h3 className="text-white font-bold text-lg">About</h3>
            <span className="text-normal font-semibold">Companies</span>
            <span className="text-normal font-semibold">Pricing</span>
            <span className="text-normal font-semibold">Terms</span>
            <span className="text-normal font-semibold">Advice</span>
            <span className="text-normal font-semibold">Privacy Policy</span>
          </div>
          <div className="flex flex-col justify-start items-start gap-4">
            <h3 className="text-white font-bold text-lg">Resources About</h3>
            <span className="text-normal font-semibold">Help Docs</span>
            <span className="text-normal font-semibold">Guide</span>
            <span className="text-normal font-semibold">Update</span>
            <span className="text-normal font-semibold">Contact Us</span>
          </div>
          <div className="col-span-2 flex flex-col justify-start items-start gap-4">
            <h3 className="text-white font-bold text-lg">
              Great Job Notifications
            </h3>
            <p className="text-normal font-semibold">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="w-full flex justify-between items-start gap-2">
              <Input type="email" placeholder="Email Address" />
              <Button variant="secondary" size="secondary">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <hr />
        <div className="pt-2 flex justify-between item-center">
          <div className="text-normal font-semibold">
            {new Date().getFullYear()} @ Skill Link. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Image
              alt="social media"
              className="w-[40] h-[40]"
              src={Twitter}
            ></Image>
            <Image
              alt="social media"
              className="w-[40] h-[40]"
              src={Linkedin}
            ></Image>
            <Image
              alt="social media"
              className="w-[40] h-[40]"
              src={Facebook}
            ></Image>
            <Image
              alt="social media"
              className="w-[40] h-[40]"
              src={Instagram}
            ></Image>
          </div>
        </div>
      </div>
    </section>
  );
}
