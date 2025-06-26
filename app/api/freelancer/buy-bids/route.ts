import databaseConnection from "@/lib/mongoose";
import { Freelancer } from "@/models/freelancer";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  await databaseConnection();
  const body = await req.json();
    const userId = req.headers.get("userId");
  try {

    // Adding bids to previous bids
    const user = await Freelancer.findOne({ userId });
    const previousBids = user?.bids;
    body.bids = previousBids + body.bids;

    const updated = await Freelancer.findOneAndUpdate({ userId: body.userId }, { bids: body.bids });

    if (updated) return NextResponse.json({ data: updated }, { status: 200 });
    return NextResponse.json({ status: 400 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: { message: error } }, { status: 500 });
  }
}