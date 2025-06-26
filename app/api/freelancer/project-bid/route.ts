import databaseConnection from "@/lib/mongoose";
import { Bid } from "@/models/bid";
import { Freelancer } from "@/models/freelancer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
   await databaseConnection();
   const body = await request.json();
   const { amount, description, deliveryTime } = body;
   const userId = request.nextUrl.searchParams.get("userId");
   const projectId = request.nextUrl.searchParams.get("projectId");

   try {
      const freelancer = await Freelancer.findOne({ userId });

      const alreadyPlaced = await Bid.findOne({
         freelancerId: freelancer?.userId,
      });
      if (alreadyPlaced) {
         return NextResponse.json(
            { message: "Already Placed" },
            { status: 400 }
         );
      }

      const newBid = await Bid.create({
         name: freelancer?.name,
         amount,
         description,
         deliveryTime,
         freelancerId: freelancer?.userId,
         projectId,
         status: "pending",
      });

      const updated = await Freelancer.findByIdAndUpdate(
         freelancer?._id,
         {
            bids: freelancer?.bids - 1,
         },
         { new: true }
      );

      console.log(updated);

      return NextResponse.json(
         { message: "Bid created successfully", bid: newBid },
         { status: 201 }
      );
   } catch (error: any) {
      return NextResponse.json(
         { error: { message: error.message } },
         { status: 500 }
      );
   }
}

export async function GET(request: NextRequest) {
   await databaseConnection();
   const projectId = request.nextUrl.searchParams.get("projectId");

   try {
      const bids = await Bid.find({ projectId });
      return NextResponse.json(
         { message: "Bid created successfully", bids: bids },
         { status: 200 }
      );
   } catch (error: any) {
      return NextResponse.json(
         { error: { message: error.message } },
         { status: 500 }
      );
   }
}
