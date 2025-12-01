import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/lib/mongoose";
import { Project } from "@/models/project";

export async function PUT(req: NextRequest) {
  await databaseConnection();
  try {
    const body = await req.json();
    const { projectId, deadline, startCountdown } = body;

    if (!projectId) {
      return NextResponse.json(
        { error: { message: "Project ID is required" } },
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

    // Update deadline if provided
    if (deadline) {
      project.deadline = new Date(deadline);
    }

    // Handle countdown start
    if (startCountdown !== undefined) {
      if (startCountdown) {
        // Check if deadline exists
        if (!project.deadline) {
          return NextResponse.json(
            { error: { message: "Deadline must be set before starting countdown" } },
            { status: 400 }
          );
        }

        // Check if less than 7 days remaining
        const now = new Date();
        const deadlineDate = new Date(project.deadline);
        const daysRemaining = Math.ceil(
          (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysRemaining < 7) {
          return NextResponse.json(
            {
              error: {
                message:
                  "Cannot start countdown when less than 7 days remaining",
              },
            },
            { status: 400 }
          );
        }

        project.countdownStarted = true;
        project.countdownStartedAt = new Date();
      } else {
        project.countdownStarted = false;
        project.countdownStartedAt = null;
      }
    }

    await project.save();

    return NextResponse.json(
      { message: "Deadline updated successfully", project },
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
      "deadline countdownStarted countdownStartedAt"
    );

    if (!project) {
      return NextResponse.json(
        { error: { message: "Project not found" } },
        { status: 404 }
      );
    }

    let daysRemaining = null;
    let canStartCountdown = false;

    if (project.deadline) {
      const now = new Date();
      const deadlineDate = new Date(project.deadline);
      daysRemaining = Math.ceil(
        (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      canStartCountdown = daysRemaining >= 7 && !project.countdownStarted;
    }

    return NextResponse.json(
      {
        deadline: project.deadline,
        countdownStarted: project.countdownStarted,
        countdownStartedAt: project.countdownStartedAt,
        daysRemaining,
        canStartCountdown,
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

