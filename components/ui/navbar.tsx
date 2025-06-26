"use client";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { Button } from "./button";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import caretdown from "@/public/CaretDown.png";
import ProfileModal from "./profilemodal";
import { API_FREELANCER_PROFILE_PATH } from "@/app/api/api_constants";

export default function Navbar() {
  const [dialog, setDialog] = useState<boolean>(false);
  const [freelancer, setFreelancer] = useState(null);
  const handleDropDownClick = () => {
    setDialog((pre) => !pre);
  };

  const session = useSession();
  const user = session?.data?.user;

  useEffect(() => {
    const fetchFreelancer = async () => {
      const response = await fetch(`${API_FREELANCER_PROFILE_PATH}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user?.id }),
      });
      if (response.ok) {
        const data = await response.json();
        setFreelancer(data.data);
      }
    };
    fetchFreelancer();
  }, []);
  console.log(freelancer);

  return (
    <nav className=" bg-primary-background flex h-20 justify-center items-center select-none w-full relative">
      <div className="w-full max-w-[1300px] h-full flex justify-between items-center px-16">
        <Link className="flex justify-between items-center gap-2" href={"/"}>
          <Image
            src={logo}
            alt={"logo"}
            className="w-[50px] h-[50px] rounded-[50%]"
          ></Image>
          <span className="text-normal font-semibold">Skill Link</span>
        </Link>
        {user && (
          <div className="flex justify-between items-center gap-12">
            {user?.role == "freelancer" && (
              <Link
                href="/freelancer/projects"
                className="text-normal font-semibold text-md"
              >
                Browse Projects
              </Link>
            )}
            <Link
              href={`/${user?.role}/project`}
              className="text-normal font-semibold text-md"
            >
              Current Projects
            </Link>
            {/* <Link href="/" className="text-normal font-semibold text-md">
              Messages
            </Link> */}
          </div>
        )}
        {user ? (
          <>
            <div className="flex items-center gap-2">
              {user?.role === "client" && (
                <Link href="/client/post/project">
                  <Button type="button" className="w-max">
                    Post Project
                  </Button>
                </Link>
              )}
              {user?.role === "freelancer" && (
                <span className="text-normal font-bold text-md border-2">
                  ${freelancer?.amount ?? 0}
                </span>
              )}
              <span className="text-black font-bold text-md">{user?.name}</span>
              <span
                onClick={handleDropDownClick}
                className="cursor-pointer text-black font-bold text-md"
              >
                <Image
                  src={caretdown}
                  alt="down"
                  className="w-[20px] h-[20px]"
                ></Image>
              </span>
            </div>
            {!!dialog && <ProfileModal />}
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <Button
                variant="accent"
                size="accent"
                className="border-r-2 border-secondary pr-4"
              >
                <Link href={"/login"}>Login</Link>
              </Button>
              <Button variant="secondary" size="secondary">
                <Link href={"/register"}>Sign Up</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
