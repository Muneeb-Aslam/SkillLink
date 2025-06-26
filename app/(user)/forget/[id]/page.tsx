import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import type { Metadata } from "next";
import UpdatePassword from "./updatepasswordform";

export const metadata: Metadata = {
  title: "Update Password | Skill Link",
  description: "A Freelancing Web App",
};

export default function Forget() {
  return (
    <main className="bg-white h-screen w-full flex justify-center items-center py-6">
      <div className="w-[400px] h-full  flex flex-col justify-start items-center gap-24 p-8">
        <Link
          href="/"
          className="self-start flex justify-start items-center gap-4"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-normal font-bold w-[30px] h-[30px]"
          />
          <span className="text-normal font-bold text-lg">Home</span>
        </Link>
        <UpdatePassword />
      </div>
    </main>
  );
}
