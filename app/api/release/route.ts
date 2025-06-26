import databaseConnection from "@/lib/mongoose";
import { Freelancer } from "@/models/freelancer";
import { Project } from "@/models/project";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  await databaseConnection();
  const body = await req.json();
  try {
    const findFreelancer = await Freelancer.findOne({ userId: body.id });
    const update = await Freelancer.findByIdAndUpdate(findFreelancer?._id, {
      amount: parseInt(body.amount) + findFreelancer?.amount,
    });
    console.log(update);
    return NextResponse.json({ update }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 });
  }
}
