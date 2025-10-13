import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/lib/mongoose";
import { Project } from "@/models/project";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await databaseConnection();

    const projectId = params.id;

    // Find the project
    const project = await Project.findById(projectId);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Delete the project
    await Project.findByIdAndDelete(projectId);

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
