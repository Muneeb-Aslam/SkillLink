import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/lib/mongoose";
import { Client } from "@/models/client";
import { Project } from "@/models/project";

export async function GET(req: NextRequest) {
  await databaseConnection();
  const Headers = req.headers;
  const userId = Headers.get("userid");
  console.log(userId);
  
  try {
    const exists = await Client.findOne({
      userId,
    });
    if (!exists) {
      return NextResponse.json("Client Not found", { status: 400 });
    }

    const projects = await Project.find({ clientId: exists?.userId });
    console.log(projects);
    
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  await databaseConnection();
  const body = await req.json();
  try {
    const deleted = await Project.findByIdAndDelete(body.id)
    return NextResponse.json({ deleted }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  await databaseConnection();
  const body = await req.json();
  
  try {
    const deleted = await Project.findByIdAndUpdate(body.id,{
      submittedFiles:body.submittedFiles
    })
    console.log(deleted)  
    return NextResponse.json({ deleted }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 });
  }
}
