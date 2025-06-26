"use client";

import {
  API_FREELANCER_BUY_BIDS_PATH,
  API_FREELANCER_PROJECT_BID_PATH,
} from "@/app/api/api_constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import cross from "@/public/cross.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { bidSchema } from "./schema";

export default function BidForm({
  handleBidFormClick,
}: {
  handleBidFormClick: () => void;
}) {
  const [disabled, setDisabled] = useState(false);
  const params = useParams();
  const { userId, projectId } = params;
  console.log(userId, projectId);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof bidSchema>>({
    resolver: zodResolver(bidSchema),
  });

  const onSubmit = async (data: any) => {
    setDisabled(true);
    try {
      const response = await fetch(
        `${API_FREELANCER_PROJECT_BID_PATH}?userId=${userId}&projectId=${projectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();
      if (response?.ok) {
        toast.success("Successfully placed a bid");
        window.location.reload();
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fixed top-1/2 left-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 h-max flex flex-col gap-4 bg-white py-4 px-6"
    >
      <div className="w-full flex justify-between items-center cursor-pointer">
        <span className="text-blackish font-bold text-2xl">Place Bid</span>
        <span onClick={handleBidFormClick}>
          <Image src={cross} alt="cross" width={24} height={24}></Image>
        </span>
      </div>
      <hr className="h-2 text-normal opacity-40" />
      <div className="w-full flex flex-col justify-center items-start gap-2">
        <TextArea
          className="h-48"
          placeholder="Description"
          {...register("description")}
        />
        {!!errors.description && (
          <span className="text-red-500 text-xs font-bold">
            {errors.description.message}
          </span>
        )}
      </div>
      <div className="w-full flex flex-col justify-center items-start gap-2">
        <Input type="text" placeholder="Amount" {...register("amount")} />
        {!!errors.amount && (
          <span className="text-red-500 text-xs font-bold">
            {errors.amount.message}
          </span>
        )}
      </div>
      <div className="w-full flex flex-col justify-center items-start gap-2">
        <Input type="text" placeholder="Days" {...register("deliveryTime")} />
        {!!errors.deliveryTime && (
          <span className="text-red-500 text-xs font-bold">
            {errors.deliveryTime.message}
          </span>
        )}
      </div>

      <Button type="submit" disabled={disabled}>
        Submit Bid
      </Button>
    </form>
  );
}
