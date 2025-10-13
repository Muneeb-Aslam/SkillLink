import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/lib/mongoose";
import { Project } from "@/models/project";

export async function GET(request: NextRequest) {
  try {
    await databaseConnection();

    const projects = await Project.find({})
      .sort({ createdAt: -1 })
      .select("-__v");

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
