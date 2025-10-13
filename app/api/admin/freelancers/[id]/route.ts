import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/lib/mongoose";
import { Freelancer } from "@/models/freelancer";
import { Users } from "@/models/users";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await databaseConnection();

    const freelancerId = params.id;

    // Find the freelancer to get the userId
    const freelancer = await Freelancer.findById(freelancerId);
    if (!freelancer) {
      return NextResponse.json(
        { error: "Freelancer not found" },
        { status: 404 }
      );
    }

    // Delete the freelancer profile
    await Freelancer.findByIdAndDelete(freelancerId);

    // Delete the user account
    await Users.findOneAndDelete({ _id: freelancer.userId });

    return NextResponse.json({ message: "Freelancer deleted successfully" });
  } catch (error) {
    console.error("Error deleting freelancer:", error);
    return NextResponse.json(
      { error: "Failed to delete freelancer" },
      { status: 500 }
    );
  }
}
