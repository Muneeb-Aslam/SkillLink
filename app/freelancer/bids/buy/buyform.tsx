"use client";
import { useState } from "react";
import DashboardNavbar from "@/components/ui/dashboardnav";
import BidsDropdown from "@/components/bids-buy/BidsDropdown";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import toast from "react-hot-toast";
import { API_BIDS_BUY_PATH } from "@/app/api/api_constants";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./paymentintent";

const stripePromise = loadStripe(
   "pk_test_51PCnTK01vLXq23BYlFsw9Q7onqm6dIwCooyVAinyL8yLlgwvVlgoAuiQ22pJry7LAQWcQCFFebZxnxIjfnYMxsnl00OGcBv13J"
);

const BuyBids = ({ data }: { data: any }) => {
   const clientData = data;
   const [selectedBids, setSelectedBids] = useState(0);
   const [amount, setAmount] = useState(0);
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
            body: JSON.stringify({ amount }),
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

   const appearance = {
      theme: "stripe",
   };
   const options = {
      clientSecret,
      appearance,
   };

   return (
      <>
         <DashboardNavbar />
         <section className="w-full bg-white flex justify-center items-center">
            <div className="w-full  h-max flex flex-col justify-start items-start gap-6 px-16 py-12">
               <span className="text-blackish font-bold text-2xl">
                  Buy bids
               </span>
               <hr className="w-full text-normal opacity-40" />
               <div className="flex flex-col justify-start items-start gap-1">
                  <span className="text-blackish font-bold text-md">
                     Available Bids
                  </span>
                  <span className="text-grayish font-bold text-sm">
                     You have {clientData?.bids} bids available
                  </span>
               </div>
               <hr className="w-full text-normal opacity-40" />
               <form className="w-full flex flex-col justify-start items-start gap-4">
                  <div className="w-full flex justify-start items-start gap-12">
                     <div className="w-1/3 flex flex-col justify-start items-start gap-1">
                        <span className="text-blackish font-bold text-md">
                           Amount to buy
                        </span>
                        <span className="text-grayish font-bold text-sm">
                           Your new bids balance will be{" "}
                           {clientData?.bids + selectedBids}
                        </span>
                     </div>
                     <div className="flex items-center gap-4">
                        <BidsDropdown
                           selectedBids={selectedBids}
                           setSelectedBids={setSelectedBids}
                           setAmount={setAmount}
                        />
                        <span className="text-grayish font-bold text-sm ml-2 outline-blue ring-blue">
                           Amount to buy: ${amount}
                        </span>
                     </div>
                  </div>

                  <hr className="w-full text-normal opacity-40" />

                  <div className="w-full flex justify-start items-center gap-12">
                     <div className="w-1/3 flex flex-col justify-start items-start gap-1">
                        <span className="text-blackish font-bold text-md">
                           Expiration
                        </span>
                        <span className="text-grayish font-bold text-sm">
                           Your bids will expire on
                        </span>
                     </div>
                     <div className="flex justify-start items-center gap-4">
                        <span className="text-blackish font-bold text-md">
                           {new Date(
                              new Date().setDate(new Date().getDate() + 300)
                           ).toDateString()}
                        </span>
                     </div>
                  </div>

                  <hr className="w-full text-normal opacity-40" />
                  <div className="flex items-center self-end gap-4">
                     <button
                        type="button"
                        className="text-blue px-4 py-2 rounded-none font-bold"
                     >
                        Cancel
                     </button>
                     <Button onClick={createPaymentIntent}>Buy bids</Button>
                  </div>
               </form>
            </div>
         </section>
         {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
               <CheckoutForm />
            </Elements>
         )}
         <Footer />
      </>
   );
};

export default BuyBids;
