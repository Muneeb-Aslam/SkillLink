"use client";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { API_OTP_PATH } from "@/app/api/api_constants";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import VerifyForm from "./verify-form";

export default function SendOTP() {
  const param = useParams<{ email: string }>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [verify, setVerify] = useState<boolean>(false);
  
  const SendOTPClick = async () => {
    const decodedEmail = decodeURIComponent(param.email)
    setDisabled(true);
    try {
      const response = await fetch(`${API_OTP_PATH}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email:decodedEmail }),
      });
      const res = await response.json();
      if (response?.ok) {
        toast.success("Verification Email Sent");
        setVerify(true)
      } else {
        toast.error("Could't Send OTP. Try again");
      }
    } catch (error) {
      toast.error("Could't Send OTP. Try again");
    } finally {
      setDisabled(false);
    }
  };
  return (
    <section className="w-full flex flex-col gap-6">
      <Image src={logo} alt={"logo"} className="w-[65px] h-[65px]"></Image>
      {!verify ? (
        <>
          <div className="flex flex-col gap-1">
            <h3 className="text-heading font-extrabold text-3xl">
              Registration Successful
            </h3>
            <span className="text-normal text-md">
              <span className="text-heading font-bold">
                Please Click on button to send OTP on your email and verify your
                account{" "}
              </span>
              to unlock the full potential of job opportunties. Best of luck on
              your career journey!
            </span>
          </div>
          <Button onClick={SendOTPClick} disabled={disabled}>
            Send Verification Code
          </Button>
        </>
      ) : (
        <VerifyForm />
      )}
    </section>
  );
}
