import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/lib/mongoose";
import { Freelancer } from "@/models/freelancer";
import { Project } from "@/models/project";

export async function GET(req: NextRequest) {
  await databaseConnection();
  const Headers = req.headers;
  const userId = Headers.get("userid");

  try {
    const freelancer = await Freelancer.findOne({
      userId,
    });

    const projects = await Project.find({ freelancerId: freelancer?.userId });
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 });
  }
}
