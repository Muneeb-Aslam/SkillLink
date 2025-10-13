import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/lib/mongoose";
import { Client } from "@/models/client";
import { Users } from "@/models/users";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await databaseConnection();

    const clientId = params.id;

    // Find the client to get the userId
    const client = await Client.findById(clientId);
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Delete the client profile
    await Client.findByIdAndDelete(clientId);

    // Delete the user account
    await Users.findOneAndDelete({ _id: client.userId });

    return NextResponse.json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json(
      { error: "Failed to delete client" },
      { status: 500 }
    );
  }
}
