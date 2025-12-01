import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/lib/mongoose";
import { Project } from "@/models/project";

export async function PUT(req: NextRequest) {
  await databaseConnection();
  try {
    const body = await req.json();
    const { projectId, percentage, comment, updatedBy, updatedByRole } = body;

    if (!projectId || percentage === undefined) {
      return NextResponse.json(
        { error: { message: "Project ID and percentage are required" } },
        { status: 400 }
      );
    }

    if (percentage < 0 || percentage > 100) {
      return NextResponse.json(
        { error: { message: "Percentage must be between 0 and 100" } },
        { status: 400 }
      );
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return NextResponse.json(
        { error: { message: "Project not found" } },
        { status: 404 }
      );
    }

    // Add to history
    const historyEntry = {
      percentage,
      updatedBy,
      updatedByRole: updatedByRole || "client",
      comment: comment || "",
      updatedAt: new Date(),
    };

    project.workProgress = percentage;
    project.workProgressHistory.push(historyEntry);

    await project.save();

    return NextResponse.json(
      { message: "Work progress updated successfully", project },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: { message: error.message || "Internal server error" } },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await databaseConnection();
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { error: { message: "Project ID is required" } },
        { status: 400 }
      );
    }

    const project = await Project.findById(projectId).select(
      "workProgress workProgressHistory"
    );

    if (!project) {
      return NextResponse.json(
        { error: { message: "Project not found" } },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        workProgress: project.workProgress,
        workProgressHistory: project.workProgressHistory,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: { message: error.message || "Internal server error" } },
      { status: 500 }
    );
  }
}
