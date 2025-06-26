"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const ProfileModal = () => {
  const {data:session} = useSession();
  const user = session?.user;
  
  const handleLogoout = async () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="absolute right-0 top-16 bg-white flex flex-col justify-start items-start gap-4 w-32 h-max p-4 rounded-lg shadow-xl z-10">
      <span className="cursor-pointer text-black font-bold text-md hover:text-blue">
        <Link href={`/${user?.role}/profile`}>Profile</Link>
      </span>
      <span
        className="cursor-pointer text-black font-bold text-md hover:text-blue"
        onClick={handleLogoout}
      >
        Logout
      </span>
    </div>
  );
};

export default ProfileModal;