import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/lib/mongoose";
import { Users } from "@/models/users";
import { Client } from "@/models/client";
import { Freelancer } from "@/models/freelancer";
import { Project } from "@/models/project";

export async function GET(request: NextRequest) {
  try {
    await databaseConnection();

    // Get counts for each category
    const [totalClients, totalFreelancers, totalProjects] = await Promise.all([
      Client.countDocuments(),
      Freelancer.countDocuments(),
      Project.countDocuments(),
    ]);

    return NextResponse.json({
      totalClients,
      totalFreelancers,
      totalProjects,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
