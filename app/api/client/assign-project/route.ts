import databaseConnection from "@/lib/mongoose";
import { Freelancer } from "@/models/freelancer";
import { Project } from "@/models/project";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  await databaseConnection();
  const body = await req.json();
  
  try {
    const project = await Project.updateOne(
      { _id: body.projectId },
      { $set: { freelancerId: body.userId } }
    );
    if (project) {
      const freelancer = await Freelancer.updateOne(
        { userId: body.userId },
        { $push: { projects: body.projectId } }
      );
      if (freelancer) {
        return NextResponse.json({ status: 200 });
      }
      return NextResponse.json({ status: 400 });
    }
    return NextResponse.json({ status: 400 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: { message: error } }, { status: 500 });
  }
}
