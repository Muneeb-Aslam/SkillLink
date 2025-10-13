import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/lib/mongoose";
import { Freelancer } from "@/models/freelancer";

export async function GET(request: NextRequest) {
  try {
    await databaseConnection();

    const freelancers = await Freelancer.find({})
      .sort({ createdAt: -1 })
      .select("-__v");

    return NextResponse.json(freelancers);
  } catch (error) {
    console.error("Error fetching freelancers:", error);
    return NextResponse.json(
      { error: "Failed to fetch freelancers" },
      { status: 500 }
    );
  }
}
