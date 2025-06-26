import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import LoginForm from "./register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Skill Link",
  description: "A Freelancing Web App",
};

export default function Login() {
  return (
    <main className="bg-white h-screen w-full flex justify-center items-center py-4">
      <div className="w-[400px] h-full max-w-[1500px] flex flex-col justify-between items-center gap-4 p-6">
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
        <LoginForm />
        <section className="self-center flex flex-col justify-center items-center gap-2 text-normal text-md">
          <span>
            Already have an account yet?{" "}
            <Link href={"/login"} className="text-md text-blue font-bold">
              Login
            </Link>
          </span>
        </section>
      </div>
    </main>
  );
}
