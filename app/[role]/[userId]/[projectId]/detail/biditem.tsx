"use client";
import {
   API_CLIENT_ASSIGN_PROJECT_PATH,
   API_CONVERSATION_CREATE,
} from "@/app/api/api_constants";
import { CreateConversationBody } from "@/app/api/conversation/create/route";
import ConfirmationModal from "@/app/components/modal/ConfirmationModal";
import { START_CONVERSATION_MESSAGE } from "@/app/utils/data";
import user from "@/public/landing/user.png";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { API_BIDS_BUY_PATH } from "@/app/api/api_constants";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./paymentintent";

const stripePromise = loadStripe(
   "pk_test_51PCnTK01vLXq23BYlFsw9Q7onqm6dIwCooyVAinyL8yLlgwvVlgoAuiQ22pJry7LAQWcQCFFebZxnxIjfnYMxsnl00OGcBv13J"
);

interface props {
   name: string;
   price: number;
   description: string;
   role: string;
   projectId: string;
   userId: string;
   freelancerId: string;
}

const BidItem: React.FC<props> = ({
   name,
   price,
   description,
   role,
   projectId,
   userId,
   freelancerId,
}) => {
   const [showHireConfirmation, setShowHireConfirmation] = useState(false);
   const [hired, setHired] = useState(false);

   const [paymentForm, setPaymentForm] = useState(false);
   const [clientSecret, setClientSecret] = useState(null);

   const createPaymentIntent = async (e: any) => {
      e.preventDefault();
      try {
         const response = await fetch(`${API_BIDS_BUY_PATH}`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: price }),
         });

         if (response.ok) {
            const data = await response.json();
            console.log(data);
            setClientSecret(data.clientSecret);
            setPaymentForm(true);
         } else {
            toast.error("Failed to create payment intent.");
         }
      } catch (error) {
         toast.error("Error creating payment intent.");
      }
   };
   const session = useSession();
   const router = useRouter();
   const onClickOnMessage = async () => {
      const body: CreateConversationBody = {
         clientId: session.data?.user?.id || "",
         freelancerId: freelancerId,
         message: START_CONVERSATION_MESSAGE,
         projectId,
      };
      console.log("my body", body);
      const response = await fetch(`${API_CONVERSATION_CREATE}`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(body),
      });

      if (response.ok) {
         const data = await response.json();

         router.push(`/messages/${data.data._id}`);

         console.log(data);
      }
   };

   const confirmHireHandler = async (e: any) => {
      const response = await fetch(`${API_CLIENT_ASSIGN_PROJECT_PATH}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ userId: freelancerId, projectId }),
      });

      if (response.ok) {
         const data = await response.json();
         toast.success("Assigned the project");
         await createPaymentIntent(e);
      }
   };

   const appearance = {
      theme: "stripe",
   };
   const options = {
      clientSecret,
      appearance,
   };

   return (
      <div className="w-full h-max flex flex-col justify-start items-start gap-2 border-2 border-input py-4 px-6">
         <div className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-4">
               <Image
                  src={user}
                  alt="user"
                  className="w-[48px] h-[48px] rounded-[50%]"
               ></Image>
               <div className="flex items-center gap-2">
                  <h3 className="text-blackish font-bold text-lg">{name}</h3>
               </div>
            </div>
            <span className="text-blue font-bold text-lg">${price}</span>
         </div>
         <div className="flex flex-col gap-3 items-start px-16">
            <p className="w-full break-words text-grayish text-md font-bold">
               {description}
            </p>
            {role == "client" && (
               <div className="flex items-center gap-5">
                  <button
                     onClick={() => onClickOnMessage()}
                     type="button"
                     className="px-2.5 py-1 text-blue border-b border-blue hover:border-grayish hover:text-grayish font-bold text-md"
                  >
                     Start Conversation
                  </button>
                  <button
                     type="button"
                     className="px-2.5 py-1 text-blue border-b border-blue hover:border-grayish hover:text-grayish font-bold text-md"
                     onClick={confirmHireHandler}
                  >
                     Hire
                  </button>
               </div>
            )}
         </div>
         {role === "client" && clientSecret && (
            <Elements options={options} stripe={stripePromise}>
               <CheckoutForm />
            </Elements>
         )}
      </div>
   );
};

export default BidItem;
