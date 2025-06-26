import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/lib/mongoose";
import { Client } from "@/models/client";
import { Project } from "@/models/project";

export async function POST(req: NextRequest) {
  await databaseConnection();
  const {userId,data,files} = await req.json();

  try {
    const exists = await Client.findOne({
      userId,
    });
    
    const project = await Project.create({
      clientId: exists?.userId,
      files,
      ...data,
    });

    if (project) {
      return NextResponse.json({ data: exists }, { status: 200 });
    } else {
      return NextResponse.json("erroe", { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 });
  }
}
