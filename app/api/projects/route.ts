import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/lib/mongoose";
import { Project } from "@/models/project";

export async function POST(req: NextRequest) {
  await databaseConnection();
  try {
    const body = await req.json();
    const projects = await Project.findById(body);
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await databaseConnection();
  try {
    const projects = await Project.find({});
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 });
  }
}