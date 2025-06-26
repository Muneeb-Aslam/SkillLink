import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import LoginForm from "./login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Skill Link",
  description: "A Freelancing Web App",
};

export default function Login() {
  return (
    <>
      <main className="bg-white h-screen w-full flex justify-center items-center py-6">
        <div className="w-[400px] h-full  flex flex-col justify-between items-center gap-4 p-6">
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
            <Link href={"/forget"} className="text-md text-blue font-bold">
              Forget Password?
            </Link>
            <span>
              Don&apos;t have an account yet?{" "}
              <Link href={"/register"} className="text-md text-blue font-bold">
                register
              </Link>
            </span>
          </section>
        </div>
      </main>
    </>
  );
}
